import {writeFile} from 'fs/promises';

export type GenerateSvgFileInputs = {
    filePath: string;
    svgContents: string;
    svgSize: {
        height: number;
        width: number;
    };
};

export async function saveSvgToFile(inputs: GenerateSvgFileInputs): Promise<string> {
    const height = Number(inputs.svgSize.height);
    if (isNaN(height)) {
        throw new Error(
            `Height given to "${saveSvgToFile.name}" is not a number: "${inputs.svgSize.height}"`,
        );
    }
    const width = Number(inputs.svgSize.width);
    if (isNaN(width)) {
        throw new Error(
            `Width given to "${saveSvgToFile.name}" is not a number: "${inputs.svgSize.width}"`,
        );
    }

    const svgString = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${inputs.svgContents}</svg>`;

    const saveFileName = inputs.filePath;

    await writeFile(saveFileName, svgString);

    return svgString;
}
