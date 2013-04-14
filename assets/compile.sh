#!/bin/sh

for INFILE in `find . -name "*.less"`
do
    echo "Compiling ${INFILE}"

    FILENAME=${INFILE%.*}
    OUTFILE=${FILENAME}.css
    lessc ${INFILE} ${OUTFILE}
done
