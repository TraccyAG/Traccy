import css from './Modal.module.css';


const Modal = ({activeModal, setActive, children, token, bool}) => {
    if (token) {
        setActive(false)
    }
    return (
        <div style={{zIndex:4000}} className={activeModal ? `${css.modal} ${css.active}` : css.modal}
             onClick={() => setActive(!bool ? false : true)}>
            <div className={activeModal ? `${css.content} ${css.active}` : css.content}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export {Modal};
