// LoginForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be 6-12 characters')
      .max(12, 'Must be 6-12 characters')
      .required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
    dispatch(logIn({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setStatus({ success: false, error: error });
      })
      .finally(() => setSubmitting(false));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="input-field">
              <span className="input-icon">@</span>
              <Field type="email" name="email" placeholder="E-mail" />
            </div>

            <div className="input-field password-field">
              <span className="input-icon">@</span>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-log-in active"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="button button-register"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
