import { Options, createOptions, RuleAccuracy } from "../options";
import { getRules, ReplaceRule } from "./replaceRules";

type TransformWord = {
    word: string
    transform: boolean
}

export default function transform(name: string, lang: string, options?: Options): string {
    const rules = getRules(lang);
    if (!rules.length) {
        return name;
    }
    options = createOptions(options);
    let names: TransformWord[] = name.split(/\s+/g)
        .map(word => ({ word, transform: word.length > options.minWordLength }))

    const rootNames = names.map(item => {
        if (item.transform) {
            const w = internalTransform(rules, item.word, options.accuracy)
            if (w.length >= options.minWordLength) {
                return w
            }
        }
        return item.word
    })
    return rootNames.join(' ')
}

function internalTransform(rules: ReplaceRule[], name: string, accuracy: RuleAccuracy): string {
    for (let rule of rules) {
        if (Number.isInteger(rule.accuracy) && accuracy > rule.accuracy) {
            continue;
        }
        let root = name.replace(rule.reg, rule.replace || '')
        if (root !== name) {
            return root
        }
    }
    return name
}
