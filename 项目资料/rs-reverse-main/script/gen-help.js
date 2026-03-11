const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const getHelpCode = (command) => {
  console.log(`执行命令：${command}`);
  return [
    '```bash',
    `$ npx rs-reverse ${command}`,
    execSync(`node main.js ${command}`, { encoding: 'utf8' }).trim().replace('main.js', 'rs-reverse'),
    '```',
  ].join('\n');
}

const helpMap = {
  execHelp: getHelpCode('exec -h'),
  execExample: [
    getHelpCode("exec -c '+ascii2string(gv.keys[21])'"),
    getHelpCode("exec -c '+ascii2string(gv.keys[21])' -j ./example/codes/main.js -f ./example/codes/\\$_ts.json"),
  ].join('\n\n'),
  makecodeHelp: getHelpCode('makecode -h'),
  makecodeExample: [
    getHelpCode('makecode'),
    getHelpCode('makecode -u https://www.riversecurity.com/'),
    getHelpCode("makecode -j ./example/codes/main.js -f ./example/codes/\\$_ts.json"),
  ].join('\n\n'),
  makecodeHighHelp: getHelpCode('makecode-high -h'),
  makecodeHighExample: [
    getHelpCode('makecode-high -u https://zhaopin.sgcc.com.cn/sgcchr/static/home.html'),
  ].join('\n'),
  makecookieHelp: getHelpCode('makecookie -h'),
  makecookieExample: [
    getHelpCode('makecookie'),
    getHelpCode('makecookie -u https://www.riversecurity.com/'),
    getHelpCode("makecookie -j ./example/codes/main.js -f ./example/codes/\\$_ts.json"),
  ].join('\n\n'),
}

const template = fs.readFileSync(path.resolve(__dirname, '../README.template.md'), 'utf8');

const newReadme = Object.entries(helpMap).reduce((ans, [key, text]) => ans.replace(`<!-- ${key} -->`, text), template);

fs.writeFileSync(path.resolve(__dirname, '../README.md'), newReadme, 'utf8');
