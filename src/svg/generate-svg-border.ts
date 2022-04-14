import {pickRandomColorName} from './color';

export type GenerateSvgBorder = {
    width: number;
    height: number;
    strokeWidth: number;
};

export function generateSvgBorder(inputs: GenerateSvgBorder) {
    const randomColor = pickRandomColorName();

    return `<rect width="${inputs.width}" height="${inputs.height}" fill="none" stroke="${randomColor}" stroke-width="${inputs.strokeWidth}"/>`;
}
