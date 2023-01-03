import { useEffect, useState } from 'react';
import {
  FormHelperText,
  TextField,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Box,
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../../db';
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
  const [file, setFile] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTelValid, setIsTelValid] = useState(false);

  const handleChangeUser = ev => {
    const { name, value } = ev.target;
    setUser(prev => ({ ...prev, [name]: value}));
  };

  const validateForm = e => {
    e.preventDefault();
    setIsTelValid(false);
    setIsEmailValid(false);

    if (user.name.trim() === '' || user.secondName.trim() === '' || user.birthYear === '') {
      toast.error('Заповніть всі поля');
      return;
    }

    if (!emailRegexp.test(user.email)) {
      setIsEmailValid(true);
      return false;
    }

    if (user.email.length < 3 || user.email.length > 254) {
      return;
    }

    if (!telRegexp.test(user.tel)) {
      setIsTelValid(true);
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
        user,
      });
      setIsLoading(false);
      toast.success(`${user.name} успішно додано`);
      setUser(initialValues);
      setFile(null);
      e.target.reset();
    } catch (e) {
      toast.error('Щось пішло не так спробуй ще раз');
    }
  };

  useEffect(() => {
    function handleUpload() {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setUser(prev => ({ ...prev, avatar: url }));
        });
      });
    }

    file && handleUpload();
  }, [file]);

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
      <Box className={s.form}>
        <form onSubmit={e => addUser(e)}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="ім'я"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChangeUser}
              fullWidth
              size="medium"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="прізвище"
              type="text"
              name="secondName"
              value={user.secondName}
              onChange={handleChangeUser}
              fullWidth
              size="medium"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="email"
              error={isEmailValid}
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeUser}
              fullWidth
              size="medium"
              required
            />
            {isEmailValid ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Please enter correct.
              </FormHelperText>
            ) : null}
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="телефон"
              placeholder="+380 (XX) XXX-XX-XX)"
              error={isTelValid}
              type="tel"
              name="tel"
              value={user.tel}
              onChange={handleChangeUser}
              fullWidth
              size="medium"
              required
            />
            {isTelValid ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Please enter correct.
              </FormHelperText>
            ) : null}
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="дата народження"
              type="date"
              name="birthYear"
              value={user.birthYear}
              InputLabelProps={{ shrink: true }}
              onChange={handleChangeUser}
              fullWidth
              size="medium"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="фото профелю"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={e => setFile(e.target.files[0])}
              fullWidth
              size="medium"
            />
            <FormHelperText id="my-helper-text">
              Не обов'язкове поле
            </FormHelperText>
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            надіслати
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default FormPage;
