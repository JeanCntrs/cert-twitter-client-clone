import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import '../../assets/scss/components/forms/signInForm.scss';

const SignInForm = () => {
    const initialFormValue = { email: '', password: '' };
    const [formData, setFormData] = useState(initialFormValue);
    const [signInLoading, setSignInLoading] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('sign in form')
    }

    return (
        <div className="sign-in-form">
            <h2>¿Listo para más?</h2>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Contraseña" name="password" defaultValue={formData.password} />
                </Form.Group>
                <Button variant="primary" type="submit">{!signInLoading ? 'Iniciar sesión' : <Spinner animation="border" />}</Button>
            </Form>
        </div>
    );
}

export default SignInForm;