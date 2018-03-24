const fs = require('fs');
const path = require('path');

class TestGenerator {

    constructor() {
        this.id = 'id_1';
        this.srcDir = '../src/';
        this.uniteTestDir = '../test/unit/';
        this.excludedFolders = ['algorithm-repository', 'data', 'routes', 'bin'];
        this.excludedFiles = ['app.js'];
        this.testFileTemplate = '../generators/unit-test.js';
    };

    replaceAll (source,  search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    getPathPrefix(currentPath, parentName = 'test') {
        const depth = (currentPath.substring(currentPath.indexOf(parentName)).match(/\//g) || []).length;
        return Array(depth).join("../");
    };

    copyData(savPath, targetFile) {
        fs.readFile(testFileTemplate, 'utf8', function (err, data) {
            if (err) throw err;

            data = replaceAll(data,'//', '').replace('$$file_name', getPathPrefix(savPath) + targetFile);

            fs.writeFile(savPath, data, function (err) {
                if (err) {
                    console.log('failed to create directory', err);
                }
                else {
                    console.log('Test file created :' + savPath);
                }
            });
        });
    };

    createTestsFiles(srcPath, destPath) {

        fs.readdirSync(srcPath).forEach(file => {

            const fileStat = fs.statSync(srcPath + file);
            if (fileStat.isDirectory() && !excludedFolders.includes(file)) {
                fs.mkdir(destPath + file, function (err) {
                    if (err && err.code != 'EEXIST') {
                        console.log('failed to create directory', err);
                    }
                    else {
                        createTestsFiles(srcPath + file + '/', destPath + file + '/');
                    }
                });
            }
            else if (path.extname(file) == '.js' && !excludedFiles.includes(file)) {

                const testFileName = destPath + file.replace('.js', '_unit-test.js');

                if (!fs.existsSync(testFileName)) {
                    copyData(testFileName, srcPath + file);
                }
            }
        });
    };
};

module.exports = TestGenerator;