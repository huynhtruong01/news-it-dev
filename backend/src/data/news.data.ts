export const relationNewsData = {
    likes: true,
    saveUsers: true,
    user: {
        news: {
            hashTags: true,
        },
    },
    hashTags: true,
    comments: {
        childrenComments: {
            user: true,
        },
        user: true,
        news: true,
        parentComment: true,
    },
}
