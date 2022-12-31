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
import { deepOrange } from '@mui/material/colors';

const UsersPage = () => {
  const [userList, setUserList] = useState([]);
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
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          paddingTop: '300px'

        }}
      >
        <Typography>User not found</Typography>
      </Container>
    );
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
      {userList.length === 0 && <Typography>User not found</Typography>}
      <Backdrop
        open={isOpenModal}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 3 }}
      >
        <CircularProgress color="grey" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {userList?.map(({ todo, id }, i) => (
          <Card sx={{ minWidth: 300 }} key={id}>
            <CardActionArea>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    alt={todo.name}
                    src={todo.avatar}
                    sx={{
                      width: 56,
                      height: 56,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      marginRight: '10px',
                      bgcolor: deepOrange[500],
                    }}
                  >
                    {todo.name[0]}
                  </Avatar>
                  <Typography gutterBottom variant="h5" component="div">
                    {todo.name} {todo.secondName}
                  </Typography>
                </Box>

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
                    День народження:
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
