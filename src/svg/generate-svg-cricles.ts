import {rand, randWhole} from '../augments/random';
import {pickRandomColorName} from './color';
export type GenerateRandomSvgCircleInputs = {
    maxX: number;
    maxY: number;
    maxR: number;
    minR: number;
};

function generateRandomSvgCircle(inputs: GenerateRandomSvgCircleInputs): string {
    const radius = randWhole({max: inputs.maxR, min: inputs.minR, excludeMax: false});

    const position = {
        x: randWhole({max: inputs.maxX}),
        y: randWhole({max: inputs.maxY}),
    };

    const fillColor = pickRandomColorName();

    const opacity = rand({min: 0.3, max: 1}).toFixed(2);

    return `<circle cx="${position.x}" cy="${position.y}" r="${radius}" fill="${fillColor}" fill-opacity="${opacity}"/>`;
}

export function generateRandomSvgCircles(
    count: number,
    options: GenerateRandomSvgCircleInputs,
): string {
    const circles = Array(count)
        .fill(0)
        .map(() => {
            return generateRandomSvgCircle(options);
        });
    return circles.join('\n');
}
