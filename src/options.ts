
export enum RuleAccuracy {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2
}

export type Options = {
    accuracy?: RuleAccuracy
    minWordLength?: number
}

export function createOptions(options?: Options) {
    return { ...OPTIONS, ...options };
}

const OPTIONS: Options = {
    accuracy: RuleAccuracy.LOW,
    minWordLength: 2
}
