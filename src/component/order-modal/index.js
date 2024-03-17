import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '../../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '4px solid purple',
  boxShadow: 24,
  borderRadius:'18px',
  p: 4,
};

export default function OrderModal({modalData}) {
    const modalOpen = useSelector((state)=>state.productslice.modalOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {setOpen(false); dispatch(setModalOpen(false))};
  
  useEffect(()=>{
    setOpen(modalOpen);
    if(!modalOpen  && modalData?.goTo){
        navigate(`${modalData.goTo}`);
        dispatch(setModalOpen(false))
    }
  }, [modalOpen]);


  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2" textAlign={'center'}>
              {modalData.heading} {modalData.icon}
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }} textAlign={'center'}>
              {modalData.desc}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}