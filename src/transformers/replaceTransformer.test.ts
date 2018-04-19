
import transform from './replaceTransformer'
import test from 'ava'
import { RuleAccuracy } from '../options';

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
        ['COMISIEI EUROPENe', 'COMISIEI EUROPEN'],
        ['Comisia Europeană', 'Comisi Europe'],
        ['Federației Ruse', 'Federați Rus'],
        ['Federația Rusă', 'Federați Rus'],
        ['Ana', 'Ana', '2'],
        ['Uniunii Europene', 'Uniun Europe'],
        ['Uniunea Europeană', 'Uniun Europe'],
        ['Fundația Creștină', 'Fundați Creștin'],
        ['Fundației Creștină', 'Fundați Creștin'],
        ['Curții Constituționale', 'Curț Constituțional'],
        ['Curtea Constituțională', 'Curt Constituțional'],
    ],
    ru: [
        ['Путина', 'Путин'], ['Путину', 'Путин'], ['Путиным', 'Путин'],
        ['Путине', 'Путин'],
        ['Россия', 'Росси'], ['России', 'Росси'],
        ['Петербургские', 'Петербург'], ['Петербургском', 'Петербург'],
        ['Петербургом', 'Петербург'], ['Петербургской', 'Петербург'],
        ['Петербургский', 'Петербург'], ['Петербургская', 'Петербург'],
        ['Российскую', 'Росси'],
        ['Российской', 'Росси'],
        ['Федерацию', 'Федераци'],
        ['Российскую Федерацию', 'Росси Федераци'],
        ['Амурский тигр', 'Амур тигр'],
        ['Владимира Путина', 'Владимир Путин'],
        ['Центральный комитет', 'Центральн комитет'],
        ['Центрального комитета', 'Центральн комитет'],
        ['Михаила Горбачёва', 'Михаил Горбачёв'],
        ['РИА Новости', 'РИА Новост'],
        ['Павла Грудинина', 'Павел Грудинин'],
        ['Павл Грудинин', 'Павел Грудинин'],
        ['Алексея Навального', 'Алексе Навальн'],
        ['Алексей Навальный', 'Алексе Навальн'],
        ['Алексеем Навальным', 'Алексе Навальн'],
        ['Дальнего Востока', 'Дальн Восток'],
        ['Нижнем Новгороде', 'Нижн Новгород'],
        ['Нижний Новгород', 'Нижн Новгород'],
        ['Кремля', 'Кремл'],
        ['Россией', 'Росси'],
        ['Олимпийских', 'Олимпи'],
        ['Дмитрия Медведева', 'Дмитри Медведев'],
        ['Россия', 'Росси', '2'],
        ['Дмитрия Медведева', 'Дмитри Медведев'],
        ['Дмитрий Медведев', 'Дмитри Медведев'],
    ],
};

for (let lang in DATA) {
    for (let data of DATA[lang]) {
        test(`${lang}: ${data[0]}->${data[1]}`, t => {
            if (data.length === 2) {
                t.is(transform(data[0], lang), data[1]);
            } else if (data.length > 2) {
                const accuracy = <RuleAccuracy>parseInt(data[2]);
                t.is(transform(data[0], lang, { accuracy: accuracy }), data[1]);
            }
        });
    }
}
