const fs = require('fs').promises;
const sharp = require('sharp');
const path = require('path');

async function generateIcons() {
    const svgPath = path.join(__dirname, 'src', 'assets', 'monster-icon.svg');
    const publicDir = path.join(__dirname, 'public');
    const buildDir = path.join(__dirname, 'build');
    
    try {
        const svgBuffer = await fs.readFile(svgPath);
        
        // Generate icons for public directory
        console.log('Generating icons for public directory...');
        
        // Generate monster192.png
        await sharp(svgBuffer)
            .resize(192, 192)
            .png()
            .toFile(path.join(publicDir, 'monster192.png'));

        // Generate monster512.png
        await sharp(svgBuffer)
            .resize(512, 512)
            .png()
            .toFile(path.join(publicDir, 'monster512.png'));

        // Generate favicon.ico sizes
        const faviconSizes = [16, 32, 48, 64];
        const faviconBuffers = await Promise.all(
            faviconSizes.map(size => 
                sharp(svgBuffer)
                    .resize(size, size)
                    .toFormat('png')
                    .toBuffer()
            )
        );
        
        // Combine all sizes into one ICO file
        await sharp(faviconBuffers[0])  // Use 16x16 as base
            .toFile(path.join(publicDir, 'favicon.ico'));

        console.log('Icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons();
