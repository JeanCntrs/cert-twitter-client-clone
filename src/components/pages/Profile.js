import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserAPI } from '../../api/user';
import { getUserTweetsAPI } from '../../api/tweet';
import { ProfileTitleLoader } from '../../utils/loaders';
import { Button, Spinner } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import AvatarBanner from '../profile/AvatarBanner';
import ProfileInfo from '../profile/ProfileInfo';
import ListTweets from '../lists/ListTweets';
import '../../assets/scss/components/pages/profile.scss';

const Profile = ({ match: { params: { id } } }) => {
    console.log(id)
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingPosts, setLoadingPosts] = useState(false);

    const getMorePosts = () => {
        const tempPage = page + 1;
        setLoadingPosts(true);

        getUserTweetsAPI(id, tempPage).then(response => {
            if (!response.length) {
                setLoadingPosts(0);
            } else {
                setTweets([...tweets, ...response]);
                setPage(tempPage);
                setLoadingPosts(false);
            }
        });
    }

    useEffect(() => {
        getUserAPI(id).then(response => {
            response ? setUser(response) : toast.error(`❌ El usuario que has visitado no existe.`);
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        });
    }, [id]);

    useEffect(() => {
        getUserTweetsAPI(id, 1).then(response => {
            response.length && setTweets(response);
        }).catch(() => {
            setTweets([]);
        });
    }, [id]);

    return (
        <MainLayout layoutClass="profile">
            <div className="profile-title">
                <h2>{user ? `${user.names} ${user.surnames}` : <ProfileTitleLoader />}</h2>
            </div>
            <AvatarBanner user={user} />
            <ProfileInfo user={user} />
            <div className="profile-post">
                <h3>Publicaciones</h3>
                {tweets && <ListTweets tweets={tweets} />}
                <Button onClick={getMorePosts}>
                    {!loadingPosts
                        ? loadingPosts !== 0 && 'Más publicaciones'
                        : <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true" />
                    }
                </Button>
            </div>
        </MainLayout>
    );
}

export default Profile;