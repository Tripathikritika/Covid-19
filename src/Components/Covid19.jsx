import React, { useState,useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from '../Styling/Covid.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryApiCall,getCountryAllData ,getCountryData} from '../Redux/action'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import InfoBox from './InfoBox'
import Map from './Map'

export default function Covid19() {
    //state is a how to write a variable in react

    const dispatch = useDispatch()
    const [country , setCountry] = useState('')
    let [countries,setCountries] = useState("worldwide")
    countries = useSelector(state => state.countriesArray)

    const onCountryChange = async ( event ) => {
        const countryCode = event.target.value
        console.log(countryCode)
        setCountry( countryCode)

        if(countryCode === 'worldwide'){
            dispatch(getCountryAllData())
            return
        }
        else{
            dispatch(getCountryData(countryCode))
        }
    }

    useEffect(() => {
        dispatch(getCountryApiCall())
    }, [])
    return (

        <div className={styles.app}>
            <div className={styles.appleft}>
                <div className={`${styles.app_header}`}>
                    <h1>Covid-19 TRACKER</h1>
                    <FormControl className="app_dropdown">
                        <Select className={styles.slecteButton} value={countries} onChange={onCountryChange} style={{border:'1px solid black'}}>
                            <MenuItem  value = 'worldwide'>Worldwide</MenuItem>
                            { countries && countries.map((res) => 
                                <MenuItem key={res.name} value = {res.value}>{res.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <div className={styles.appStats}>
                        <InfoBox title="Coronavirus Cases" total={2000}/>
                        <InfoBox title="Recovered"  total={2000}/>
                        <InfoBox title="Deaths" />
                    </div>
                </div>
                <div>
                    <Map />
                </div>
            </div>

            <Card className={styles.appRight}>
                <CardContent>
                    <h3>Live Cases by country</h3>
                    {/* <Table />
                
                    <Graph /> */}
                    <h3>Worldwide new Cases</h3>
                </CardContent>
            </Card>
        </div>
    )
}
