
type TransformWord = {
    word: string
    transform: boolean
}

export default function transform(name: string, lang: string): string {
    const rules = DATA[lang]
    const MIN_WORD_LENGTH = 2
    if (rules) {
        let names: TransformWord[] = name.split(/\s+/g).map(word => ({ word, transform: word.length > MIN_WORD_LENGTH }))
        switch (lang) {
            case 'ro':
                names.forEach((item, i) => item.transform = item.transform && i == 0)
                break
        }
        const rootNames = names.map(item => {
            if (item.transform) {
                const w = internalTransform(rules, item.word)
                if (w.length >= MIN_WORD_LENGTH) {
                    return w
                }
            }
            return item.word
        })
        return rootNames.join(' ')
    }
    return name
}

function internalTransform(rules: Rule[], name: string): string {
    for (let rule of rules) {
        let root = name.replace(rule.reg, rule.replace)
        if (root !== name) {
            return root
        }
    }
    return name
}

type Rule = {
    reg: RegExp,
    replace: string,
}

const DATA: { [lang: string]: Rule[] } = {
    ro: [
        {
            /**
             * Mariei
             */
            reg: /(-ului|-lui|ei|a|[`']s)$/i,
            replace: '',
        },
        {
            /**
             * Partidului
             */
            reg: /(lui)$/i,
            replace: 'l',
        },
    ],
    ru: [
        {
            /**
             * Путина, Путину, Путиным, Путине, Россия, России
             * Петербургские, Петербургском, Петербургом, Петербургской,
             * Петербургский, Петербургская, Российскую, Федерацию
             */
            reg: /(йские|йском|йской|йский|йская|йскую|ские|ском|ской|ский|ская|скую|ым|ом|а|у|е|я|и|ю|[`']s)$/i,
            replace: '',
        },
    ],
}
