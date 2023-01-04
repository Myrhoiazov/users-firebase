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
import { db } from '../../firebaseConfigm';
import { Container } from '@mui/system';
import { deepOrange } from '@mui/material/colors';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(users);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!userList.length) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
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
      <Backdrop
        open={isLoading}
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
        {userList?.map(({ user, id }, i) => (
          <Card sx={{ minWidth: 300 }} key={id}>
            <CardActionArea>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{
                      width: 56,
                      height: 56,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      marginRight: '10px',
                      bgcolor: deepOrange[500],
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name} {user.secondName}
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
                    {user.email}
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
                    {user.birthYear}
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
                    {user.tel}
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
