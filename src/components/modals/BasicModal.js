import React from 'react';
import { Modal } from 'react-bootstrap';
import LogoWhite from '../../assets/img/png/logo-white.png';
import '../../assets/scss/components/modals/basicModal.scss';

const BasicModal = ({ showModal, setShowModal, children }) => {
    return (
        <Modal
            className="basic-modal"
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={LogoWhite} alt="White Logo" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default BasicModal;