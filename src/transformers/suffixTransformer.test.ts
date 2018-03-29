
import transform from './suffixTransformer'
import test from 'ava'

const DATA: { [lang: string]: Array<Array<string>> } = {
    ro: [
        ['Partidului', 'Partidul'],
        ['Partid-ului', 'Partid'],
        ['Partidului Democrat', 'Partidul Democrat'],
        ['Partidului Democratului', 'Partidul Democratul'],
        ['Asociației', 'Asociați'],
        ['Asociația', 'Asociați'],
        ['Anei', 'An'],
        ['Ana', 'An'],
        ['Mariei', 'Mari'],
        ['Maria', 'Mari'],
        ['McDonald`s', 'McDonald'],
        ['Asociației lui Plahotnuic', 'Asociați lui Plahotnuic'],
        ['Moldovei', 'Moldov'],
        ['Ministerului Educației', 'Ministerul Educați'],
        ['Comisiei Europene', 'Comisi Europe'],
        ['COMISIEI EUROPENe', 'COMISI EUROPE'],
        ['Federației Ruse', 'Federați Rus'],
    ],
    ru: [
        ['Путина', 'Путин'], ['Путину', 'Путин'], ['Путиным', 'Путин'], ['Путине', 'Путин'],
        ['Россия', 'Росси'], ['России', 'Росси'],
        ['Петербургские', 'Петербург'], ['Петербургском', 'Петербург'], ['Петербургом', 'Петербург'], ['Петербургской', 'Петербург'],
        ['Петербургский', 'Петербург'], ['Петербургская', 'Петербург'],
        ['Российскую', 'Росси'], ['Федерацию', 'Федераци'], ['Российскую Федерацию', 'Росси Федераци'],
        ['Амурский тигр', 'Амур тигр'],
        ['Владимира Путина', 'Владимир Путин'],
    ],
};

for (let lang in DATA) {
    for (let data of DATA[lang]) {
        test(`${lang}: ${data[0]}->${data[1]}`, t => {
            t.is(transform(data[0], lang), data[1]);
        });
    }
}
