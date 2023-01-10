import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from 'firebaseConfig';
import UserContext from 'components/context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
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
  email: '',
  password: '',
};

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const { login } = useContext(UserContext);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSubmitForm = async (values, { resetForm }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUser(response.user);
      login(values.email);
      navigate('/', { replace: true });
      toast.success(`Привіт з у спішним входом`);
      resetForm();
    } catch (error) {
      console.log(error);
    }
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
        Log In
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <Box sx={{ marginBottom: '20px' }}>
              <Input type="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <MyError>{errors.email}</MyError>
              ) : null}
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <Input type="password" name="password" placeholder="Пароль" />
              {errors.password && touched.password ? (
                <MyError>{errors.password}</MyError>
              ) : null}
            </Box>

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
