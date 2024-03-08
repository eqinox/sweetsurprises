"use client"
import Image from 'next/legacy/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import styles from './gallery.module.css';
import { getAllImages } from '@/lib/actions/gallery.actions';
import Modal from '@/app/components/modal';
import { imageUrlBase } from '@/utils/helper';

const Gallery = () => {
    const dispatch = useDispatch();
    const allImages = useSelector((state) => state.gallery.all);
    const dialog = useRef(null);

    const [imageForOpening, setImageForOpening] = useState("");
    const [allImagesLinks, setAllImagesLinks] = useState([]);

    useEffect(() => {
        dispatch(getAllImages());
    }, [dispatch]);

    useEffect(() => {
        if (!isEmpty(allImages) && allImages.data.length > 0) {
            const imagesLinks = allImages.data.map((item) => imageUrlBase + item.attributes.image.data.attributes.url);
            setAllImagesLinks(imagesLinks);
        }

    }, [allImages]);

    const handleOpeningModal = (href) => {
        setImageForOpening(href);
        if (href) {
            dialog.current.showModal();
        }
    }

    const goToNextImage = (url) => {
        const index = allImagesLinks.indexOf(url);
        if (index + 1 === allImagesLinks.length) {
            setImageForOpening(allImagesLinks[0]);
        } else {
            setImageForOpening(allImagesLinks[index + 1]);
        }
    }

    const goToPrevImage = (url) => {
        const index = allImagesLinks.indexOf(url);
        if (index - 1 === -1) {
            setImageForOpening(allImagesLinks[allImagesLinks.length - 1]);
        } else {
            setImageForOpening(allImagesLinks[index - 1]);
        }
    }

    return <div className={styles.galleryContainer} >
        <Modal
            ref={dialog}
            href={imageForOpening}
            resetImage={setImageForOpening}
            handleNextImage={goToNextImage}
            handlePrevImage={goToPrevImage}
        />

        <div className={styles.body}>
            <ul className={styles.ul}>
                {!isEmpty(allImages) && allImages.data.map((item) =>
                    <li
                        key={item.id}
                        className={styles.li}
                        onClick={() => handleOpeningModal(imageUrlBase + item.attributes.image.data.attributes.url)}
                    >
                        <Image
                            src={imageUrlBase + item.attributes.image.data.attributes.url}
                            alt='test'
                            width={200}
                            height={200}
                            priority
                        />
                        <p className={styles.p}>image #1</p>
                    </li>)}
            </ul>
        </div>
    </div>;
};

export default Gallery;
