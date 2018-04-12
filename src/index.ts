
import { debug, isSupportedLanguage } from './utils'
import replaceTransform from './transformers/replaceTransformer'
import { Options } from './options';

export default function rootName(name: string, lang: string, options?: Options): string {
    if (!isSupportedLanguage(lang)) {
        debug(`Unsupported language: ${lang}`);
        return name;
    }
    const langData = DATA[lang]
    for (let data of langData) {
        let root = data.transform(name, lang, options)
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
    (name: string, lang: string, options?: Options): string
}


const DATA: { [lang: string]: Array<{ transform: ITransform, stop: boolean }> } = {
    ro: [
        { transform: replaceTransform, stop: true },
    ],
    ru: [
        { transform: replaceTransform, stop: true },
    ],
}
