import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const GoogleMapView = ({ lat, lng }) => {
  if (!lat || !lng || !GOOGLE_MAPS_API_KEY) return null;

  const center = { lat: Number(lat), lng: Number(lng) };

  return (
    <Box sx={{ mt: 3, borderRadius: 1, overflow: 'hidden' }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default GoogleMapView;
