const { describeRequired } = require("vue-docgen-api/dist/script-handlers/propHandler");

const fs = require('fs');
const path = require('path');
const docGen = require('vue-docgen-api');

if (process.argv.length !== 3) {
    console.error('useage: node parse.js PATH_TO_VUE_FILE');
    process.exit();
}

let vueFilePath = process.argv[2];

if (!fs.existsSync(vueFilePath)) {
    console.error(`${vueFilePath} does not exist`);
    process.exit();
}

let vueComponentName = path.basename(vueFilePath, path.extname(vueFilePath));

(async () => {
    let componentInfo = await docGen.parse(vueFilePath);
    let componentInfoString = JSON.stringify(componentInfo, null, 4);
    fs.writeFileSync(`${vueComponentName}.parsed.json`, componentInfoString);
})();
