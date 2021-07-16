"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWord = exports.createEmptyWord = exports.deleteWord = void 0;
const data_1 = require("../data");
function deleteWord(indexOfCategory, index) {
    if (indexOfCategory < 0 || indexOfCategory > data_1.words.length)
        return Promise.reject(new Error('can not fined category'));
    const category = data_1.words[indexOfCategory];
    if (index < 0 || index >= category.length)
        return Promise.reject(new Error(`can not fined word with index ${index} of ${category.length}`));
    const deletedWord = category[index].word;
    category.splice(index, 1);
    return Promise.resolve(`deleted word --  ${deletedWord}`);
}
exports.deleteWord = deleteWord;
function createEmptyWord(indexOfCategory) {
    data_1.words[indexOfCategory].push({
        word: '',
        translation: '',
        image: 'img/undefined.jpg',
        audioSrc: '',
    });
    return Promise.resolve(`create new word in category with index ${indexOfCategory}  `);
}
exports.createEmptyWord = createEmptyWord;
function replaceWord(indexOfCategory, indexWord, object) {
    const olgWord = data_1.words[indexOfCategory][indexWord].word;
    data_1.words[indexOfCategory][indexWord] = object;
    const newWord = data_1.words[indexOfCategory][indexWord].word;
    return Promise.resolve(`old word ${olgWord} replace new word ${newWord}  in category with index ${indexOfCategory}  `);
}
exports.replaceWord = replaceWord;
