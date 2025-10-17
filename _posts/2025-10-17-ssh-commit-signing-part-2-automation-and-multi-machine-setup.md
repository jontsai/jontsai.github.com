---
layout: post
title: "SSH Commit Signing Part 2: Automation and Multi-Machine Setup"
description: "Automating SSH commit signing across multiple machines with scripts and centralized configuration"
category: "programming"
tags: [ssh,git,security,automation,dotfiles]
---
{% include JB/setup %}

In my [previous post](/2024/11/21/signing-git-commits-using-ssh-instead-of-gpg/), I covered the basics of signing Git commits with SSH keys instead of GPG. This post covers the automation and multi-machine setup I built to make SSH signing seamless across 12+ machines.

## The Challenge

Managing SSH commit signing across multiple machines introduces several challenges:

1. **Multiple keys** - Each machine has its own SSH key
2. **Multiple emails** - Different projects use different commit emails
3. **Verification** - Git needs to verify signatures from any of your keys
4. **GitHub** - All keys need to be registered as signing keys
5. **Consistency** - Configuration should be identical across machines

## The Solution: Centralized Configuration

I created three interconnected repositories:

- **[dotfiles](https://github.com/jontsai/dotfiles)** (public) - Git configuration and aliases
- **[bash-ftw](https://github.com/jontsai/bash-ftw)** (public) - Bash utilities and installation helpers
- **pubkeys** (private) - SSH public keys and automation scripts

## Key Components

### 1. Dynamic Key Selection

Instead of hardcoding a specific key per machine, use `ssh-agent` to automatically select the first available key:

```ini
# In ~/.gitconfig or ~/code/dotfiles/.gitconfig
[gpg]
    format = ssh

[gpg "ssh"]
    allowedSignersFile = ~/.ssh/allowed_signers
    defaultKeyCommand = ssh-add -L | head -n1

[commit]
    gpgsign = true
```

**Benefits:**
- No per-machine configuration needed
- Works with any key loaded in ssh-agent
- Portable across all your machines

### 2. The allowed_signers File

Git's `allowed_signers` file verifies commit signatures. The format is:

```
email key-type key-data comment
```

**The key insight:** Create a cross-product of all your emails × all your keys:

```
hello@jontsai.com ssh-ed25519 AAAAC3... laptop-key
hello@jontsai.com ssh-rsa AAAAB3... desktop-key
hello@jontsai.com ssh-ed25519 AAAAC3... server-key
user@example.com ssh-ed25519 AAAAC3... laptop-key
user@example.com ssh-rsa AAAAB3... desktop-key
user@example.com ssh-ed25519 AAAAC3... server-key
```

This allows Git to verify commits signed by any of your keys with any of your email addresses.

### 3. Automated Generation Script

Create `scripts/generate_allowed_signers.sh`:

```bash
#!/bin/bash
# Generate allowed_signers file for Git SSH commit signing

set -e

EMAILS_FILE="${EMAILS_FILE:-emails.txt}"
OUTPUT="${OUTPUT:-allowed_signers}"

# Read emails (filter out comments and empty lines)
emails=$(grep -v '^#' "$EMAILS_FILE" | grep -v '^[[:space:]]*$' || true)

# Clear output file
> "$OUTPUT"

# Enable nullglob for Mac compatibility
shopt -s nullglob

# Process all .pub files
for pubkey in *.pub delegates/*.pub; do
    if [ -f "$pubkey" ]; then
        key_content=$(cat "$pubkey")

        # For each key, add entry for each email
        echo "$emails" | while IFS= read -r email; do
            echo "$email $key_content" >> "$OUTPUT"
        done
    fi
done

shopt -u nullglob

echo "Generated $OUTPUT with $(wc -l < "$OUTPUT") keys"
```

Create an `emails.txt` file:

```
# Email addresses used for git commits
hello@jontsai.com
jontsai@users.noreply.github.com
```

### 4. Makefile for Easy Management

Create a `Makefile` to orchestrate everything:

```makefile
.PHONY: help install install-authorized_keys install-allowed_signers github-signing-keys

## help - Display available targets
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | \
	  sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

## authorized_keys - Generate authorized_keys file
authorized_keys: $(wildcard *.pub) $(wildcard delegates/*.pub)
	cat *.pub delegates/*.pub > authorized_keys
	chmod 600 authorized_keys

## allowed_signers - Generate allowed_signers file
allowed_signers: emails.txt scripts/generate_allowed_signers.sh $(wildcard *.pub)
	scripts/generate_allowed_signers.sh
	chmod 600 allowed_signers

## install - Install authorized_keys and allowed_signers to ~/.ssh
install: authorized_keys allowed_signers
	cp -v authorized_keys ~/.ssh/authorized_keys
	cp -v allowed_signers ~/.ssh/allowed_signers
	chmod 600 ~/.ssh/authorized_keys ~/.ssh/allowed_signers

## github-signing-keys - Add all keys to GitHub as signing keys
github-signing-keys:
	scripts/add_github_signing_keys.sh
```

### 5. Automated GitHub Key Upload

Create `scripts/add_github_signing_keys.sh`:

```bash
#!/bin/bash
# Add all public keys to GitHub as signing keys using gh CLI

set -e

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "ERROR: gh CLI is not installed"
    echo "Install from: https://cli.github.com/"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "ERROR: Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

# Check for required permissions
echo "Checking for required permissions..."
if ! gh ssh-key list &> /dev/null; then
    echo "ERROR: Missing required permission scope"
    echo ""
    echo "To grant this permission, run:"
    echo "    gh auth refresh -h github.com -s admin:ssh_signing_key"
    exit 1
fi

echo "Adding all public keys to GitHub as signing keys..."

success_count=0
skip_count=0
error_count=0

for pubkey in *.pub delegates/*.pub; do
    if [ -f "$pubkey" ]; then
        title=$(basename "$pubkey" .pub)
        echo -n "Adding $title... "

        output=$(gh ssh-key add --type signing "$pubkey" --title "$title" 2>&1)
        exit_code=$?

        if [ $exit_code -eq 0 ]; then
            echo "done"
            success_count=$((success_count + 1))
        elif echo "$output" | grep -q "already exists"; then
            echo "already exists (skipped)"
            skip_count=$((skip_count + 1))
        else
            echo "FAILED"
            echo "  Error: $output"
            error_count=$((error_count + 1))
        fi
    fi
done

echo ""
echo "Summary: $success_count added, $skip_count skipped, $error_count errors"
```

### 6. Git Aliases for Viewing Signatures

Add to your `~/.gitconfig`:

```ini
[alias]
    # Compact log with signature status
    slog = log --pretty=format:\"%C(auto)%h %G? %C(blue)%an%C(reset) %s %C(dim)(%ar)%C(reset)\"

    # Full signature details
    logs = log --show-signature
```

Signature status codes:
- `G` = Good signature
- `B` = Bad signature
- `U` = Good signature, unknown validity
- `N` = No signature

### 7. Bash Installation Helper

Add to your `~/.bashrc` or [bash-ftw](https://github.com/jontsai/bash-ftw):

```bash
# GitHub CLI installation with OS detection
function install-gh {
    KERNEL=$(uname -s)

    if [[ $KERNEL == 'Darwin' ]]; then
        echo "Installing GitHub CLI via Homebrew..."
        brew install gh
    elif [[ $KERNEL == 'Linux' ]]; then
        echo "Installing GitHub CLI via apt..."
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
          sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
        sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \
          sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
        sudo apt update && sudo apt install gh -y
    else
        echo "Visit https://cli.github.com for installation instructions"
        return 1
    fi

    echo "GitHub CLI installed! Run 'gh auth login' to authenticate"
}
```

## Complete Setup Workflow

### Initial Setup (One Time)

1. **Clone your dotfiles:**
   ```bash
   cd ~/code
   git clone https://github.com/yourusername/dotfiles
   ```

2. **Create your pubkeys repository structure:**
   ```bash
   mkdir -p ~/code/pubkeys/{scripts,delegates,obsolete}
   cd ~/code/pubkeys

   # Copy all your .pub files here
   cp ~/.ssh/*.pub .

   # Create emails.txt
   cat > emails.txt <<EOF
   # Your git commit emails
   you@example.com
   you@users.noreply.github.com
   EOF
   ```

3. **Copy the scripts** (from examples above) into `scripts/`

4. **Install GitHub CLI:**
   ```bash
   install-gh  # or manually from https://cli.github.com
   gh auth login
   gh auth refresh -h github.com -s admin:ssh_signing_key
   ```

5. **Install configuration:**
   ```bash
   cd ~/code/pubkeys
   make install

   cd ~/code/dotfiles
   cp .gitconfig ~/.gitconfig
   ```

6. **Upload keys to GitHub:**
   ```bash
   cd ~/code/pubkeys
   make github-signing-keys
   ```

### Per-Machine Setup

On each new machine:

```bash
# 1. Clone repos
cd ~/code
git clone https://github.com/yourusername/dotfiles
git clone your-pubkeys-repo  # if you made it a git repo

# 2. Install
cd ~/code/pubkeys && make install
cd ~/code/dotfiles && cp .gitconfig ~/.gitconfig

# 3. Configure ssh-agent (if needed)
ssh-add ~/.ssh/id_ed25519

# 4. Test it
cd some-repo
git commit -m "test signed commit"
git log --show-signature -1
```

## Benefits

1. **Zero per-machine configuration** - Same setup everywhere
2. **Automatic key selection** - Works with any key in ssh-agent
3. **Multi-email support** - All your commit emails are verified
4. **One-command GitHub sync** - `make github-signing-keys`
5. **Easy verification** - `git slog` shows signature status inline
6. **Makefile dependencies** - Auto-regenerates when keys/emails change

## Lessons Learned

### 1. Mac Compatibility
Mac's bash 3.2 doesn't support `<<<` heredoc syntax. Use pipe instead:
```bash
# Don't do this (fails on Mac)
while read line; do ...; done <<< "$var"

# Do this (works everywhere)
echo "$var" | while read line; do ...; done
```

### 2. Makefile Dependencies
Use `$(wildcard *.pub)` to track file dependencies:
```makefile
allowed_signers: emails.txt scripts/generate.sh $(wildcard *.pub)
```

### 3. Error Handling in Scripts
Always check exit codes and provide remediation:
```bash
output=$(command 2>&1)
exit_code=$?

if [ $exit_code -ne 0 ]; then
    echo "ERROR: $output"
    echo "To fix: <remedy steps>"
    exit 1
fi
```

### 4. GitHub CLI Permissions
The `admin:ssh_signing_key` scope is required for managing signing keys:
```bash
gh auth refresh -h github.com -s admin:ssh_signing_key
```

### 5. Verification is Separate from Signing
- `user.signingkey` or `gpg.ssh.defaultKeyCommand` - Which key to **sign** with
- `gpg.ssh.allowedSignersFile` - Which keys are **trusted** for verification

## Verification

Check if commits are signed:

```bash
# Quick check
git slog -10

# Full details
git log --show-signature -1

# Specific commit
git verify-commit abc123
```

## Public Resources

- [My dotfiles](https://github.com/jontsai/dotfiles) - Git configuration and aliases
- [bash-ftw](https://github.com/jontsai/bash-ftw) - Bash utilities and helpers

Feel free to adapt these scripts and configurations for your own setup!

## Conclusion

SSH-based commit signing is simpler than GPG, but managing it across multiple machines requires automation. With centralized configuration, automated scripts, and proper dependency tracking, you can maintain a seamless signing setup across all your machines.

The key principles:
1. **Automate everything** - Scripts eliminate manual steps and errors
2. **Centralize configuration** - Dotfiles repos ensure consistency
3. **Use cross-products** - All emails × all keys for maximum flexibility
4. **Make it idempotent** - Safe to run commands multiple times
5. **Provide clear errors** - Always show how to fix issues

Now all my commits are automatically signed, verified, and visible on GitHub with that coveted "Verified" badge. 🎉
