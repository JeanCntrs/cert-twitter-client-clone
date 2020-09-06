import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { replaceURLWithHTMLLinks } from '../../utils/functions';
import AvatarNotFound from '../../assets/img/png/avatar-not-found.png';
import moment from 'moment';
import '../../assets/scss/components/lists/listTweets.scss';

const Tweet = ({ tweet }) => {
    const baseURL = process.env.REACT_APP_API_URL

    return (
        <div className="tweet">
            <Image className="avatar" src={tweet.avatar ? `${baseURL}/file/avatar?id=${tweet.userId}` : AvatarNotFound} roundedCircle />
            <div>
                <div className="fullname">
                    {tweet.names} {tweet.surnames}
                    <span>{moment(tweet.createdAt).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.message) }}
                />
            </div>
        </div>
    );
}

const ListTweets = ({ tweets }) => {
    return (
        <div className="list-tweets">
            {tweets.map((tweet, idx) => (
                <Tweet key={idx} tweet={tweet} />
            ))}
        </div>
    );
}

export default ListTweets;