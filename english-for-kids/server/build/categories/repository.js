"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameCategory = exports.deleteEmptyCategory = exports.createCategory = exports.deleteCategory = exports.getWordByName = exports.getWordsByIndex = exports.getWordsByCategoryName = exports.getAllWords = exports.getCategories = void 0;
const data_1 = require("../data");
function getCategories() {
    return Promise.resolve(data_1.categories);
}
exports.getCategories = getCategories;
function getAllWords() {
    return Promise.resolve(data_1.words);
}
exports.getAllWords = getAllWords;
function getWordsByCategoryName(nameCategory) {
    const index = data_1.categories.findIndex((item) => nameCategory === item);
    if (index < 0)
        return Promise.reject(new Error('can not fined category'));
    return Promise.resolve(data_1.words[index]);
}
exports.getWordsByCategoryName = getWordsByCategoryName;
function getWordsByIndex(index) {
    if (index < 0 || index >= data_1.words.length)
        return Promise.reject(new Error(`can not fined category with index ${index} of ${data_1.words.length}`));
    return Promise.resolve(data_1.words[index]);
}
exports.getWordsByIndex = getWordsByIndex;
function getWordByName(nameWord) {
    let word;
    data_1.words.forEach((arr) => {
        arr.forEach((item) => {
            if (item.word === nameWord)
                word = item;
        });
    });
    if (word)
        return Promise.resolve(word);
    return Promise.reject(new Error('can not fined item'));
}
exports.getWordByName = getWordByName;
function deleteCategory(index) {
    if (index < 0 || index > data_1.words.length)
        return Promise.reject(new Error('can not fined item'));
    if (index < 0 || index >= data_1.categories.length)
        return Promise.reject(new Error('can not fined category'));
    data_1.categories.splice(index, 1);
    data_1.words.splice(index, 1);
    return Promise.resolve();
}
exports.deleteCategory = deleteCategory;
function createCategory(category) {
    const isExist = (typeof data_1.categories.find((cat) => cat.toLowerCase() === category.toLowerCase())) !== 'undefined';
    if (category !== 'empty') {
        if (isExist) {
            return Promise.reject(new Error(`Category with name ${category} is already exists`));
        }
    }
    data_1.categories.push(category);
    data_1.words.push([]);
    return Promise.resolve(category);
}
exports.createCategory = createCategory;
function deleteEmptyCategory() {
    function del() {
        const amoutEmpty = data_1.categories.filter((item) => item === 'empty').length;
        if (!amoutEmpty)
            return;
        const index = data_1.categories.findIndex((item) => item === 'empty');
        data_1.words.splice(index, 1);
        data_1.categories.splice(index, 1);
        del();
    }
    del();
    return Promise.resolve();
}
exports.deleteEmptyCategory = deleteEmptyCategory;
function renameCategory(newNameCategory, index) {
    const isExist = (typeof data_1.categories.find((cat) => cat.toLowerCase() === newNameCategory.toLowerCase())) !== 'undefined';
    if (isExist) {
        return Promise.reject(new Error(`Category with name ${newNameCategory} is already exists`));
    }
    if (!data_1.categories[index])
        return Promise.reject(new Error(`Category with index ${index} not exists`));
    data_1.categories[index] = newNameCategory;
    data_1.words[index] = [{
            word: newNameCategory,
            translation: 'проверка',
            image: 'img/success.jpg',
            audioSrc: 'audio/success.mp3',
        }, {
            word: newNameCategory,
            translation: 'проверка',
            image: 'img/success.jpg',
            audioSrc: 'audio/success.mp3',
        }];
    return Promise.resolve(`categiry with index ${index} rename at ${newNameCategory}`);
}
exports.renameCategory = renameCategory;
