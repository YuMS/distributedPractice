#!python
# -*- coding: utf-8 -*-

import sys
import os


def main():
    if len(sys.argv) < 2:
        print 'usage: %s projectName' % sys.argv[0]
        sys.exit(-1);
    project_name = sys.argv[1]
    delimiter = '___'
    worker_dict = {}
    if not os.path.exists(os.path.join('pending', project_name)):
        print 'no such a project:', project_name
        sys.exit()
    origin_files = os.listdir(os.path.join('pending', project_name))
    origin_files.sort(key=lambda x: int(x.split('.')[0]))
    origin_groups = [x.split('.')[0] for x in origin_files]
    if not os.path.exists(os.path.join('result', project_name)):
        print 'no result yet'
        sys.exit()
    if not os.path.exists('combine'):
        os.mkdir('combine')
    done_files = os.listdir(os.path.join('result', project_name))
    done_dict = dict([(x.split(delimiter)[0], x) for x in done_files])
    output_file = open(os.path.join('combine', project_name + '.txt'), 'w')
    for origin_groups in origin_groups:
        if done_dict.has_key(origin_groups):
            result_file = open(os.path.join('result', project_name, done_dict[origin_groups]), 'r')
            for line in result_file:
                output_file.write(line)
    print 'Done!'
    print 'result is stored in combine/%s' % project_name + '.txt'

if __name__ == '__main__':
    main()