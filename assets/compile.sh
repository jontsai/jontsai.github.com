#!/bin/bash

# parse command-line options
while [ "$1" != "" ]; do
    case $1 in 
        -a | --all )
            shift
            ALL=1
            ;;
        * )
            exit 1
    esac
    shift
done

FILES=''

if [[ ${ALL} ]];
then
    # compile all
    echo "Compiling all *.less files"
    FILES=`find . -name "*.less"`
else
    # compile deltas
    echo "Compiling modified *.less files"
    FILES=`git status -s | grep "\.less" | awk '{ print $2 }'`
fi

for INFILE in $FILES
do
    echo "Compiling ${INFILE}"

    FILENAME=${INFILE%.*}
    OUTFILE=${FILENAME}.css
    lessc ${INFILE} ${OUTFILE}
done
