#!python
# -*- coding: utf-8 -*-

import sys
import os


def main():
    if len(sys.argv) < 4:
        print 'usage: %s projectName practiceFile rowsPerGroup' % sys.argv[0]
        sys.exit(-1);
    project_name = sys.argv[1]
    practice_file_name = sys.argv[2]
    rows_per_group = int(sys.argv[3])
    counter = 0
    row_counter = 0
    group_counter = 0
    output_file = 0
    if not os.path.exists('pending'):
        os.mkdir('pending')
    if not os.path.exists(os.path.join('pending', project_name)):
        os.mkdir(os.path.join('pending', project_name))
    practice_file = open(practice_file_name, 'r')
    for line in practice_file:
        counter += 1
        if not row_counter:
            output_file = open(os.path.join(
                'pending', project_name, str(group_counter) + '.txt'), 'w')
            group_counter += 1
        row_counter += 1
        output_file.write(line)
        if (row_counter == rows_per_group):
            row_counter = 0
    print 'Done!'
    print str(counter), ' lines'
    print str(group_counter), ' groups'

if __name__ == '__main__':
    main()