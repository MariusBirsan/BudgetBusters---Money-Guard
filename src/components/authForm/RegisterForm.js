// RegisterForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be 6-12 characters')
      .max(12, 'Must be 6-12 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);

    dispatch(register({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setStatus({ success: false, error: error });
        setSubmitting(false);
      });
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
              <Field type="text" name="name" placeholder="Name" />
            </div>

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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <div className="input-field password-field">
              <span className="input-icon">@</span>
              <Field
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-register active"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="button button-log-in"
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
