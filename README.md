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
rootName('COMISIEI EUROPENe', 'ro') // COMISI EUROPE

```
