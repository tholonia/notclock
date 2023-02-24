#!/bin/python
import shutil
import glob
from selenium import webdriver
import sys,tty,os,termios
from termcolor import colored
print(colored("S = shot/saved/",'green',attrs=['bold']))
print(colored("A = shot/arch/",'cyan',attrs=['bold']))
print(colored("M = shot/misc/",'yellow',attrs=['bold']))
print(colored("X = shot/trash/",'red',attrs=['bold']))
print(colored("> = Next",'white',attrs=['bold']))
print(colored("< = Prev",'white',attrs=['bold']))
print(colored("Q = Quit",'white',attrs=['bold']))
b = webdriver.Firefox()

def getkey():
    old_settings = termios.tcgetattr(sys.stdin)
    tty.setcbreak(sys.stdin.fileno())
    try:
        while True:
            b = os.read(sys.stdin.fileno(), 3).decode()
            if len(b) == 3:
                k = ord(b[2])
            else:
                k = ord(b)
            key_mapping = {
                127: 'backspace',
                10: 'return',
                32: 'space',
                9: 'tab',
                27: 'esc',
                65: 'up',
                66: 'down',
                67: 'right',
                68: 'left'
            }
            return key_mapping.get(k, chr(k))
    finally:
        termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)

clr = "white"
files = glob.glob("shots/*.png", recursive=False)
file = files.sort()
skip=0
i=0
while i < len(files):
# for i in range(0,len(files)):
# for file in files:
    file = files[i]
    b.get(f"file:///home/jw/src/music/{file}")
    while True:
        skip=0
        k=getkey()
        if k == "s":
            shutil.move(file,"shots/saved")
            clr = "green"
            break
        if k == "a":
            shutil.move(file,"shots/arch")
            clr = "cyan"
            break
        if k == "m":
            shutil.move(file,"shots/misc")
            clt = "yellow"
            break
        if k == "right":# next
            clt = "grey"
            skip =1
            break
        if k == "left": # prev
            clt = "grey"
            i = i - 2
            skip = 1
            break
        if k == "x":
            shutil.move(file,"shots/trash")
            clr = "red"
            break
        if k == "q":
             sys.exit()
    if skip==0:
        print(colored(f"FILE: [{file}]",clr))
    i += 1