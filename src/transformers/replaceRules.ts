import { RuleAccuracy } from "../options";

const DATA: { [lang: string]: ReplaceRule[] } = require('../../replace-rules.json');

// transform string regexp to RegExp:
Object.keys(DATA).forEach(lang => {
    for (let rule of DATA[lang]) {
        rule.reg = new RegExp(rule.reg, rule.flags);
    }
});

export type ReplaceRule = {
    reg: RegExp
    replace?: string
    flags?: string
    examples?: { [index: string]: string }
    accuracy?: RuleAccuracy
}

export function getRules(lang: string) {
    return DATA[lang] || [];
}
