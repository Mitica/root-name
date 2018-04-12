# root-name

Extracts root name of a name.

Supported languages: `ro`, `ru`.

## Usage

``` js

import rootName from 'root-name'

const lang = 'ru'

rootName('Владимира Путина', lang) // Владимир Путин
rootName('Санкт-Петербургской', lang) // Санкт-Петербург

rootName('Federației Ruse', 'ro') // Federați Rus
rootName('Federația Rusă', 'ro') // Federați Rus
rootName('COMISIEI EUROPENe', 'ro') // COMISI EUROPE

```

## API

### rootName(name: string, lang: string, options?: Options): string

```ts
export enum RuleAccuracy {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2
}

export type Options = {
    accuracy?: RuleAccuracy
    minWordLength?: number
}
```
