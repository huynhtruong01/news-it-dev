"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationDataUser = exports.selectUserData = void 0;
exports.selectUserData = [
    'id',
    'username',
    'firstName',
    'lastName',
    'avatar',
    'bio',
    'currentlyLearning',
    'dateJoined',
    'education',
    'emailAddress',
    'numFollowers',
    'numFollowing',
    'isActive',
    'isAdmin',
    'newsCount',
    'work',
    'websiteUrl',
    'createdAt',
    'updatedAt',
    'slug',
];
exports.relationDataUser = {
    roles: true,
    followers: true,
    following: true,
    hashTags: true,
    news: {
        hashTags: true,
    },
    newsLikes: {
        user: true,
    },
    saves: {
        hashTags: true,
    },
    comments: true,
    commentLikes: true,
};
