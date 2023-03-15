#!/bin/python
import math
import getopt
import sys


def  ticks2secs(t):
    t10 = int(t,6)
    return t10 * 1.85185185185185%86400

def toTimeString(totalSeconds):
    hours = math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    minutes = math.floor(totalSeconds / 60)
    seconds = totalSeconds % 60

    hms = f"{hours}:{minutes}:{round(seconds)}"
    return hms


base6val = False
argv = sys.argv[1:]

try:
    opts, args = getopt.getopt(argv, "n:")
except:
    print("Error")

for opt, arg in opts:
    if opt in ['-n']:
        base6val = arg

print(toTimeString(ticks2secs(base6val)))

