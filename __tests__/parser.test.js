const parser = require("../index");
const fs = require("fs");
const path = require("path");

const pathToFixture = (file) => path.join(__dirname, "fixtures", file);

test('should parse complex object', () => {
  expect(parser.parse(fs.readFileSync(pathToFixture("complexObject.json"), "utf8"))).toEqual(
      JSON.parse(fs.readFileSync(pathToFixture("expectedResultComplexObject.json"), "utf8"))
  )
});

test('should parse complex array', () => {
   expect(parser.parse(fs.readFileSync(pathToFixture("complexArray.json"), "utf8"))).toEqual(
      JSON.parse(fs.readFileSync(pathToFixture("expectedResultcomplexArray.json"), "utf8"))
  )
});