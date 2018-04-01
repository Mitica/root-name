
type TransformWord = {
    word: string
    transform: boolean
}

export default function transform(name: string, lang: string): string {
    const rules = DATA[lang]
    const MIN_WORD_LENGTH = 2
    if (rules) {
        let names: TransformWord[] = name.split(/\s+/g).map(word => ({ word, transform: word.length > MIN_WORD_LENGTH }))
        // switch (lang) {
        //     case 'ro':
        //         names.forEach((item, i) => item.transform = item.transform && i == 0)
        //         break
        // }
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
        let root = name.replace(rule.reg, rule.replace || '')
        if (root !== name) {
            return root
        }
    }
    return name
}

type Rule = {
    reg: RegExp,
    replace?: string,
}

const DATA: { [lang: string]: Rule[] } = {
    ro: [
        {
            /**
             * Mari(ei), An(a)
             */
            reg: /(-ului|-lui|[`']s)$/i,
        },
        {
            /**
             * Partid(ului)
             */
            reg: /(ul)ui$/i,
            replace: '$1',
        },
        {
            /**
             * Comisia Europeană -> Comisi Europe
             */
            reg: /(e)a[^ăîâaoieu](a|ă)$/i,
            replace: '$1',
        },
        {
            /**
             * Comisiei Europ(ene)
             */
            reg: /(e)ne$/i,
            replace: '$1',
        },
        {
            /**
             * Federației Ru(se)
             */
            reg: /([^ăîâaoieu])e$/i,
            replace: '$1',
        },
        {
            /**
             * Mari(ei), An(a)
             */
            reg: /(ei|a|ă)$/i,
        },
    ],
    ru: [
        {
            /**
             * Путина, Путину, Путиным, Путине, Россия, России
             * Петербургские, Петербургском, Петербургом, Петербургской,
             * Петербургский, Петербургская, Российскую, Федерацию,
             * Единая, Единой, Единого
             */
            reg: /(йские|йском|йской|йский|йская|йскую|ские|ском|ской|ский|ская|скую|ого|ым|ом|ой|ая|а|у|е|я|и|ю|[`']s)$/i,
        },
    ],
}
