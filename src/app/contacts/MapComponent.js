'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 42.67380104870738,
    lng: 23.263632362042543
};

const MapComponent = () => {
    const [apiKey, setApiKey] = useState('AIzaSyAxTEWXFKDG60sIhhddBH8Tifk1DsSzptA');
    return <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {/* Marker at specified coordinates */}
            <Marker position={center} />
        </GoogleMap>
    </LoadScript>
}

    ;

export default MapComponent;