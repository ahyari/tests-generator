const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

class TestGenerator {

    constructor(src, unitTest, integTest, unitTestTemplate, integTestTemplate, excludedDirectories, excludedFiles, type) {
        this.srcDir = src;
        this.uniteTestDir = unitTest;
        this.integTestDir = integTest;
        this.unitTestTemplate = unitTestTemplate;
        this.integTestTemplate = integTestTemplate;
        this.excludedFolders = excludedDirectories.split(',');
        this.excludedFiles = excludedFiles.split(',');
        this.testType = type;//create enum
    };

    generate() {

        if (this.testType == "unit") {
            //generate unit test
            this.createTestsFiles(this.srcDir, this.uniteTestDir);
            //add base test file
            this.copyData(this.uniteTestDir, "", "./templates/BaseTest.js");
        }
        else {
            //generate integration
            this.createTestsFiles(this.srcDir, this.integTestDir);
            this.copyData(this.integTestDir, "", "./templates/BaseTest.js");
        }


    };

    createTestsFiles(srcPath, destPath) {
        var self = this;

        fs.readdirSync(srcPath).forEach(file = > {

            const fileStat = fs.statSync(srcPath + file);
        if (fileStat.isDirectory() && !this.excludedFolders.includes(file)) {
            fs.mkdir(destPath + file, function (err) {
                if (err && err.code != 'EEXIST') {
                    console.log('failed to create directory', err);
                }
                else {
                    self.createTestsFiles(srcPath + file + '/', destPath + file + '/');
                }
            });
        }
        else if (path.extname(file) == '.js' && !this.excludedFiles.includes(file)) {

            if (!fs.existsSync(destPath)) {
                shell.mkdir('-p', destPath);
            }

            //TODO: make unit test file extension configurable
            const testFileName = destPath + file.replace('.js', '.spec.js');

            if (!fs.existsSync(testFileName)) {
                this.copyData(testFileName, srcPath + file);
            }

        }
    })
        ;
    };

    getPathPrefix(currentPath, parentName = 'test') {
        const depth = (currentPath.substring(currentPath.indexOf(parentName)).match(/\//g) || []).length;
        return Array(depth).join("../");
    };

    copyData(savPath, targetFile, fileToCopy) {
        var data = fs.readFileSync(fileToCopy, 'utf8');

        data = data
            .replace('$$srcPath', this.getPathPrefix(savPath) + targetFile)
            .replace('$$unitTestPath', this.getPathPrefix(savPath, 'unit'))
            .replace('$$Class_Name', targetFile);

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