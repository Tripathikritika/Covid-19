import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import styles  from "../Styling/Map.module.css"
import { showDataOnMap } from './util';

function Map({countries,casesType,center ,zoom}) {
    // console.log(countries)
    return (
        <div className={styles.map}>
            <MapContainer center={center} zoom={zoom} className={styles.leafletContainer}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries,casesType)}
            </MapContainer>
        </div>
    )
}
export default Map