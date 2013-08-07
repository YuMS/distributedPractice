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
    print 'tasks:', str(len(origin_files))
    for origin_file in origin_files:
        print origin_file.split('.')[0],
    print
    if not os.path.exists(os.path.join('result', project_name)):
        print 'done: 0'
        sys.exit()
    done_files = os.listdir(os.path.join('result', project_name))
    print 'done:', str(len(done_files))
    for done_file in done_files:
        print done_file.split('.')[0],
        user = done_file.split('.')[0].split(delimiter)[1]
        if user != '':
            if worker_dict.has_key(user):
                worker_dict[user] += 1
            else:
                worker_dict[user] = 1
    print
    print 'user:', str(len(worker_dict))
    for user, amount in worker_dict.iteritems():
        print user + ':', str(amount), 
    print

if __name__ == '__main__':
    main()