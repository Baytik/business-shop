import React, {Fragment} from 'react';
import './Modal.css';
import './ModalMedia.css';

const Modal = props => (
    <Fragment>
        <div className="Modal animate__animated animate__fadeInDown" style={{transform: props.show ? "translateY(0)" : "translateX(-100vh)", display: props.show ? 'block' : 'none',}}>{props.children}
        </div>
    </Fragment>
);

export default Modal;