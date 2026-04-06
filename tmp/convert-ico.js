const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Install temporary dependency
console.log('Installing png-to-ico...');
execSync('npm install png-to-ico', { stdio: 'inherit' });

const pngToIco = require('png-to-ico');
const convert = (typeof pngToIco === 'function') ? pngToIco : pngToIco.default || pngToIco;

const source = path.join(__dirname, '..', 'public', 'icon-source.png');
const target = path.join(__dirname, '..', 'public', 'favicon.ico');

convert(source)
  .then(buf => {
    fs.writeFileSync(target, buf);
    console.log('Favicon created successfully at ' + target);
  })
  .catch(err => {
    console.error('Failed to convert png to ico:', err);
    process.exit(1);
  });
