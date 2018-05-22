import React from 'react';
const { GoogleMap, Marker, withGoogleMap} = require("react-google-maps");

import { GOOGLE_API_KEY } from './../../../.config.js';

const MapWithMarker = withGoogleMap(({destination}) => {
  return <GoogleMap
    defaultZoom={9}
    defaultCenter={{lat: destination.lat, lng: destination.lon}}
  >
     <Marker position={{lat: destination.lat, lng: destination.lon}} />
  </GoogleMap>
})

export default MapWithMarker