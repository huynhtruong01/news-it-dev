"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommenderUsers = exports.calcJaccardSimilarity = exports.recommenderNews = exports.calcCosineSimilarity = exports.calcLengthUniqueWord = exports.convertTitleToVector = exports.stopWords = void 0;
const data_1 = require("../data");
const stopWords = (content) => {
    const specialCharsPattern = /[.?!,~`@#$%^&*()-_+={}:;"'<>]+|\.{3,}/g;
    const newContent = content
        .toLocaleLowerCase()
        .replace(specialCharsPattern, '')
        .split(' ')
        .filter((w) => !data_1.stopWordsVn.includes(w))
        .join(' ');
    return newContent;
};
exports.stopWords = stopWords;
const convertTitleToVector = (uniqueWord, content, length = 0) => {
    const word = content.split(' ');
    const wordContent = Array.from(new Set(word));
    const vector = Array(length ? length : wordContent.length).fill(0);
    for (const w of wordContent) {
        const index = uniqueWord.indexOf(w);
        if (index > -1 && index <= length) {
            vector[index] += 1;
        }
    }
    return vector;
};
exports.convertTitleToVector = convertTitleToVector;
const calcLengthUniqueWord = (content) => {
    const word = content.split(' ');
    const wordContent = Array.from(new Set(word));
    return wordContent;
};
exports.calcLengthUniqueWord = calcLengthUniqueWord;
const calcCosineSimilarity = (content, contentCompare) => {
    const dotProduct = content.reduce((acc, value, index) => acc + value * contentCompare[index], 0);
    const magnitudeA = Math.sqrt(content.reduce((acc, value) => acc + value * value, 0));
    const magnitudeB = Math.sqrt(contentCompare.reduce((acc, value) => acc + value * value, 0));
    return dotProduct / (magnitudeA * magnitudeB) || 0;
};
exports.calcCosineSimilarity = calcCosineSimilarity;
const recommenderNews = (content, newsList) => {
    const newContent = (0, exports.stopWords)(content);
    const uniqueWords = (0, exports.calcLengthUniqueWord)(newContent);
    const titleVector = (0, exports.convertTitleToVector)(uniqueWords, newContent, uniqueWords.length);
    const results = [];
    for (const news of newsList) {
        const content = (0, exports.stopWords)(news.title);
        const titleVectorCompare = (0, exports.convertTitleToVector)(uniqueWords, content, uniqueWords.length);
        const similarity = (0, exports.calcCosineSimilarity)(titleVector, titleVectorCompare);
        results.push({
            news,
            similarity,
        });
    }
    return results;
};
exports.recommenderNews = recommenderNews;
// USERS
const calcJaccardSimilarity = (setTargetUser, setUser) => {
    const intersection = setTargetUser.filter((item) => setUser.includes(item));
    const union = [...new Set([...setTargetUser, ...setUser])];
    if (union.length === 0) {
        return 0;
    }
    return intersection.length / union.length;
};
exports.calcJaccardSimilarity = calcJaccardSimilarity;
const recommenderUsers = (targetUser, users) => {
    var _a, _b;
    const likesTargetUser = ((_a = targetUser.newsLikes) === null || _a === void 0 ? void 0 : _a.map((n) => n.newsId)) || [];
    const recommends = [];
    for (const u of users) {
        const likesUser = ((_b = u.newsLikes) === null || _b === void 0 ? void 0 : _b.map((n) => n.newsId)) || [];
        const score = (0, exports.calcJaccardSimilarity)(likesTargetUser, likesUser);
        recommends.push({
            user: u,
            score,
        });
    }
    return recommends;
};
exports.recommenderUsers = recommenderUsers;
