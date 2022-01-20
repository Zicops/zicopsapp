const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";
  
    return (
      <div className={showHideClassName}>
        <div className="modal_container">
          {children}
          <a href="javascript:;" className="modal-close" onClick={handleClose}>
            close
          </a>
        </div>
        <style jsx>
          {`
            .modal_container{
              width: 60%;
              margin: auto;
            }
            .modal .d-block{
              display: block
            }
          `}
        </style>
      </div>
    );
  };
  
  export default Modal;