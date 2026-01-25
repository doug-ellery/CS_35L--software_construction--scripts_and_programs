#!/usr/bin/python

"""
This program serves as a partial python3 implementation of the C program shuf.
When called by default, the program reads from standard input and then outputs
a randomly shuffle version of all the lines from standard input. The program has
the following options:

-n (--head-count) give a number of how many lines you want outputted

-i (--input-range) give an argument of the form a-b, where only values from integer a - integer b will be shuffled

-e (--echo) take all words after this option as seperate input lines into shuf

-r (--repeat) use replacement when a line is chosen (the same line can be chosen more than once)

- : when this is the only argument, program reads from standard input

if there is only one argument at the end that isn't "-", this argument is treated as a file name, this file is used as the input
"""

import random, sys
import argparse

class randline:
    def __init__(self, filename):
        f = open(filename, 'r')
        self.lines = f.readlines()
        f.close()

    def __init__(self):
        self.lines = []
        
    def chooseLineNoReplace(self):
        try:
            currLine = self.lines.pop()
        except IndexError:
            raise RuntimeError("No lines left to choose from")
        return currLine

    def chooseLineReplace(self):
        return random.choice(self.lines)

def main():
    parser = argparse.ArgumentParser(description = "Output randomly selected lines from input")
          

    parser.add_argument("-n", "--head-count",dest = "numlines",type=int, default=1,help="output NUMLINES lines (default 1)")
    parser.add_argument("-r", "--repeat",action="store_true", default=False,help="Allow for the same line to appear twice")
    parser.add_argument("-e", "--echo",action="store_true", default=False,help="use command line arguments as input lines")
    parser.add_argument("-i", "--input-range",dest="input_range", default="0-0",help="use values within input range as input lines")
    parser.add_argument("inputs",nargs = '*', help = "input file or all lines for -e")
    args = parser.parse_args()

   
    
    
    try:
        numlines = int(args.numlines)
    except:
        parser.error("invalid NUMLINES: {0}".
                     format(args.numlines))
    if numlines < 0:
        parser.error("negative count: {0}".
                     format(numlines))
    generator = randline()
    if not(args.input_range == "0-0"):
        if len(args.inputs) > 0:
            parser.error("can't pick between multiple input sources")
        else:
            strList = args.input_range.split("-")
            intMin = int(strList[0])
            intMax = int(strList[1])
            for i in range (intMin,intMax+1):
                generator.lines.append(str(i))
    elif args.echo:
        if len(args.inputs) < 1:
            parser.error("missing argument for echo option, invalid input")
        else:
            for arg in args.inputs:
                generator.lines.append(str(arg))
    elif len(args.inputs) == 1 and not(args.inputs[0] == "-"):
        f = open(args.inputs[0], 'r')
        generator.lines = f.readlines()
        f.close()
    elif len(args.inputs) == 0 or args.inputs[0] == "-":
        generator.lines = [line for line in sys.stdin]
    else:
        parser.error("number of arguments doesn't make sense with -e option not selected")

    for i in range(len(generator.lines)):
            if generator.lines[i][len(generator.lines[i])-1:] == "\n":
                generator.lines[i] = generator.lines[i][:len(generator.lines[i]) - 1]
    random.shuffle(generator.lines)
    
    try:
        if args.repeat and numlines == 1:
            while True:
                sys.stdout.write(generator.chooseLineReplace())
                sys.stdout.write("\n")
        if numlines == 1:
            numlines = len(generator.lines)

        if args.repeat:
            for i in range(numlines):
                sys.stdout.write(generator.chooseLineReplace())
                sys.stdout.write("\n")
        else:
            for i in range(numlines):
                try:
                    sys.stdout.write(generator.chooseLineNoReplace())
                    sys.stdout.write("\n")
                except RuntimeError as e:
                    parser.error(str(e))
                    
    except IOError as e:
        errno, strerror = e.args
        parser.error("I/O error({0}): {1}".
                     format(errno, strerror))

if __name__ == "__main__":
    main()
