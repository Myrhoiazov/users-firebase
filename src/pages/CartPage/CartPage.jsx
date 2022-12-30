import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../db';
import schema from 'utils/validationUser';
import s from './cartPage.module.scss';

const CartPage = () => {
  const initialValues = {
    name: '',
    secondName: '',
    email: '',
    tel: '',
    birthYear: '',
    avatar: null,
  };

  const [user, setUser] = useState(initialValues);

  const handleChangeUser = ev => {
    const { name, value } = ev.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = e => {
    e.preventDefault();

    const validationResult = schema.validate(user);

    if (validationResult.error) {
      toast.error('Не корректно задано поле');
      return false;
    }

    return true
  };


  const addUser = async e => {
    const resultValidate = validateForm(e);

    if (!resultValidate) {
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        todo: user,
      });
      toast.success(`${user.name} успішно додано`);
      setUser(initialValues)
    } catch (e) {
      toast.error('Щось пішло не так спробуй ще раз');
    }
  };


  return (
    <div className={s.wrapper}>
      <Typography variant="h5">Add Users</Typography>
      <div className={s.form}>
        <form onSubmit={(e)=>addUser(e)}>
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
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
          </div>
          <div className={s.input}>
            <TextField
              label="телефон"
              placeholder="+380 (XX) XXX-XX-XX)"
              type="tel"
              name="tel"
              value={user.tel}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
          </div>
          <div className={s.input}>
            <TextField
              type="date"
              name="birthYear"
              value={user.birthYear}
              onChange={handleChangeUser}
              fullWidth
              size="small"
            />
          </div>
          <div className={s.input}>
            <TextField
              type="file"
              name="avatar"
              value={user.surName}
              onChange={handleChangeUser}
              fullWidth
              size="small"
            />
          </div>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
