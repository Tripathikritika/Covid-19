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
import Maps from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData,prettyPrintStat } from './util'
import "leaflet/dist/leaflet.css"

export default function Covid19() {
    //state is a how to write a variable in react
    const dispatch = useDispatch()
    const [country , setCountry] = useState('worldwide')
    const [mapCenter , setMapCenter]= useState({ lat: 34.80746, lng: -40.4796 })
    const [casesType , setCasesType] = useState("cases")
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
            setMapCenter({lat : 20 , lng:77})
            setMapZoom(1)
        }
        else{
            dispatch(getCountryData(countryCode))
            const index = countries.findIndex((res) => res.value === event.target.value)
            
            setMapCenter({lat : countries[index].lat, lng : countries[index].long})
            setMapZoom(1)
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
    // console.log(mapCenter)
    return (
        <div className={styles.app}>
            <div className={styles.appleft}>
                <div className={`${styles.app_header}`}>
                    <h1 className={styles.titleHeader}>Covid-19 TRACKER</h1>
                    <FormControl className={styles.appDropdown}>
                        <Select className={styles.slecteButton} value={country} onChange={onCountryChange} >
                            <MenuItem  value = 'worldwide'>Worldwide</MenuItem>
                            { countries && countries.map((res) => 
                                <MenuItem key={res.name} value = {res.value}>{res.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <div className={styles.appStats}>
                        <InfoBox isRed active={casesType==="cases"}  title="Coronavirus Cases" onClick={e => setCasesType('cases')} cases = {prettyPrintStat(caseData.cases)} total={prettyPrintStat(caseData.cases)}/>
                        <InfoBox active={casesType==="recovered"} title="Recovered Cases" onClick={e => setCasesType('recovered')} cases = {prettyPrintStat(caseData.recovered)} total={prettyPrintStat(caseData.recovered)}/>
                        <InfoBox isRed active={casesType==="deaths"} title="Deaths Cases" onClick={e => setCasesType('deaths')} cases ={prettyPrintStat(caseData.deaths)} total={prettyPrintStat(caseData.deaths)} />
                    </div>
                </div>
                <div>
                    <Maps casesType={casesType} center = {mapCenter} zoom={mapZoom} countries = {countries}/>
                </div>
            </div>
            <Card className={styles.appRight}>
                <CardContent>
                    <h3>Live Cases by country</h3>
                        <Table country = {sortedData}  />
                        {/* sorted by cases */}            
                        <h3 className={styles.appHeader}>Worldwide new {casesType}</h3>
                    <LineGraph casesTypes = {casesType}/>
                </CardContent>
            </Card>
        </div>
    )
}
