// Run this in Chrome DevTools Console
// It will diagnose centering issues

console.clear();
console.log('=== CENTERING DIAGNOSTIC ===\n');

// 1. Check HTML/Body widths
const html = document.documentElement;
const body = document.body;
console.log('1. ROOT ELEMENTS:');
console.log(`   html width: ${html.offsetWidth}px, scrollWidth: ${html.scrollWidth}px`);
console.log(`   body width: ${body.offsetWidth}px, scrollWidth: ${body.scrollWidth}px`);
console.log(`   viewport width: ${window.innerWidth}px\n`);

// 2. Find all max-w-7xl mx-auto elements
const containers = document.querySelectorAll('[class*="max-w-7xl"][class*="mx-auto"], [class*="max-w-"][class*="mx-auto"]');
console.log(`2. FOUND ${containers.length} CONTAINERS WITH max-w + mx-auto:\n`);

containers.forEach((container, i) => {
    const computed = window.getComputedStyle(container);
    const parent = container.parentElement;
    const parentComputed = window.getComputedStyle(parent);

    console.log(`   Container #${i + 1}:`);
    console.log(`   - Element: ${container.tagName}.${container.className.split(' ').slice(0, 3).join('.')}`);
    console.log(`   - Width: ${container.offsetWidth}px`);
    console.log(`   - Max-width: ${computed.maxWidth}`);
    console.log(`   - Margin-left: ${computed.marginLeft}`);
    console.log(`   - Margin-right: ${computed.marginRight}`);
    console.log(`   - Margin-inline: ${computed.marginInline || 'not set'}`);
    console.log(`   - Position relative to viewport: ${container.getBoundingClientRect().left}px from left`);
    console.log(`   - Parent width: ${parent.offsetWidth}px`);
    console.log(`   - Parent display: ${parentComputed.display}`);
    console.log(`   - Parent position: ${parentComputed.position}`);
    console.log('');
});

// 3. Check for conflicting CSS
console.log('3. CHECKING FOR CSS CONFLICTS:\n');
const allDivs = document.querySelectorAll('div[class*="mx-auto"]');
allDivs.forEach((div, i) => {
    const computed = window.getComputedStyle(div);
    if (computed.marginLeft !== 'auto' && computed.marginInline !== 'auto') {
        console.log(`   ⚠️ Found mx-auto element WITHOUT auto margins:`);
        console.log(`   - ${div.tagName}.${div.className}`);
        console.log(`   - marginLeft: ${computed.marginLeft}`);
        console.log(`   - marginRight: ${computed.marginRight}`);
        console.log(`   - marginInline: ${computed.marginInline || 'not set'}`);
    }
});

// 4. Check sections
console.log('\n4. SECTIONS ANALYSIS:\n');
const sections = document.querySelectorAll('section');
sections.forEach((section, i) => {
    const computed = window.getComputedStyle(section);
    const rect = section.getBoundingClientRect();
    console.log(`   Section #${i + 1}:`);
    console.log(`   - Width: ${section.offsetWidth}px`);
    console.log(`   - Padding-left: ${computed.paddingLeft}`);
    console.log(`   - Padding-right: ${computed.paddingRight}`);
    console.log(`   - Left edge: ${rect.left}px from viewport left`);
    console.log(`   - Display: ${computed.display}`);
    console.log('');
});

// 5. Check if anything has fixed width that shouldn't
console.log('5. LOOKING FOR WIDTH CONSTRAINTS:\n');
const potentialCulprits = document.querySelectorAll('[style*="width"], [style*="max-width"]');
if (potentialCulprits.length > 0) {
    console.log(`   Found ${potentialCulprits.length} elements with inline width styles:`);
    potentialCulprits.forEach(el => {
        console.log(`   - ${el.tagName}.${el.className}: ${el.style.width || el.style.maxWidth}`);
    });
} else {
    console.log('   ✓ No inline width styles found');
}

// 6. Visual test - create a centered line
console.log('\n6. CREATING VISUAL CENTER LINE (look at the page now):\n');
const centerLine = document.createElement('div');
centerLine.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100vh;
    background: lime;
    z-index: 999999;
    pointer-events: none;
`;
document.body.appendChild(centerLine);
console.log('   ✓ Green line added at viewport center');

// 7. Highlight first max-w-7xl container
const firstContainer = document.querySelector('[class*="max-w-7xl"]');
if (firstContainer) {
    firstContainer.style.outline = '3px solid red';
    const rect = firstContainer.getBoundingClientRect();
    const center = rect.left + (rect.width / 2);
    const viewportCenter = window.innerWidth / 2;
    const offset = center - viewportCenter;

    console.log('\n7. FIRST max-w-7xl CONTAINER ANALYSIS:');
    console.log(`   - Container center: ${center.toFixed(2)}px`);
    console.log(`   - Viewport center: ${viewportCenter.toFixed(2)}px`);
    console.log(`   - Offset: ${offset.toFixed(2)}px ${offset > 0 ? 'RIGHT' : 'LEFT'} of center`);

    if (Math.abs(offset) > 5) {
        console.log(`   ❌ CONTAINER IS NOT CENTERED! Off by ${Math.abs(offset).toFixed(2)}px`);
    } else {
        console.log(`   ✓ Container is centered`);
    }

    console.log(`\n   Red outline added to first container`);
}

console.log('\n=== END DIAGNOSTIC ===');
console.log('Copy ALL of this output and send it back.');
