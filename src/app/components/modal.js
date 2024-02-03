import { isEmpty } from "lodash";
import Image from "next/legacy/image";
import { forwardRef, useState } from "react";
import styles from './modal.module.css';

const Modal = forwardRef(({ href, resetImage }, ref) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleClose = () => {
        resetImage('');
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    }

    return <dialog ref={ref} className={styles.resultModal}>
        {!isEmpty(href) &&
            <div className={styles.imageContainer}>
                <Image
                    src={href}
                    alt='Displayed Image'
                    layout='fill'
                    priority
                    onClick={toggleZoom}
                    className={isZoomed ? styles.zoomedIn : styles.zoomedOut}
                />

            </div>}
        <form method="dialog">
            <button onClick={() => handleClose()}>Close</button>
        </form>
    </dialog>;
});

export default Modal;
