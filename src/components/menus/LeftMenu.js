import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { logOutAPI, userLoggedAPI } from '../../api/auth';
import LogoWhite from '../../assets/img/png/logo-white.png';
import TweetModal from '../modals/TweetModal';
import '../../assets/scss/components/menus/leftMenu.scss';

const LeftMenu = ({ history }) => {
    const [showModal, setShowModal] = useState(false);
    const { _id } = userLoggedAPI();

    const logOut = () => {
        logOutAPI();
        history.push('/sign-in');
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="White Logo" />
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Inicio</Link>
            <Link to={`/profile/${_id}`}><FontAwesomeIcon icon={faUser} /> Perfil</Link>
            <Link to="/usuarios"><FontAwesomeIcon icon={faUsers} /> Usuarios</Link>
            <Link to="" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión</Link>

            <Button onClick={() => setShowModal(true)}>Publicar</Button>
            <TweetModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default withRouter(LeftMenu);