compile:
	cd assets/ && make

compile_all:
	cd assets/ && make compile_all

package-theme:
	rake theme:package name="hacking-in-the-dark"