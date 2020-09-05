import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { isValidEmail } from '../../utils/validations';
import { signInAPI, setTokenAPI } from '../../api/auth';
import '../../assets/scss/components/forms/signInForm.scss';

const SignInForm = ({ history }) => {
    const initialFormValue = { email: '', password: '' };
    const [formData, setFormData] = useState(initialFormValue);
    const [signInLoading, setSignInLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        let validCount = 0;
        Object.values(formData).map(value => {
            value && validCount++;
        });

        if (Object.keys(formData).length !== validCount)
            return toast.warning('❌ Completa todos los campos del formulario.');

        if (!isValidEmail(formData.email))
            return toast.warning('❌ Email inválido.')

        setSignInLoading(true);
        signInAPI(formData).then(response => {
            if (!response.token) {
                toast.error(`❌ ${response.msg || 'Error, inténtelo más tarde.'}`);
            } else {
                toast.success('🚀 Login exitoso!');
                setTokenAPI(response.token);
                setRedirect(true);
            }
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        }).finally(() => {
            setSignInLoading(false);
        });
    }

    useEffect(() => {
        redirect && history.push('/');
    }, [redirect]);

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

export default withRouter(SignInForm);