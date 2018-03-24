const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

class TestGenerator {

    constructor(src, unitTest, integTest, unitTestTemplate, integTestTemplate, excludedDirectories, excludedFiles) {
        this.srcDir = src;
        this.uniteTestDir = unitTest;
        this.integTestDir = integTest;
        this.unitTestTemplate = unitTestTemplate;
        this.integTestTemplate = integTestTemplate;
        this.excludedFolders = excludedDirectories.split(',');
        this.excludedFiles = excludedFiles.split(',');
    };

    generate() {
        this.createTestsFiles(this.srcDir, this.uniteTestDir);
    };

    createTestsFiles(srcPath, destPath) {

        fs.readdirSync(srcPath).forEach(file => {

            const fileStat = fs.statSync(srcPath + file);
            if (fileStat.isDirectory() && !this.excludedFolders.includes(file)) {
                fs.mkdir(destPath + file, function (err) {
                    if (err && err.code != 'EEXIST') {
                        console.log('failed to create directory', err);
                    }
                    else {
                        this.createTestsFiles(srcPath + file + '/', destPath + file + '/');
                    }
                });
            }
            else if (path.extname(file) == '.js' && !this.excludedFiles.includes(file)) {

                if(!fs.existsSync(destPath)) {
                    shell.mkdir('-p', destPath);
                }

                //TODO: make unit test file extension configurable
                const testFileName = destPath + file.replace('.js', '.spec.js');

                if (!fs.existsSync(testFileName)) {
                    this.copyData(testFileName, srcPath + file);
                }

            }
        });
    };

    getPathPrefix(currentPath, parentName = 'test') {
        const depth = (currentPath.substring(currentPath.indexOf(parentName)).match(/\//g) || []).length;
        return Array(depth).join("../");
    };

    copyData(savPath, targetFile) {
        var data = fs.readFileSync(this.unitTestTemplate, 'utf8');

        data = data.replace('$$file_name', this.getPathPrefix(savPath) + targetFile);

        fs.writeFile(savPath, data, function (err) {
            if (err) {
                console.log('failed to create directory', err);
            }
            else {
                console.log('Test file created :' + savPath);
            }
        });
    };


};

module.exports = TestGenerator;