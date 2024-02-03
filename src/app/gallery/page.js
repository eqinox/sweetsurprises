"use client"
import Image from 'next/legacy/image';
import styles from './gallery.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '@/lib/actions/gallery.actions';
import { isEmpty } from 'lodash';
import Modal from '@/app/components/modal';

const Gallery = () => {
    const dispatch = useDispatch();
    const allImages = useSelector((state) => state.gallery.all);
    const dialog = useRef(null);

    const [imageForOpening, setImageForOpening] = useState("");

    useEffect(() => {
        dispatch(getAllImages());
    }, []);

    const handleOpeningModal = (href) => {
        setImageForOpening(href);
        if (href) {
            dialog.current.showModal();
        }
    }

    return <div className={styles.galleryContainer} >
        <Modal ref={dialog} href={imageForOpening} resetImage={setImageForOpening} />

        <div className={styles.body}>
            <ul className={styles.ul}>
                {!isEmpty(allImages) && allImages.data.map((item) =>
                    <li
                        key={item.id}
                        className={styles.li}
                        onClick={() => handleOpeningModal(process.env.NEXT_PUBLIC_DB_HOST + item.attributes.image.data.attributes.url)}
                    >
                        <Image
                            src={process.env.NEXT_PUBLIC_DB_HOST + item.attributes.image.data.attributes.url}
                            alt='test'
                            width={200}
                            height={200}
                            priority
                        />
                        <p className={styles.p}>image #1</p>
                    </li>)}
            </ul>
            <div className={styles.light}></div>
        </div>
    </div>;
};

export default Gallery;
