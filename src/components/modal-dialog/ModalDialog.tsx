import React from 'react';
import './ModalDialog.css';

import { ModalDialogProps } from './models/modal-dialog-props';

const ModalDialog: React.FC<ModalDialogProps> = ({ title, children, onClose }) => {
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-dialog-content">
          <button className="modal-dialog-close" onClick={onClose}>X</button>
          {title && <h1 className="modal-dialog-title">{title}</h1>}
          <div className="modal-dialog-body">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ModalDialog;
