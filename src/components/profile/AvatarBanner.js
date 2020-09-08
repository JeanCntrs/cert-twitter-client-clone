import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { checkFollowAPI, followUserAPI, unFollowUserAPI } from '../../api/follow';
import { userLoggedAPI } from '../../api/auth';
import AvatarNotFound from '../../assets/img/png/avatar-not-found.png';
import ConfigModal from '../modals/ConfigModal';
import ProfileForm from './ProfileForm';
import '../../assets/scss/components/profile/avatarBanner.scss';

const AvatarBanner = ({ user }) => {
    const baseURL = process.env.REACT_APP_API_URL
    const bannerURL = user?.banner ? `${baseURL}/file/banner?id=${user._id}` : null;
    const avatarURL = user?.avatar ? `${baseURL}/file/avatar?id=${user._id}` : AvatarNotFound;
    const { _id } = userLoggedAPI();

    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    const followUser = () => {
        followUserAPI(user._id).then(() => {
            setReloadFollow(true);
        });
    }

    const unFollowUser = () => {
        unFollowUserAPI(user._id).then(() => {
            setReloadFollow(true);
        });
    }

    useEffect(() => {
        if (user) {
            checkFollowAPI(user._id).then(response => {
                response?.status ? setFollowing(true) : setFollowing(false);
            })
            setReloadFollow(false);
        }
    }, [user, reloadFollow]);

    return (
        <div className="avatar-banner" style={{ backgroundImage: `url('${bannerURL}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarURL}')` }} />
            {user &&
                <div className="options">
                    {_id === user._id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}
                    {_id !== user._id && (
                        following !== null && (
                            following ? <Button className="unfollow" onClick={unFollowUser}><span>Siguiendo</span></Button> : <Button onClick={followUser}>Seguir</Button>
                        )
                    )}
                </div>
            }
            <ConfigModal show={showModal} setShowModal={setShowModal} title="Editar perfil">
                <ProfileForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}

export default AvatarBanner;