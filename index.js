var promise = require('bluebird');
var _ = require('lodash');

var callback = function (err) {
    console.log(err)
}


function process() {
    return new promise(function (resolve) {

        var files = [
            '/a.png',
            '/b.png'
        ]

        var stack = [];

        _.each(files, function (file) {
            stack.push({
                file: file,
                process: function () {
                    return new promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve()
                        },2000)
                    })
                }
            })
        })

        processList(stack).then(function () {
            resolve();
        })

    })
}
process().then(function () {
    console.log("final process")
    callback()
})


function processList(stacklist,cb) {
    var totalResolved = 0;

    var p = stacklist[0].process();
    for(var i = 1; i<stacklist.length; i++){
        p.then(stacklist[i].process);
    }

    return p;
}