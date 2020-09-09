import React, { useState, useEffect } from 'react';
import { Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserAPI } from '../../api/user';
import AvatarNotFound from '../../assets/img/png/avatar-not-found.png';
import '../../assets/scss/components/lists/listUsers.scss';

const User = ({ user }) => {
    const baseURL = process.env.REACT_APP_API_URL;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserAPI(user._id).then(response => {
            setUserInfo(response);
        })
        // eslint-disable-next-line
    }, []);

    return (
        <Media as={Link} to={`/profile/${user._id}`} className="list-users-user">
            <Image
                width="64"
                height="64"
                className="mr-3"
                src={userInfo?.avatar ? `${baseURL}/file/avatar?id=${user._id}` : AvatarNotFound}
                alt={`${user.names} ${user.surnames}`}
                roundedCircle
            />
            <Media.Body>
                <h5>{user.names} {user.surnames}</h5>
                <p>{userInfo?.biography}</p>
            </Media.Body>
        </Media>
    );
}

const ListUsers = ({ users }) => {
    if (users.length === 0) {
        return <h2 className="users-not-found">No hay resultados</h2>
    }

    return (
        <ul className="list-users">
            {users.map(user => <User key={user._id} user={user} />)}
        </ul>
    );
}

export default ListUsers;