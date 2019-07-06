/*global google*/
import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";

const MapContainer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDf-yIqxErTkbWzKhLox7nAANnrfDIY190&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={4}
        defaultCenter={new google.maps.LatLng(-25.0317893,115.219989)}>

         {props.places.map(place => (
          <Marker
            key={`marker-${place.name}`}
            title={place.title}
            name={place.name}
            position={place.position}
            
          >
          <InfoWindow
            key={`infowindow-${place.name}`}
            visible={true}>
            <div>{place.title + " - Temperatura Atual: "  + place.temperature + "°C"}</div>
          </InfoWindow>
          </Marker>
        ))}

    </GoogleMap>
);



export default MapContainer;
