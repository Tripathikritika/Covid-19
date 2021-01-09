import React from 'react'
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import styles from '../Styling/utils.module.css'

//different circles structure for cases, recovered and deaths
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 200,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 900,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
};

export const sortData = (data) => {
    const sortedData = [...data]
    sortedData.sort((a , b) => {
        if(a.cases > b.cases){
            return -1
        }
        else{
            return 1
        }
    })
    return sortedData
}

//Draw circles on map with interactive tooltip
export const showDataOnMap = (data,casesType='cases') => (
    
    data.map(country => (
        <Circle 
            key = {country.name}
            center={[country.lat , country.long]}
            fillOpacity = {0.5}
            color = {casesTypeColors[casesType.hex]}
            fillColor = {casesTypeColors[casesType].hex}
            radius = {
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
              <div className={styles.infoContainer}>
                    <div className={styles.infoFlag} style={{backgroundImage : `url:${country.flag}`}}></div>
                    <div className={styles.infoName}>
                        {country.name}
                    </div>
                    <div className={styles.infoConfirmed}>
                        Cases: {numeral(country.cases).format("0,0")}                    
                    </div>
                    <div className={styles.infoRecovered}>
                        Recovered: {numeral(country.recovered).format("0,0")}                    
                    </div>
                    <div className={styles.infoDeaths}>
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
              </div>
            </Popup>
        </Circle>
    ))
)