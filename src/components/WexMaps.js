import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '650px'
  };

function WexMapsComponemt (props) {
  const { locationsProps = [] } = props;
  
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState({
	lat: 19.32808819140899,
	lng: -99.18301581777747,
  });
  const [map, setMap] = React.useState(null)

  useEffect(() => {
	if (locationsProps.length > 0) {
	  console.log('locationsProps: ', locationsProps)
	  setLocations(locationsProps)
	  setCenter(locationsProps[0].position)
	}
  }, [locationsProps])

  const { isLoaded } = useJsApiLoader({
	id: 'google-map-script',
	googleMapsApiKey: "AIzaSyDAMaN1F_a0yNUXrCdvUUv8Vkuy0_mJkek"
  })

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
		locationsProps.map(item => {
			console.log('item: ', item);
		  return (
			<MarkerF
			  key={item.id}
			  onLoad={onLoadMarker}
			  position={item.position}
			  title={`Agente: ${item.title}`}
			/>
		  );
		})
	  }
	</GoogleMap>
) : <></>
}

export default WexMapsComponemt;
