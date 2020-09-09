import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import { signUpAPI } from '../../api/auth';
import '../../assets/scss/components/forms/signUpForm.scss';

// Redux actions
/* import { useDispatch, useSelector } from 'react-redux';
import { testAction } from '../../actions/userActions'; */

const SignUpForm = ({ setShowModal }) => {
    const initialFormValue = { names: '', surnames: '', email: '', password: '', repeatPassword: '' };
    const [formData, setFormData] = useState(initialFormValue);
    const [signUpLoading, setSignUpLoading] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        let validCount = 0;
        Object.values(formData).map(value => value && validCount++);

        if (Object.keys(formData).length !== validCount)
            return toast.warning('❌ Completa todos los campos del formulario.');

        if (!isValidEmail(formData.email))
            return toast.warning('❌ Email inválido.');

        if (formData.password !== formData.repeatPassword)
            return toast.warning('❌ Contraseñas no coinciden.');

        if (formData.password.length < 6)
            return toast.warning('❌ Contraseñas debe contener al menos 6 caracteres.');


        setSignUpLoading(true);
        signUpAPI(formData).then(response => {
            if (response.errorCode) {
                toast.error(`❌ ${response.msg}`);
            } else {
                toast.success('🚀 Registro exitoso!');
                setShowModal(false);
                setFormData(initialFormValue);
            }
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        }).finally(() => {
            setSignUpLoading(false);
        });
    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombres" name="names" defaultValue={formData.names} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="surnames" defaultValue={formData.surnames} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo electrónico" name="email" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Contraseña" name="password" defaultValue={formData.password} />
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Repetir Contraseña" name="repeatPassword" defaultValue={formData.repeatPassword} />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">{!signUpLoading ? 'Registrarse' : <Spinner animation="border" />}</Button>
            </Form>
        </div>
    );
}

export default SignUpForm;