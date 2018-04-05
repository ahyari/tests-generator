const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

class TestGenerator {

    constructor(src, unitTest, integTest, unitTestTemplate, integTestTemplate, excludedDirectories, excludedFiles, type
        , baseTestClass) {
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
            self.copyData(this.uniteTestDir, "", "BaseTest.js", self.baseTestClass);
            console.log("Unit tests generated successfully.");
        }
        else {
            //generate integration
            self.createTestsFiles(self.srcDir, self.integTestDir, self.integTestTemplate);
            self.copyData(self.integTestDir, "", "BaseTest.js", self.baseTestClass);
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
                        self.createTestsFiles(srcPath + file + "/", destPath + file + "/", testTemplate);
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
                    self.copyData(testFileName, srcPath, file, testTemplate);
                }

            }
        });

    };

    static getPathPrefix(currentPath, parentName = "test") {
        const depth = (currentPath.substring(currentPath.indexOf(parentName)).match(/\//g) || []).length;
        return Array(depth).join("../");
    };

    static getClassName(string) {

        return string.replace(/[^\w\s]/gi, ' ')
            .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
            .replace(new RegExp(" ", 'g'), '')
            .replace(new RegExp(".js", 'g'), '');
    };

    copyData(savPath, srcPath, fileName, fileToCopy) {
        try {
            let data = fs.readFileSync(fileToCopy, "utf8");


            let tempData = data
                .replace(new RegExp("pathToBaseTest", 'g'), TestGenerator.getPathPrefix(savPath))
                .replace(new RegExp("targetFile", 'g'),  fileName)
                .replace(new RegExp("targetFileName", 'g'), TestGenerator.getClassName(fileName))
                .replace(new RegExp("pathToSrc", 'g'), TestGenerator.getPathPrefix(srcPath))
                .replace(new RegExp("ClassName", 'g'), TestGenerator.getClassName(fileName));

            fs.writeFile(savPath + fileName, tempData, function (err) {
                if (err) {
                    console.log("failed to create directory", err);
                }
            });
        } catch (err) {
            console.log("Error reading :" + fileToCopy, "savPath : ", savPath, "fileName : ", fileName);
            console.error("Error details :" + err);
        }
    };
}

module.exports = TestGenerator;