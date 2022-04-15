import {randomString} from 'augment-vir/dist/node-only';
import {join} from 'path';
import {randWhole} from '../augments/random';
import {generateSvgBorder} from './generate-svg-border';
import {generateRandomSvgCircles} from './generate-svg-cricles';
import {saveSvgToFile} from './save-svg';

export type GenerateRandomSvgInputs = {
    width: number;
    height: number;
    saveDir: string;
};

export async function saveRandomSvg(inputs: GenerateRandomSvgInputs) {
    const borderSvgString: string = generateSvgBorder({...inputs, strokeWidth: 2});
    const circleCount = randWhole({max: 10, min: 1});
    const circlesSvgString: string = generateRandomSvgCircles(circleCount, {
        maxR: Math.min(inputs.width / 3, inputs.height / 3),
        minR: 1,
        maxX: inputs.width,
        maxY: inputs.height,
    });

    const fileName = `${join(inputs.saveDir, randomString(8))}.svg`;

    await saveSvgToFile({
        filePath: fileName,
        svgContents: [
            borderSvgString,
            circlesSvgString,
        ].join('\n'),
        svgSize: {
            width: inputs.width,
            height: inputs.height,
        },
    });

    return fileName;
}
