import { useState } from 'react';
import {
  FormHelperText,
  TextField,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../db';
import schema from 'utils/validationUser';
import s from './cartPage.module.scss';

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const telRegexp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

const initialValues = {
  name: '',
  secondName: '',
  email: '',
  tel: '',
  birthYear: '',
  avatar: null,
};

const FormPage = () => {
  const [user, setUser] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [emailRequared, setEmailRequared] = useState(false);
  const [telRequared, setTelRequared] = useState(false);

  const handleChangeUser = ev => {
    const { name, value } = ev.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = e => {
    e.preventDefault();
    setTelRequared(false);
    setEmailRequared(false);

    if (user.name === '' || user.surname === '' || user.birthYear === '') {
      toast.error('Не корректно задано поле');
      return;
    }

    if (!emailRegexp.test(user.email)) {
      setEmailRequared(true);
      return false;
    }

    if (user.email.length < 3 || user.email.length > 254) {
      return;
    }

    if (!telRegexp.test(user.tel)) {
      setTelRequared(true);
      return false;
    }

    const validationResult = schema.validate(user);

    if (validationResult.error) {
      toast.error('Не корректно задано поле');
      return false;
    }

    return true;
  };

  const addUser = async e => {
    const resultValidate = validateForm(e);

    if (!resultValidate) {
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, 'users'), {
        todo: user,
      });
      setIsLoading(false);
      toast.success(`${user.name} успішно додано`);
      setUser(initialValues);
    } catch (e) {
      toast.error('Щось пішло не так спробуй ще раз');
    }
  };

  return (
    <div className={s.wrapper}>
      <Typography
        variant="h5"
        sx={{
          backgroundColor: 'rgb(25, 118, 210)',
          p: 1,
          pl: 5,
          pr: 5,
          color: 'white',
        }}
      >
        Add User
      </Typography>
      <Backdrop
        open={isLoading}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 3 }}
      >
        <CircularProgress color="grey" />
      </Backdrop>
      <div className={s.form}>
        <form onSubmit={e => addUser(e)}>
          <div className={s.input}>
            <TextField
              label="ім'я"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
          </div>
          <div className={s.input}>
            <TextField
              label="прізвище"
              type="text"
              name="secondName"
              value={user.secondName}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
          </div>
          <div className={s.input}>
            <TextField
              label="email"
              error={emailRequared}
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
            {emailRequared ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Please enter correct.
              </FormHelperText>
            ) : null}
          </div>
          <div className={s.input}>
            <TextField
              label="телефон"
              placeholder="+380 (XX) XXX-XX-XX)"
              error={telRequared}
              type="tel"
              name="tel"
              value={user.tel}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
            {telRequared ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Please enter correct.
              </FormHelperText>
            ) : null}
          </div>
          <div className={s.input}>
            <TextField
              type="date"
              name="birthYear"
              value={user.birthYear}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
          </div>
          <div className={s.input}>
            <TextField
              type="file"
              onChange={handleChangeUser}
              name="avatar"
              value={user.surName}
              fullWidth
              size="small"
            />
            <FormHelperText id="my-helper-text">
              Не обов'язкове поле
            </FormHelperText>
          </div>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
