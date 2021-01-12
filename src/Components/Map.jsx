import React from 'react'
import {  LeafletMap, TileLayer } from "react-leaflet";
import styles  from "../Styling/Map.module.css"
import { showDataOnMap } from './util';

function Maps({countries,casesType,center ,zoom}) {
    console.log(center)
    
    return (
        <div className={styles.map}>
            <LeafletMap center={center} zoom={zoom} className={styles.leafletContainer}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries,casesType)}
            </LeafletMap>
        </div>
    )
}
export default Maps