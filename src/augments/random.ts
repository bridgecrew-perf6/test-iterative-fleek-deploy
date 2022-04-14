export type RandInputs = {
    max: number;
    min?: number;
};

export function randWhole(
    inputs: RandInputs & {
        excludeMax?: boolean;
    },
) {
    const maxOffset = inputs.excludeMax ? 0 : 1;
    return Math.floor(
        rand({
            ...inputs,
            max: maxOffset + inputs.max,
        }),
    );
}

export function rand({max, min = 0}: RandInputs) {
    return min + Math.random() * (max - min);
}
