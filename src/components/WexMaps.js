import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api'


const containerStyle = {
	width: '100%',
	height: '650px'
  };

function WexMapsComponemt (props) {
  const { locationsProps = [] } = props;
  
  const [locations, setLocations] = useState([{
    lat: 19.6509696,
	  lng: -99.1133696
  }, {
    lat: 19.3633418,
	  lng: -99.2457234
  }]);
  const [center, setCenter] = useState(locations[0]);
  
  const { isLoaded } = useJsApiLoader({
	id: 'google-map-script',
	googleMapsApiKey: "AIzaSyC8qYrx8MdbSF57t7R7OckkX3rTe-400z8"
  })
  
  
  const [map, setMap] = React.useState(null)

  const onLoadMarker = (marker) => {
    console.log("marker: ", marker);
  };

  const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
	
		setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
	setMap(null)
  }, [])
  // "AIzaSyC8qYrx8MdbSF57t7R7OckkX3rTe-400z8"

  return isLoaded ? (
	<GoogleMap
	  mapContainerStyle={containerStyle}
	  center={center}
	  zoom={9}
	  onLoad={onLoad}
	  onUnmount={onUnmount}
	  position={center}
	>
	  { /* Child components, such as markers, info windows, etc. */ }
	  <></>
	  {
		locations.map(item => {
		  return (
			<MarkerF onLoad={onLoadMarker} position={item} />
		  );
		})
	  }
	</GoogleMap>
) : <></>
}

export default WexMapsComponemt;
