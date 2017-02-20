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

        processList(stack, function () {
            resolve()
        })

    })
}
process().then(function () {
    console.log("final process")
    callback()
})


function processList(stacklist,cb) {
    var loop = true;
    var isRunning = false;
    var currentIndex = 0;
    var totalIndexes = stacklist.length;
    console.log('starting while')


    while(loop){
        if (isRunning){
            continue;
        }

        isRunning = true;
        var s = stacklist[currentIndex];
        var name = s.file;
        s.process().then(function () {
            ++currentIndex;
            isRunning = false;

            if (currentIndex === totalIndexes){
                cb();
            }
        })
    }
}