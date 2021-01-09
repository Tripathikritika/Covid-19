import React, { useState,useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card'
import styles from '../Styling/Covid.module.css'
import CardContent from '@material-ui/core/CardContent'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryApiCall,getCountryAllData ,getCountryData} from '../Redux/action'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData } from './util'
import "leaflet/dist/leaflet.css"

export default function Covid19() {
    //state is a how to write a variable in react
    const dispatch = useDispatch()
    const [country , setCountry] = useState('worldwide')
    const [mapCenter , setMapCenter]= useState({lat : 34.80746 , lng:-40.4796})
    //center of the pacific ocean
    const [mapZoom , setMapZoom] = useState(3)
    let countries = useSelector(state => state.countriesArray)
    let allData = useSelector(state => state.allCountriesData)
    let specificData = useSelector(state => state.specificData)
    const onCountryChange = async ( event ) => {
        const countryCode = event.target.value
        setCountry( countryCode)
        if(countryCode === 'worldwide'){
            dispatch(getCountryAllData())
            setMapCenter([countries.lat,countries.long])
            setMapZoom(10)
        }
        else{
            dispatch(getCountryData(countryCode))
            setMapCenter([countries.lat,countries.long])
            setMapZoom(10)
        }
    }

    useEffect(() => {
        dispatch(getCountryApiCall())
    }, [])

    let caseData = country === "worldwide" ? allData : specificData
    const sortedData = sortData(countries)
    useEffect(() => {
        dispatch(getCountryAllData())
    }, [])

    return (
        <div className={styles.app}>
            <div className={styles.appleft}>
                <div className={`${styles.app_header}`}>
                    <h1>Covid-19 TRACKER</h1>
                    <FormControl className="app_dropdown">
                        <Select className={styles.slecteButton} value={country} onChange={onCountryChange} style={{border:'1px solid black'}}>
                            <MenuItem  value = 'worldwide'>Worldwide</MenuItem>
                            { countries && countries.map((res) => 
                                <MenuItem key={res.name} value = {res.value}>{res.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <div className={styles.appStats}>
                        <InfoBox title="Coronavirus Cases" cases = {caseData.todayCases} total={caseData.cases}/>
                        <InfoBox title="Recovered"  cases = {caseData.todayRecovered} total={caseData.recovered}/>
                        <InfoBox title="Deaths" cases ={caseData.todayDeaths} total={caseData.deaths} />
                    </div>
                </div>
                <div>
                    <Map center={mapCenter} zoom={mapZoom} countries = {countries}/>
                </div>
            </div>
            <Card className={styles.appRight}>
                <CardContent>
                    <h3>Live Cases by country</h3>
                        <Table country = {sortedData}  />
                        {/* sorted by cases */}            
                    <h3>Worldwide new Cases</h3>
                    <LineGraph />
                </CardContent>
            </Card>
        </div>
    )
}
