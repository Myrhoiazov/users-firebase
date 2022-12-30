import {
  Backdrop,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchPost = async () => {
    try {
      await getDocs(collection(db, 'users')).then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(newData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!userList) {
    return setIsOpenModal(true);
  }

  return (
    <Container>
      <Backdrop
        open={isOpenModal}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 3 }}
      >
        <CircularProgress color="grey" />
      </Backdrop>

      <Typography>Users list</Typography>
      <div className={s.userItems}>
        {userList?.map(({ todo, id }, i) => (
          <Card sx={{ maxWidth: 345 }} key={id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={todo.avatar}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.secondName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default UsersPage;
