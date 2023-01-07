import s from './ButtonAddUser.module.scss';

const ButtonAddUser = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className={s.btnAddTransaction}
      type="button"
    ></button>
  );
};

export default ButtonAddUser;
