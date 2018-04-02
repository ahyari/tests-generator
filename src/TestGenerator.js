const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

class TestGenerator {

    constructor(src, unitTest, integTest, unitTestTemplate, integTestTemplate, excludedDirectories, excludedFiles, type
    ,baseTestClass) {
        this.srcDir = src;
        this.uniteTestDir = unitTest;
        this.integTestDir = integTest;
        this.unitTestTemplate = unitTestTemplate;
        this.integTestTemplate = integTestTemplate;
        this.excludedFolders = excludedDirectories.split(",");
        this.excludedFiles = excludedFiles.split(",");
        this.testType = type;//create enum
        this.baseTestClass = baseTestClass;//create enum
    };

    generate() {
        const self = this;
        if (self.testType === "unit") {
            //generate unit test
            self.createTestsFiles(this.srcDir, self.uniteTestDir, self.unitTestTemplate);
            self.copyData(this.uniteTestDir, "", self.baseTestClass);
            console.log("Unit tests generated successfully.");
        }
        else {
            //generate integration
            self.createTestsFiles(self.srcDir, self.integTestDir, self.integTestTemplate);
            self.copyData(self.integTestDir, "", self.baseTestClass);
            console.log("Integration tests generated successfully.");
        }


    };

    createTestsFiles(srcPath, destPath, testTemplate) {
        const self = this;

        fs.readdirSync(srcPath).forEach(function (file) {

            const fileStat = fs.statSync(srcPath + file);

            if (fileStat.isDirectory() && !self.excludedFolders.includes(file)) {
                fs.mkdir(destPath + file, function (err) {
                    if (err && err.code !== "EEXIST") {
                        console.log("failed to create directory", err);
                    }
                    else {
                        self.createTestsFiles(srcPath + file + "/", destPath + file + "/",testTemplate);
                    }
                });
            }
            else if (path.extname(file) === ".js" && !self.excludedFiles.includes(file)) {

                if (!fs.existsSync(destPath)) {
                    shell.mkdir("-p", destPath);
                }

                //TODO: make unit test file extension configurable
                const testFileName = destPath + file.replace(".js", ".spec.js");

                if (!fs.existsSync(testFileName)) {
                    self.copyData(testFileName, srcPath + file, testTemplate);
                }

            }
        });

    };

    static getPathPrefix(currentPath, parentName = "test") {
        const depth = (currentPath.substring(currentPath.indexOf(parentName)).match(/\//g) || []).length;
        return Array(depth).join("../");
    };

    copyData(savPath, targetFile, fileToCopy) {
        try {
            let data = fs.readFileSync(fileToCopy, "utf8");

            data = data
                .replace("$$srcPath", TestGenerator.getPathPrefix(savPath) + targetFile)
                .replace("$$unitTestPath", TestGenerator.getPathPrefix(savPath, "unit"))
                .replace("$$Class_Name", targetFile);

            fs.writeFile(savPath, data, function (err) {
                if (err) {
                    console.log("failed to create directory", err);
                }
                else {
                    console.log("Test file created :" + savPath);
                }
            });
        } catch (err) {
            console.log("Error reading :" + fileToCopy, "savPath : ",savPath, "targetFile : ",targetFile);
            console.error("Error details :" + err);
        }
    };


};

module.exports = TestGenerator;