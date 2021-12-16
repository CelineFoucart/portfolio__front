
const fs = require('fs');
const jsdom = require("jsdom");

const html = fs.readFileSync(__dirname + "/index.html");
const page = new jsdom.JSDOM(html);

module.exports = page;