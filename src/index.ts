
import { debug, isSupportedLanguage } from './utils'
import suffixTransform from './transformers/suffixTransformer'

export default function rootName(name: string, lang: string): string {
    if (!isSupportedLanguage(lang)) {
        throw new Error(`Unsupported language: ${lang}`)
    }
    const langData = DATA[lang]
    for (let data of langData) {
        let root = data.transform(name, lang)
        if (root !== name) {
            debug(`tranformed from ${name} => ${root}`)
            if (data.stop) {
                return root
            }
        }
    }
    debug(`NOT tranformed ${name}`)
    return name
}

interface ITransform {
    (name: string, lang: string): string
}




const DATA: { [lang: string]: Array<{ transform: ITransform, stop: boolean }> } = {
    ro: [
        { transform: suffixTransform, stop: true },
    ],
    ru: [
        { transform: suffixTransform, stop: true },
    ],
}
