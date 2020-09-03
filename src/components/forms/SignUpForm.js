import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import '../../assets/scss/components/forms/signUpForm.scss';

const SignUpForm = () => {
    const initialFormValue = { names: '', surnames: '', email: '', password: '', repeatPassword: '' };
    const [formData, setFormData] = useState(initialFormValue);
    const [signUpLoading, setSignUpLoading] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('sign up form')
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