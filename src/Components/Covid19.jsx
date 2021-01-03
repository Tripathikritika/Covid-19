import React, { useState,useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from '../Styling/Covid.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryApiCall } from '../Redux/action'

export default function Covid19() {
    //state is a how to write a variable in react

    const dispatch = useDispatch()
    const [country , setCountry] = useState('')
    let [countries,setCountries] = useState("Worldwide")
    countries = useSelector(state => state.countriesArray)

    const onCountryChange = async ( event ) => {
        const countryCode = event.target.value
        
        setCountry( countryCode)
    }

    useEffect(() => {
        dispatch(getCountryApiCall())
    }, [])
    return (
        <div className={`${styles.app_header}`}>
            <h1>Covid-19 TRACKER</h1>
            <FormControl className="app_dropdown">
                <Select className={styles.slecteButton} value={country} onChange={onCountryChange} style={{border:'1px solid black'}}>
                    {/* <MenuItem  value = {countries}>Worlwide</MenuItem> */}

                    { countries && countries.map((res) => 
                        <MenuItem key={res.name} value = {res.value}>{res.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
      </div>
    )
}
