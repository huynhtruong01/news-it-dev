"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicated = exports.optionCookies = exports.createNotify = exports.createComment = exports.createNews = exports.createHashTag = exports.createRoleData = exports.createUserData = exports.convertMentionToHtml = void 0;
const consts_1 = require("../consts");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const convertMentionToHtml = (text) => {
    const mentionRegex = /@\[([\w\s]+)\]\((\d+)\)/g;
    const convertedText = text.replace(mentionRegex, "<span class='mention'>@$1</span>");
    return convertedText;
};
exports.convertMentionToHtml = convertMentionToHtml;
const createUserData = (data) => {
    const user = new entities_1.User();
    user.username = data.username;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.emailAddress = data.emailAddress;
    user.password = data.password;
    user.dateJoined = new Date();
    user.isAdmin = data.isAdmin;
    user.bandingColor = data.bandingColor ? data.bandingColor : '#ffffff';
    user.avatar = !data.avatar ? consts_1.AVATAR : data.avatar;
    user.type = data.type ? data.type : 'register';
    return user;
};
exports.createUserData = createUserData;
const createRoleData = (data) => {
    const role = new entities_1.Role();
    role.name = data.name;
    role.description = data.description;
    role.color = data.color;
    return role;
};
exports.createRoleData = createRoleData;
const createHashTag = (data) => {
    const hashTag = new entities_1.HashTag();
    hashTag.name = data.name;
    hashTag.title = data.title;
    hashTag.description = data.description || '';
    hashTag.color = data.color;
    hashTag.iconImage = data.iconImage;
    return hashTag;
};
exports.createHashTag = createHashTag;
const createNews = (data) => {
    const news = new entities_1.News();
    news.title = data.title;
    news.sapo = data.sapo || '';
    news.content = data.content;
    news.status = data.status || enums_1.NewsStatus.DRAFT;
    news.thumbnailImage = data.thumbnailImage;
    news.coverImage = data.coverImage;
    news.readTimes = data.readTimes;
    news.userId = data.userId;
    news.hashTagIds = data.hashTagIds || [];
    return news;
};
exports.createNews = createNews;
const createComment = (data) => {
    const comment = new entities_1.Comment();
    comment.comment = (0, exports.convertMentionToHtml)(data.comment);
    comment.parentCommentId = data.parentCommentId || null;
    comment.newsId = data.newsId;
    comment.userId = data.userId;
    comment.replyUserId = data.replyUserId ? data.replyUserId : null;
    return comment;
};
exports.createComment = createComment;
const createNotify = (data) => {
    var _a;
    const notify = new entities_1.Notify();
    notify.userId = data.userId;
    notify.newsId = data.newsId ? data.newsId : null;
    notify.recipients = ((_a = data.recipients) === null || _a === void 0 ? void 0 : _a.length) > 0 ? data.recipients : [];
    notify.readUsers = data.readUsers ? data.readUsers : [];
    notify.text = data.text || '';
    return notify;
};
exports.createNotify = createNotify;
const optionCookies = (options) => {
    return {
        httpOnly: true,
        maxAge: Number(options === null || options === void 0 ? void 0 : options.maxAge) || consts_1.MAX_AGE_REFRESH_TOKEN,
        expires: new Date(Date.now() + (Number(options === null || options === void 0 ? void 0 : options.maxAge) || consts_1.MAX_AGE_REFRESH_TOKEN)),
        secure: false,
        sameSite: 'strict',
    };
};
exports.optionCookies = optionCookies;
const removeDuplicated = (arr) => {
    const uniqueIds = new Set();
    arr.forEach((item) => {
        uniqueIds.add(item.id);
    });
    return arr.filter((item) => uniqueIds.has(item.id));
};
exports.removeDuplicated = removeDuplicated;
