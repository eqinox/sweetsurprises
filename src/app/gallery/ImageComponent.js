import Image from "next/image";
import { useState } from "react";

import styles from './imageComponent.module.css';
import common from './page.module.css';
import { imageUrlBase } from "@/utils/helper";

const ImageComponent = ({ collection, handleOpenGalleryInSliderMode }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleToggleDescription = () => {
        setShowFullDescription((prevState) => !prevState);
    };

    const descriptionPreview = collection.description
        ? collection.description.slice(0, 60) + (collection.description.length > 60 ? '...' : '')
        : '';

    return <div key={collection.index} className={styles.mainContainer} >
        <div
            className={styles.imageContainer}
            onClick={() => handleOpenGalleryInSliderMode(collection)}
        >
            <Image
                alt={`${collection.title}`}
                src={imageUrlBase + collection.displayImage.data.attributes.url}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className={styles.overlay}>
                {collection.title}
            </div>

        </div>

        {collection.description && (
            <div style={{ display: 'block' }}>
                <p className={common.p}>
                    {showFullDescription ? collection.description : descriptionPreview}
                    {collection.description.length > 60 && (
                        <button className={common.button} onClick={handleToggleDescription}>
                            {showFullDescription ? 'Скрий' : 'Още'}
                        </button>
                    )}
                </p>

            </div>
        )}

    </div>
}

export default ImageComponent;