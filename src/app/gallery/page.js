"use client"
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { sortBy } from "lodash";

import { imageUrlBase } from "../../utils/helper";
import axiosInstance from "../../utils/axios-instance";
import styles from './page.module.css';
import VideoComponent from "./VideoComponent";
import ImageComponent from "./ImageComponent";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [imagesInCollection, setImagesInCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewCollection, setViewCollection] = useState(false);
    const galleryRef = useRef(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState(null); // Track currently playing video index

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get(`/api/images?populate=*`);
                setImages(response.data.data);

            } catch (err) {
                setError(() => err); // set the error this way to avoid eslint warnings
            } finally {
                setLoading(false);
            }
        }
        const fetchVideos = async () => {
            try {
                const response = await axiosInstance.get(`/api/videos?populate=*`);
                setVideos(response.data.data);
            } catch (err) {
                setError(() => err); // set the error this way to avoid eslint warnings
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
        fetchVideos();

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                galleryRef.current.slideToIndex(galleryRef.current.getCurrentIndex() + 1);
            } else if (event.key === 'ArrowLeft') {
                galleryRef.current.slideToIndex(galleryRef.current.getCurrentIndex() - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    // Add event listener for 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setViewCollection(false);
            }
        };

        if (viewCollection) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [viewCollection]);

    const openGalleryInSliderMode = (item) => {
        const images = item.images.data.map((image) => image);
        setViewCollection(true);
        setImagesInCollection(images);
    }

    const handlePlay = (index) => {
        setPlayingVideoIndex(index); // Set the index of the video being played
    };

    if (loading) {
        // Render loading state
        return <div>Loading...</div>;
    }

    if (error) {
        // Render error state
        return <div>Error: {error.message}</div>;
    }

    const imagesForImageGallery = imagesInCollection.map((image) => ({
        original: imageUrlBase + image.attributes.url,
        thumbnail: imageUrlBase + image.attributes.formats.thumbnail.url,
    }));

    let imagesAndVideos = [];
    images.forEach((image) => {
        imagesAndVideos.push({
            type: 'image',
            ...image.attributes
        })
    })
    videos.forEach((video) => {
        imagesAndVideos.push({
            type: 'video',
            ...video.attributes
        })
    })

    imagesAndVideos = sortBy(imagesAndVideos, item => item.index);

    return <div style={{ width: '100%' }} >
        {!viewCollection && <h1 style={{ textAlign: 'center' }}>Галерия</h1>}


        <div className={styles.videosAndImagesContainer}>
            {!viewCollection && imagesAndVideos.length > 0 && imagesAndVideos.map((collection) => {
                if (collection.type === 'image') {
                    return <ImageComponent key={collection.index} collection={collection} handleOpenGalleryInSliderMode={openGalleryInSliderMode} />
                } else if (collection.type === 'video') {
                    return <VideoComponent
                        key={collection.index}
                        collection={collection}
                        isPlaying={playingVideoIndex === collection.index} // Only play if this is the active video
                        onPlay={handlePlay} // Set the active video when it starts playing
                    />
                }
            }
            )}
        </div>

        {viewCollection && <>
            <div style={{ position: 'relative' }}>
                <div onClick={() => {
                    setPlayingVideoIndex(null);
                    setViewCollection(false)
                }} style={{ position: 'absolute', zIndex: '100', top: '0', right: '0' }}>
                    <IoCloseSharp size={30} color="black" className={styles.arrowIcon} />
                </div>

                <ImageGallery
                    ref={galleryRef}
                    items={imagesForImageGallery}
                    showThumbnails={true} // Hides thumbnails below the images
                    showPlayButton={true} // Hide the play button
                    showFullscreenButton={true} // Show the fullscreen button
                    useBrowserFullscreen={true} // Use the browser's native fullscreen API
                    showBullets={true} // Show bullets (pagination dots)
                    slideDuration={600} // Duration of slide transition in milliseconds
                    autoPlay={true} // Enable autoplay
                    slideInterval={3000} // Interval between slides (3 seconds)
                />
            </div>
        </>}

    </div>;
};

export default Gallery;
