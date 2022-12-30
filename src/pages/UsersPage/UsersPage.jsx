import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db';
import { Container } from '@mui/system';
import s from './usersPage.module.scss';

const UsersPage = () => {
  const [userList, setUserList] = useState([]);
  console.log("userList: ", userList);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchPost = async () => {
    try {
      setIsOpenModal(true);

      await getDocs(collection(db, 'users')).then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(newData);
        setIsOpenModal(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!userList) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        paddingTop: '200px',
      }}
    >
      {userList.length <= 0 && <Typography>User not found</Typography>}
      <Backdrop
        open={isOpenModal}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 3 }}
      >
        <CircularProgress color="grey" />
      </Backdrop>
      <Box className={s.userItems}>
        {userList?.map(({ todo, id }, i) => (
          <Card sx={{ minWidth: 300 }} key={id}>
            <CardActionArea>
              <Avatar
                alt={todo.name}
                src={todo.avatar}
                sx={{ width: 56, height: 56 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.secondName}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: '700' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Email:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {todo.email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: '700' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    День народження:{' '}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {todo.birthYear}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: '700' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Телефон:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {todo.tel}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default UsersPage;

{
  /* <Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 24, height: 24 }}
/>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
<Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 56, height: 56 }}
/> */
}
