import React, { useState, useEffect } from 'react'
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
import { MAPBOX_ACCESS_TOKEN } from '../config'
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import PinIcon from './PinIcon'

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13,
}

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [userPositon, setUserPosition] = useState(null)
  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setViewport({ ...viewport, latitude, longitude })
        setUserPosition({ latitude, longitude })
      })
    }
  }
  useEffect(() => {
    getUserPosition()
  }, [])

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
      >
        {/* Navigation control */}
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={newViewport => setViewport(newViewport)} />
        </div>

        {/* Pin for User's current position */}
        {userPositon && (
          <Marker
            latitude={userPositon.latitude}
            longitude={userPositon.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em',
  },
  deleteIcon: {
    color: 'red',
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover',
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}

export default withStyles(styles)(Map)
