---
title: Sudoku Solver using SAT
layout: single
author_profile: true
permalink: "/:title/"
# categories:
# - Tips
date: '2019-12-03 20:30:00'
tags:
- SAT
- tips
---

SAT solvers are great. You can use them to [solve systems of equations](https://blog.prepscholar.com/systems-of-equations-sat-math-algebra-prep-and-practice), [generate cd keys](https://youtu.be/b92CW-NZ3l0?t=250), or even [go forwards or backwards in time in Conway's Game of Life](https://github.com/flopp/gol-sat).

When you use them you just list the constraints of a problem and then hit solve. In the past I've tried to make sudoku solvers and I'd begin to implement a backtracking algorithm but I'd always get lost and confused. When I made one with a SAT solver the only confusion was in how easy it was.

First: model the sudoku grid
```python
cells = [Int(i) for i in range(BOARDWIDTH ** 2)]
rows = [[cells[BOARDWIDTH * y + x] for x in range(BOARDWIDTH)] for y in range(BOARDWIDTH)]
cols = [[cells[BOARDWIDTH * x + y] for x in range(BOARDWIDTH)] for y in range(BOARDWIDTH)]
subgrids = [[] for i in range(BOARDWIDTH)]

def subgrid(row, col):
    return int(floor(col / SUBGRIDWIDTH) + floor(row / SUBGRIDWIDTH) * SUBGRIDWIDTH)
for row in range(BOARDWIDTH):
    for col in range(BOARDWIDTH):
        subgrids[subgrid(row, col)].append(cells[row*BOARDWIDTH+col])
```

Second: specify constraints
```python
# cell values should be between 1-9
[s.add(cell > 0) for cell in cells]
[s.add(cell <= BOARDWIDTH) for cell in cells]

# values should be different in any given row/column/subgrid
def alldifferent(grouping):
    for subgroup in grouping:
        for a, b in itertools.combinations(subgroup, 2):
            s.add(a != b)

alldifferent(rows)
alldifferent(cols)
alldifferent(subgrids)

# set known cell values
'''
Example input: '5...8..49...5...3..673....115..........2.8..........187....415..3...2...49..5...3'
Maps to: 
         5 . . . 8 . . 4 9
         . . . 5 . . . 3 .
         . 6 7 3 . . . . 1
         1 5 . . . . . . .
         . . . 2 . 8 . . .
         . . . . . . . 1 8
         7 . . . . 4 1 5 .
         . 3 . . . 2 . . .
         4 9 . . 5 . . . 3
'''
for idx, val in enumerate(board):
    if val != '.':
        self.s.add(self.cells[idx] == int(val))
```

Third: handle IO
That's it! No more solving logic required.

Below is the entirety of the solver I made
```python
# Example usage: python solver.py '6.....53......27..5.7.96.18..6..1.8..98..........2..........9.....2...4331...9.62'

import sys
import itertools
from math import floor
from z3 import *  # import z3-solver

BOARDWIDTH = 9
SUBGRIDWIDTH = 3


def setup():
    s = Solver()
    cells = [Int(i) for i in range(BOARDWIDTH ** 2)]

    '''
        . -> rows
        |
        v cols
    '''

    [s.add(cell > 0) for cell in cells]
    [s.add(cell <= BOARDWIDTH) for cell in cells]

    rows = [[cells[BOARDWIDTH * y + x] for x in range(BOARDWIDTH)] for y in range(BOARDWIDTH)]
    cols = [[cells[BOARDWIDTH * x + y] for x in range(BOARDWIDTH)] for y in range(BOARDWIDTH)]
    subgrids = [[] for i in range(BOARDWIDTH)]

    def subgrid(row, col):
        return int(floor(col / SUBGRIDWIDTH) + floor(row / SUBGRIDWIDTH) * SUBGRIDWIDTH)
    for row in range(BOARDWIDTH):
        for col in range(BOARDWIDTH):
            subgrids[subgrid(row, col)].append(cells[row*BOARDWIDTH+col])

    def alldifferent(grouping):
        for subgroup in grouping:
            for a, b in itertools.combinations(subgroup, 2):
                s.add(a != b)

    alldifferent(rows)
    alldifferent(cols)
    alldifferent(subgrids)

    return s, cells


class SudokuSolver:

    def __init__(self, board):
        self.s, self.cells = setup()
        self.parseboard(board)

    def parseboard(self, board: str):
        '''
        Example input: '5...8..49...5...3..673....115..........2.8..........187....415..3...2...49..5...3'
        :param board:
        '''
        for idx, val in enumerate(board):
            if val != '.':
                self.s.add(self.cells[idx] == int(val))

    def solve(self):
        if self.s.check() == sat:
            return self.s.model()
        else:
            return None

    def pprint_solution(self, model):
        print()
        for row in range(BOARDWIDTH):
            string = ''
            for col in range(BOARDWIDTH):
                string += str(model[self.cells[row*BOARDWIDTH + col]]) + ' '
                if col % SUBGRIDWIDTH == SUBGRIDWIDTH - 1:
                    string += ' '
            if row % SUBGRIDWIDTH == SUBGRIDWIDTH - 1:
                string += '\n'
            print(string)


def main(board):
    s = SudokuSolver(board)
    s.pprint_solution(s.solve())


if __name__ == '__main__':
    board = sys.argv[1]
    main(board)

```





