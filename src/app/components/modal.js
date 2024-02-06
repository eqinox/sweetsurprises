import { isEmpty } from "lodash";
import Image from "next/legacy/image";
import { forwardRef, useState } from "react";
import styles from './modal.module.css';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Modal = forwardRef(({ href, resetImage, handleNextImage, handlePrevImage }, ref) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleClose = () => {
        resetImage('');
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        // Ensure there was a swipe, not just a tap
        if (!touchStart || !touchEnd) return;

        // Determine swipe direction
        const threshold = 50; // Minimum distance of the swipe
        const swipeRight = touchEnd - touchStart > threshold;
        const swipeLeft = touchStart - touchEnd > threshold;

        if (swipeRight) {
            handlePrevImage(href); // Swiping right to go to the previous image
        } else if (swipeLeft) {
            handleNextImage(href); // Swiping left to go to the next image
        }

        // Reset
        setTouchStart(null);
        setTouchEnd(null);
    };

    return <dialog ref={ref} className={styles.resultModal}>
        {!isEmpty(href) &&
            <div
                className={styles.imageContainer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={styles.leftArrow}
                    onClick={() => handlePrevImage(href)}
                >
                    <FaChevronCircleLeft size={30} color="pink" />
                </div>
                <Image
                    src={href}
                    alt='Displayed Image'
                    layout='fill'
                    priority
                    onClick={toggleZoom}
                    className={isZoomed ? styles.zoomedIn : styles.zoomedOut}
                />
                <div
                    className={styles.rightArrow}
                    onClick={() => handleNextImage(href)}
                >
                    <FaChevronCircleRight size={30} color="pink" />
                </div>
            </div>}
        <form method="dialog">
            <button onClick={() => handleClose()}>Close</button>
        </form>
    </dialog>;
});

Modal.displayName = 'Modal';

export default Modal;
