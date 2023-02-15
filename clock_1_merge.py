#!/bin/python
import os
ofn = "notclock.svg"
ifn = "clock_1.svg.js"
# writing to file
outfile = open(ofn,'w')

# Using readlines()
infile = open(ifn, 'r')
Lines = infile.readlines()
skip = False
for line in Lines:
    if skip:
        skip = False
        continue

    if line.find('var _VERSION') != -1:
        args = line.split("=")
        v = int(float(args[1])*100)
        v=(v+1)/100
        print(f"Version: {v:.2f}")
        line = f"    var _VERSION = {v:.2f}\n"

        # // update org
        cmd = f"perl -pi -e 's/var _VERSION.*/var _VERSION = {v}/' clock_1.svg"
        os.system(cmd)

    if line.find('var _PRIVATE_MODE') != -1:
        line = "    var _PRIVATE_MODE = false\n"

    if line.find('%PRAGMA') != -1:
        args = line.split(":")
        if args[1] == "delete_next_line":
            skip = True
        if args[1] == "insert":
            itf = open(args[2].strip(), 'r')
            itfLines = itf.readlines()
            for itfline in itfLines:
                outfile.write(itfline)
            itf.close()
    if not skip:
        outfile.write(line)
outfile.close()
print(f"brave ./{ofn}")