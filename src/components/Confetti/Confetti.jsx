import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

const modalRoot = document.getElementById('modal-root');
const ANIMATION_DURATION = 2_000;

const Confetti = () => {
  // eslint-disable-next-line no-unused-vars
  const [party, setParty] = useState(true);
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const resize = () =>
    setSize({
      y: window?.innerHeight,
      x: window.innerWidth,
    });

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setParty(false);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ReactConfetti
        width={size.width}
        height={size.height}
        tweenDuration={ANIMATION_DURATION}
        onConfettiComplete={c => {
          setParty(false);
          c?.reset();
        }}
      />
    </>,
    modalRoot
  );
};

export default Confetti;
