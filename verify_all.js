const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let errorCount = 0;

function check(label, condition, errMsg) {
  if (condition) {
    console.log(`[PASS] ${label}`);
  } else {
    console.error(`[FAIL] ${label}: ${errMsg}`);
    errorCount++;
  }
}

// 1. Check project SVGs
const projectsDir = path.join(root, 'assets/projects');
const svgs = fs.readdirSync(projectsDir).filter(f => f.endsWith('.svg'));
check('24 Project SVGs exist', svgs.length === 24, `Found ${svgs.length} SVGs`);

svgs.forEach(s => {
  const content = fs.readFileSync(path.join(projectsDir, s), 'utf8');
  check(`SVG valid: ${s}`, content.includes('<svg') && content.includes('</svg>'), 'Invalid SVG structure');
});

// 2. Check index.html elements
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
check('index.html contains #projectDetailsModal', indexHtml.includes('id="projectDetailsModal"'), 'Missing #projectDetailsModal');
check('index.html contains #projectModalBody', indexHtml.includes('id="projectModalBody"'), 'Missing #projectModalBody');
check('index.html contains #projectModalCloseBtn', indexHtml.includes('id="projectModalCloseBtn"'), 'Missing #projectModalCloseBtn');
check('index.html contains #skills section', indexHtml.includes('id="skills"'), 'Missing #skills');
check('index.html contains #software section', indexHtml.includes('id="software"'), 'Missing #software');
check('index.html contains #projects section', indexHtml.includes('id="projects"'), 'Missing #projects');

// 3. Check CSS components
const compCss = fs.readFileSync(path.join(root, 'css/components.css'), 'utf8');
check('components.css has .project-modal', compCss.includes('.project-modal'), 'Missing .project-modal CSS');
check('components.css has .project-card-footer', compCss.includes('.project-card-footer'), 'Missing .project-card-footer CSS');
check('components.css has .project-hover-lens', compCss.includes('.project-hover-lens'), 'Missing .project-hover-lens CSS');

// 4. Check JS default tools count
const arenaJs = fs.readFileSync(path.join(root, 'js/tools-arena.js'), 'utf8');
const toolMatches = arenaJs.match(/id:\s*['"]tool-/g);
check('50 Tools in tools-arena.js', toolMatches && toolMatches.length === 50, `Found ${toolMatches ? toolMatches.length : 0} tools`);

// 5. Check projects-manager.js
const projJs = fs.readFileSync(path.join(root, 'js/projects-manager.js'), 'utf8');
const projMatches = projJs.match(/id:\s*['"]proj-/g);
check('24 Projects in projects-manager.js', projMatches && projMatches.length === 24, `Found ${projMatches ? projMatches.length : 0} projects`);

console.log(`\n========================================`);
if (errorCount === 0) {
  console.log(`ALL CHECKS PASSED PERFECTLY! (0 errors)`);
} else {
  console.error(`VERIFICATION FAILED WITH ${errorCount} ERRORS!`);
  process.exit(1);
}
console.log(`========================================\n`);
