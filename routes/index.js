/**
 * Author: YuMS
 */
var fs = require('fs')

exports.index = {
    get: function(req, res) {
        data = [2];
        res.render('index', { project: 'hehe', data: data });
    }
};

exports.practice = {
    get: function(req, res) {
        group = req.param('group');
        project = req.param('project');
        if (typeof group == 'undefined' || typeof project == 'undefined') {
            res.redirect('/');
        }
        fs.readFile('pending/' + project + '/' + group + '.txt', 'utf-8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.split('\n');
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].trim()
            }
            res.render('practice', { project: project, group: group, data: data });
        })
    },
    post: function(req, res) {
        group = req.param('group');
        project = req.param('project');
        name = req.param('name');
        result = req.param('result');
        if (typeof group == 'undefined' || typeof project == 'undefined' || typeof name == 'undefined' || typeof result == 'undefined') {
            res.redirect('/');
        }
        console.log(result.length);
        data = '';
        for (var i = 0; i < result.length; i++) {
            data += result[i] + '\n';
        }
        if (!fs.existsSync('result')) {
            fs.mkdirSync('result');
        }
        if (!fs.existsSync('result/' + project)) {
            fs.mkdirSync('result/' + project);
        }
        filename = 'result/' + project + '/' + group + '_' + name + '.txt';
        fs.writeFileSync(filename, data);
        console.log('query', req.query.valueOf());
        console.log('body', req.body.valueOf());
        console.log('params', req.params.valueOf());
        res.render('thankyou', name);
    }
};

exports.thankyou = {
    get: function(req, res) {
        res.render('thankyou');
    }
};
