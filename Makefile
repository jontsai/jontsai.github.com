compile:
	cd assets/ && make

compile_all:
	cd assets/ && make compile_all

package-theme:
	rake theme:package name="hacking-in-the-dark"

update-gravatar:
	sh _includes/themes/hacking-in-the-dark/scripts/gravatar-favicon.sh `grep email _config.yml | cut -d : -f 2 | tr -d ' '`
	mv -f favicon.ico img

update:
	bundle update github-pages
