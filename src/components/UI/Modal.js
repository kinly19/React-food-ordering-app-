import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

//backdrop compoent for layout
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

//overlay component, this is where we will use props.chidren to pass content inbetween the tags
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//react portal needs to know what and where to portal 
//ReactDOM.createPortal(child, container)
// The first argument (child) is any renderable React child, such as an element, string, or fragment. 
// The second argument (container) is a DOM element.

//const helper
const portalElement = document.getElementById('overlays');

//the actual component being exported, which will make use of both Backdrop and ModalOverlay components above with React Portal.
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClick}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;