import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfigm';
import { Container } from '@mui/system';
import { toast } from 'react-toastify';
import ButtonAddUser from 'components/ButtonAddUser/ButtonAddUser';
import User from 'components/User';
import Modal from 'components/Modal/Modal';
import FormUser from 'components/FormUser';

const UsersPage = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchUsers = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
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
        {userList?.map(({ user, id }) => (
          <User key={id} user={user} id={id} />
        ))}
      </Box>
      <ButtonAddUser openModal={openModal} />
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <FormUser onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </Box>
  );
};

export default UsersPage;
