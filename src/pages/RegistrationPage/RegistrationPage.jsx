/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, useFormik } from 'formik';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from 'firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Confetti from 'components/Confetti/Confetti';
import PasswordIndicator from 'components/PasswordIndicator';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required().min(6, 'Please enter your password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const Input = styled(Field)`
  font-size: 16px;
  display: block;
  width: 400px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const MyError = styled.div`
  color: red;
  font-size: 14px;
`;

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSubmitForm = async (values, { resetForm }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUser(response.user);
      setIsSuccess(true);
      resetForm();
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/login', { replace: true });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const myHandleChange = (e, values, handleChange) => {
    handleChange(e);
    setPassword(values.password);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Typography sx={{ mb: 2 }} variant="h4">
        Registration
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form autoComplete="off">
            <Box sx={{ marginBottom: '20px' }}>
              <Input type="text" name="name" placeholder="Ім'я" />
              {errors.name && touched.name ? (
                <MyError>{errors.name}</MyError>
              ) : null}
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <Input type="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <MyError>{errors.email}</MyError>
              ) : null}
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={e => myHandleChange(e, values, handleChange)}
              />
              <PasswordIndicator password={password} />
              {errors.password && touched.password ? (
                <MyError>{errors.password}</MyError>
              ) : null}
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Пароль"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <MyError>{errors.confirmPassword}</MyError>
              ) : null}
            </Box>

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {isSuccess && <Confetti />}
    </Container>
  );
};

export default RegistrationPage;
