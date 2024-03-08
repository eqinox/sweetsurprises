
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapComponent from './MapComponent';

export const metadata = {
  title: 'Contacts - Sweet Surprises',
  description: 'Welcome to contacts for sweet surprises'
};

const Contacts = () => {
  const style = {
    display: 'flex',        // Enable Flexbox
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'flex-start', // Align content to the start
    alignItems: 'center',    // Center horizontally
    marginTop: '50px',       // Space from the top
    width: '100%',          // Take full width to center content horizontally
    height: 'calc(100vh - 50px)', // Adjust height to take the full screen height minus the margin at the top
  };

  return <div style={style}>
    {/* <MapComponent /> */}
  </div>;
};

export default Contacts;
