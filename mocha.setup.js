const { JSDOM } = require('jsdom');
const fs = require('fs');
const Handlebars = require('handlebars');

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"><div/><body/></html>', {
  url: 'http://localhost:3000',
});

global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;
global.onclick = dom.window.onclick;

require.extensions['.hbs'] = (module, filename) => {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
};

require.extensions['.scss', '.svg'] = (module) => {
  module.exports = {};
};
