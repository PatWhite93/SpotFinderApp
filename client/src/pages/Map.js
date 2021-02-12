import React, { useState, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useQuery } from '@apollo/client';
import { FETCH_SPOTS_QUERY } from '../util/graphql';
import ListItem from '../components/ListItem';
import { Item } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

import '../App.css';
import LogSpotForm from '../components/LogSpotForm';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [showPopup, setShowPopup] = useState({});
  const { data: { getSpots: spots } = {} } = useQuery(FETCH_SPOTS_QUERY);
  const { user } = useContext(AuthContext);

  const [addSpotLocation, setAddSpotLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: 'auto',
    height: 600,
    latitude: 37.6,
    longitude: -96.6,
    zoom: 4.4,
  });

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddSpotLocation({
      latitude,
      longitude,
    });
  };

  return (
    <>
      {user ? (
        <h3>Double-click the map to add spot.</h3>
      ) : (
        <h3>Welcome! Log in and double-click the map to add spot.</h3>
      )}

      <div className="map-container">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/peanut9/ckdkehmjx0kn81jn2lbmfu9xc"
          mapboxApiAccessToken="pk.eyJ1IjoicGVhbnV0OSIsImEiOiJja2FicHFxcXIwZTNyMnFsczF1azVpZjY4In0.8Jewbyw6KLMkmSJUYsb_bQ"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          onDblClick={showAddMarkerPopup}
        >
          {spots &&
            spots.map((spot) => (
              <React.Fragment key={spot.id}>
                <Marker
                  latitude={parseFloat(spot.latitude)}
                  longitude={parseFloat(spot.longitude)}
                  anchor="bottom"
                >
                  <div className="marker-title">{spot.body}</div>
                  <div
                    className="marker"
                    onClick={() =>
                      console.log('Coming soon: open spot details')
                    }
                  >
                    <svg
                      className="pin yellow"
                      style={{
                        height: `${6 * viewport.zoom}px`,
                        width: `${6 * viewport.zoom}px`,
                      }}
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </Marker>
                {showPopup[spot.id] ? (
                  <Popup
                    latitude={spot.latitude}
                    longitude={spot.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    dynamicPosition={true}
                    onClose={() => setShowPopup({})}
                    anchor="top"
                  >
                    <div>
                      {
                        <div className="popup">
                          <h3>{spot.body}</h3>
                          {spot.image ? (
                            <img
                              className="popup-image"
                              src={spot.image}
                              alt={spot.body}
                            />
                          ) : null}
                        </div>
                      }
                    </div>
                  </Popup>
                ) : null}
              </React.Fragment>
            ))}
          {addSpotLocation ? (
            <>
              <Marker
                latitude={addSpotLocation.latitude}
                longitude={addSpotLocation.longitude}
              >
                <div className="marker">
                  <svg
                    className="pin red"
                    style={{
                      height: `${6 * viewport.zoom}px`,
                      width: `${6 * viewport.zoom}px`,
                    }}
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </Marker>
              <Popup
                latitude={addSpotLocation.latitude}
                longitude={addSpotLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddSpotLocation(null)}
                anchor="top"
              >
                <div className="popup">
                  <LogSpotForm
                    onClose={() => {
                      setAddSpotLocation(null);
                      // getEntries();
                    }}
                    location={addSpotLocation}
                  />
                </div>
              </Popup>
            </>
          ) : null}
        </ReactMapGL>
      </div>
      <Item.Group className="listings" divided>
        {spots && spots.map((spot) => <ListItem {...spot} />)}
      </Item.Group>
    </>
  );
};

export default Map;
