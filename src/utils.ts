
import * as Debug from 'debug'

export const debug = Debug('root-name')

export const SUPPORTED_LANGUAGES = ['ro', 'ru']

export function isSupportedLanguage(lang: string): boolean {
    return SUPPORTED_LANGUAGES.indexOf(lang) > -1
}
