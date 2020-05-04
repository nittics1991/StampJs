#!/bin/bash

cd $(dirname "$0")

python3 markdown2.py \
    ../README.md > ../readme.htm

#https://github.com/trentm/python-markdown2
