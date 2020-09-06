export const replaceURLWithHTMLLinks = text => {
    // eslint-disable-next-line no-useless-escape
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}

export const modelFormat = tweets => {
    const tempTweets = [];

    tweets.map(tweet =>
        tempTweets.push({
            _id: tweet._id,
            userId: tweet.userRelationId,
            message: tweet.tweets.message,
            names: tweet.users.names,
            surnames: tweet.users.surnames,
            avatar: tweet.users.avatar,
            createdAt: tweet.tweets.createdAt
        })
    );

    return tempTweets;
}