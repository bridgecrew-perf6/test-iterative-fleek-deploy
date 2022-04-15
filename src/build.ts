import {ensureDir, remove} from 'fs-extra';
import {writeFile} from 'fs/promises';
import {basename, dirname, join} from 'path';
import {saveRandomSvg} from './svg/generate-random-svg';

const filesToGenerate = 999;
const svgSize = {
    width: 25,
    height: 25,
} as const;
const buildDir = join(dirname(__dirname), 'build');

async function generateHtmlFile(svgFilePaths: string[]) {
    const htmlString = `
<!DOCTYPE html>
<html>
    <head>
        <style>
            html, body {
                margin: 0;
                padding: 0;
                min-height: 100%;
                min-width: 100%;
            }
            
            body {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
        </style>
    </head>
    <body>
        ${svgFilePaths
            .map((filePath) => {
                const fileName = basename(filePath);
                return `<img src="${fileName}"/>`;
            })
            .join('\n        ')}
    </body>
</html>`;

    const htmlFilePath = join(buildDir, 'index.html');
    await writeFile(htmlFilePath, htmlString);
}

async function build() {
    await remove(buildDir);
    await ensureDir(buildDir);
    const svgFileNames = await Promise.all(
        Array(filesToGenerate)
            .fill(0)
            .map(async () => {
                return saveRandomSvg({
                    ...svgSize,
                    saveDir: buildDir,
                });
            }),
    );

    await generateHtmlFile(svgFileNames);
}

if (require.main === module) {
    build().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
