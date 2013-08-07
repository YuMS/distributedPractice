/**
 * Author: YuMS
 */
var fs = require('fs')
    , claimed = {};

var delimiter = '___';

function excludeClaimed(element, index, array) {
    if (typeof this.project == 'undefined') {
        console.log('this.project is undefined');
        return true;
    } 
    if (typeof claimed[this.project] == 'undefined') {
        console.log('claimed[this.project] is undefined');
        return true;
    } 
    return !claimed[this.project].some(function (element_) {
        return element_ == element;
    });
}

function excludeFinished(element, index, array) {
    if (typeof this.finished == 'undefined') {
        console.log('this.finished is undefined');
        return true;
    } 
    console.log('this.finished', this.finished);
    console.log('element', [element]);
    return !this.finished.some(function (element_) {
        return element_ == element;
    });
}

function getGroup(element, index, array) {
    return (element.split(delimiter)[0]);
}

function excludeExt(element, index, array) {
    return (element.split('.')[0]);
}

exports.index = {
    get: function(req, res) {
        fs.readdir('pending', function(err, projects) {
            if (err) {
                console.log(err);
                return res.redirect('/error');
            }
            res.render('index', {projects: projects});
        })
    }
};

exports.claim = {
    get: function(req, res) {
        project = req.param('project');
        if (typeof project == 'undefined') {
            return res.redirect('/error');
        }
        var data = {};
        fs.readdir('pending/' + project, function(err, pendings) {
            if (err) {
                console.log(err);
                return res.redirect('/error');
            }
            fs.readdir('result/' + project, function(err, results) {
                if (err) {
                    console.log(err);
                    results = [];
                }
                if (typeof claimed[project] == 'undefined') {
                    claimed[project] = Array();
                }
                results = results.map(excludeExt).filter(excludeClaimed, this);
                finished = results.map(getGroup);
                pendings = pendings.map(excludeExt).filter(excludeClaimed, this).filter(excludeFinished, this);
                console.log('pendings', pendings);
                console.log('claimed[project]', claimed[project]);
                console.log('results', results);
                console.log('finished', finished);
                data.pending = pendings;
                data.results = results;
                data.claimed = claimed[project];
                res.render('claim', {project: project, data: data})
            });
        });
    }
}

exports.practice = {
    get: function(req, res) {
        group = req.param('group');
        project = req.param('project');
        if (typeof group == 'undefined' || typeof project == 'undefined') {
            return res.redirect('/error');
        }
        if (typeof claimed[project] == 'undefined') {
            claimed[project] = Array();
        }
        cancel = req.param('cancel');
        if (typeof cancel != 'undefined') {
            claimed[project] = claimed[project].filter(function(element) {
                return element != group;
            });
            return res.redirect('/');
        }
        if (claimed[project].some(function (element) {
            return group == element;
        })) {
            return res.render('claimed', {project: project, group: group});
        }
        fs.readdir('result/' + project, function(err, results) {
            if (err) {
                console.log(err);
                results = [];
            }
            results = results.map(excludeExt).map(getGroup, this);
            console.log('here results', results);
            if (results.some(function (element) {
                return group == element;
            })) {
                return res.render('practiced', {project: project, group: group});
            }
            fs.readFile('pending/' + project + '/' + group + '.txt', 'utf-8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.split('\n');
                for (var i = 0; i < data.length; i++) {
                    data[i] = data[i].trim();
                }
                while (data[data.length - 1] == '') {
                    data.pop()
                }
                claimed[project].push(group);
                return res.render('practice', {project: project, group: group, data: data});
            })
        });
    },
    post: function(req, res) {
        console.log('query', req.query.valueOf());
        console.log('body', req.body.valueOf());
        console.log('params', req.params.valueOf());
        group = req.param('group');
        project = req.param('project');
        name = req.param('name');
        result = req.param('result');
        if (typeof group == 'undefined' || typeof project == 'undefined' || typeof name == 'undefined' || typeof result == 'undefined') {
            return res.redirect('/error');
        }
        console.log(result.length);
        claimed[project] = claimed[project].filter(function(element) {
            return element != group;
        });
        cancel = req.param('cancel');
        if (typeof cancel != 'undefined') {
            return res.redirect('/');
        }
        data = '';
        for (var i = 0; i < result.length; i++) {
            data += result[i] + '\n';
        }
        // This is the overhead, sync way makes things clearer
        if (!fs.existsSync('result')) {
            fs.mkdirSync('result');
        }
        if (!fs.existsSync('result/' + project)) {
            fs.mkdirSync('result/' + project);
        }
        resultName = 'result/' + project + '/' + group + delimiter + name + '.txt';
        // Let' s hope there are no two post queries with same params at the same time
        fs.writeFile(resultName, data, function(err) {
            if (err) {
                return console.log(err)
            }
            return res.render('thankyou', name);
        })
    }
};

exports.thankyou = {
    get: function(req, res) {
        res.render('thankyou');
    }
};

exports.errorpage = {
    get: function(req, res) {
        res.render('error');
    }
};
