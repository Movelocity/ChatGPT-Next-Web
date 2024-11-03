const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../app/icons');
const indexFile = path.join(iconsDir, 'index.ts');

// Read all SVG files in the icons directory
const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

// Function to convert kebab-case to PascalCase
const toPascalCase = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Generate import and export statements
let imports_text = '';
let exports_text = 'export {\n';

svgFiles.forEach(file => {
  const iconName = path.basename(file, '.svg');
  const variableName = toPascalCase(iconName) + 'Icon';
  imports_text += `import ${variableName} from './${file}';\n`;
  exports_text += `    ${variableName},\n`;
});

exports_text += '};\n';

// Write to index.ts
const content = `${imports_text}\n${exports_text}`;
fs.writeFileSync(indexFile, content);

console.log('Icons index.ts file has been updated.');

/** 
const toPascalCase = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
const results = []
function parseIconsImports(text) {
  results.length = 0
  const lines = text.split("\n");
  lines.forEach(line => {
    if (!line.startsWith("import")) return;
    const parts = line.split(' ')
    const import_name = parts[1];
    const fileName = parts[3].split('/')[2].split('.')[0]
    const trueImportName = toPascalCase(fileName)+"Icon";
    if(import_name !== trueImportName){
      results.push(trueImportName + " as " + import_name)
    } else {
      results.push(trueImportName)
    }
  })
}

parseIconsImports(``)
setTimeout(()=>{console.log("import { "+results.join(", ") + "} from \"@/app/icons\"")}, 1000)
*/