const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/build/pdf.js');
const { createCanvas } = require('canvas');

if (typeof globalThis.DOMMatrix === 'undefined') {
    const { DOMMatrix } = require('canvas');
    globalThis.DOMMatrix = DOMMatrix;
}
if (typeof globalThis.Path2D === 'undefined') {
    const { Path2D } = require('canvas');
    globalThis.Path2D = Path2D;
}

async function extractImages() {
    const pdfPath = path.join('G:\\realestate', 'RUKMANI VIHAR  LAYOUT PLAN-1.pdf');
    const outDir = path.join('G:\\realestate', 'images');
    
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    
    console.log(`PDF has ${pdf.numPages} pages`);
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2 });
            
            const canvas = createCanvas(viewport.width, viewport.height);
            const ctx = canvas.getContext('2d');
            
            await page.render({
                canvasContext: ctx,
                viewport: viewport
            }).promise;
            
            const filename = `layout_page_${pageNum}.png`;
            const filepath = path.join(outDir, filename);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(filepath, buffer);
            console.log(`Page ${pageNum}: ${filename} (${Math.round(buffer.length/1024)}KB)`);
        } catch (e) {
            console.log(`Page ${pageNum}: error - ${e.message.substring(0, 60)}`);
        }
    }
    
    console.log('\nDone!');
}

extractImages().catch(console.error);
