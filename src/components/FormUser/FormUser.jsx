import { useEffect, useState } from 'react';
import {
  FormHelperText,
  TextField,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Box,
  Container,
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebaseConfig';
import schema from 'utils/validationUser';
import s from './FormUser.module.scss';

const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const telRegexp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;
const USER_STORAGE = 'userData';

const initialValues = {
  name: '',
  secondName: '',
  email: '',
  tel: '',
  birthYear: '',
  avatar: null,
};

const FormPage = ({ onClose }) => {
  const [user, setUser] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setIsErrors] = useState({});

  const handleChangeUser = ev => {
    const { name, value } = ev.target;
    setUser(prev => ({ ...prev, [name]: value }));
    localStorage.setItem(
      USER_STORAGE,
      JSON.stringify({ ...user, [name]: value })
    );
  };

  const validateForm = () => {
    setIsErrors({});

    if (
      user.name.trim() === '' ||
      user.secondName.trim() === '' ||
      user.birthYear === ''
    ) {
      toast.error('Заповніть всі поля');
      return;
    }

    if (!emailRegexp.test(user.email)) {
      setIsErrors(prev => ({ ...prev, email: 'error' }));
    }

    if (user.email.length < 3 || user.email.length > 254) {
      setIsErrors(prev => ({ ...prev, email: 'error' }));
    }

    if (!telRegexp.test(user.tel)) {
      setIsErrors(prev => ({ ...prev, tel: 'error' }));
    }

    const validationResult = schema.validate(user);

    if (validationResult.error || Object.keys(errors).length) {
      toast.error('Не корректно задано поле');
      return;
    }

    return true;
  };

  const addUser = async e => {
    e.preventDefault();

    const resultValidate = validateForm();

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
      resetForm();
      e.target.reset();
      onClose();
    } catch {
      toast.error('Щось пішло не так спробуй ще раз');
    }
  };

  const resetForm = () => {
    setUser(initialValues);
    setFile(null);
    localStorage.removeItem(USER_STORAGE);
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(USER_STORAGE));

    if (localData) {
      setUser(localData);
    }

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
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          backgroundColor: 'rgb(25, 118, 210)',
          p: 1,
          pl: 3,
          pr: 3,
          mb: 2,
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
              size="small"
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
              size="small"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="email"
              error={errors.email ? true : false}
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
            {errors.email ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Не корректно задане поле
              </FormHelperText>
            ) : null}
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="телефон"
              placeholder="+380 (XX) XXX-XX-XX)"
              error={errors.tel ? true : false}
              type="tel"
              name="tel"
              value={user.tel}
              onChange={handleChangeUser}
              fullWidth
              size="small"
              required
            />
            {errors.tel ? (
              <FormHelperText id="my-helper-text" className={s.error}>
                Не корректно задане поле
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: '45px',
            }}
          >
            <Button
              type="reset"
              value="reset"
              variant="contained"
              fullWidth
              onClick={e => resetForm(e)}
            >
              скинути
            </Button>
            <Button type="submit" variant="contained" fullWidth sx={{ ml: 2 }}>
              надіслати
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default FormPage;
