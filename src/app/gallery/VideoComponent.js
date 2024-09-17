import { imageUrlBase } from '@/utils/helper';
import ReactPlayer from 'react-player';
import { useState } from 'react';

import styles from './videoComponent.module.css';
import common from './page.module.css';

function VideoComponent({ collection, isPlaying, onPlay }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleToggleDescription = () => {
        setShowFullDescription((prevState) => !prevState);
    };

    const descriptionPreview = collection.description
        ? collection.description.slice(0, 60) + (collection.description.length > 60 ? '...' : '')
        : '';

    return (
        <div key={collection.index} className={styles.videoContainer}>
            <ReactPlayer
                width={420}
                height={340}
                url={imageUrlBase + collection.video.data.attributes.url}
                playing={isPlaying} /* Control whether this video is playing */
                controls
                onPlay={() => onPlay(collection.index)} /* Notify parent component when this video is played */
            />
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
    );
}

export default VideoComponent;
