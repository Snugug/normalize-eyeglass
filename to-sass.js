'use strict';

var fs = require('fs');
var path = require('path');
var getInstalledPath = require('get-installed-path');

getInstalledPath('normalize.css', {
  local: true,
  cwd: process.mainModule.paths,
}).then(locale => {
  // Output file paths
  var input = path.join(locale, 'normalize.css');
  var output = path.join(__dirname, '_normalize.scss');

  // Clean up Sass file if it's already there
  try {
    fs.statSync(output);
    fs.unlinkSync(output);
    console.log('Removed old version of _normalize.scss');
  } catch(e) {
    // It's OK if this errors, it means the file doesn't exist
  }

  // Cpoy input file to output file
  fs.writeFileSync(output, fs.readFileSync(input));
  console.log('Copied normalize.css to _normalize.scss');
}).catch(e => {
  console.error(e);
});
