import actionConstant from './actionTypes'
import axios from 'axios'

// The Api calls for displaying all country list in dropdown
export const getCountryRequest = () => ({
    type: actionConstant.COUNTRIES_DATA_REQUEST
})
export const getCountrySuccess = (payload) => ({
    type: actionConstant.COUNTRIES_DATA_SUCCESS,
    payload
})
export const getCountryFailure = () => ({
    type: actionConstant.COUNTRIES_DATA_FAILURE
})
export const getCountryApiCall = (payload) => (dispatch) => {
    dispatch(getCountryRequest())
    axios.get(`https://disease.sh/v3/covid-19/countries`)

    .then((res)=>{
        // console.log(res.data)
        dispatch(getCountrySuccess(res.data))
    })
    .catch((err) => dispatch(getCountryFailure()))
}
// The Api calls to get the total number of cases, deaths and recovered
export const countryAllDataRequest = () => ({
    type : actionConstant.GET_ALL_COUNTRIES_DATA_REQUEST
})
export const countryAllDataSuccess = (payload) => ({
    type : actionConstant.GET_ALL_COUNTRIES_DATA_SUCCESS,
    payload
})
export const countryAllDataFailure = () => ({
    type : actionConstant.GET_ALL_COUNTRIES_DATA_FAILURE
})
export const getCountryAllData = (  ) => (dispatch) => {
    dispatch(countryAllDataRequest())
    axios.get(`https://disease.sh/v3/covid-19/all`)
    .then((res) => {
        // console.log(res.data)
        dispatch(countryAllDataSuccess(res.data))
    })
    .catch((err) => {
        dispatch(countryAllDataFailure())
    })

}
// The Api calls to get the total number of cases , deaths and recovered for a specific country
export const countrySpecificDataRequest = () => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_REQUEST
})
export const countrySpecificDataSuccess = (payload) => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_SUCCESS,
    payload
})
export const countrySpecificDataFailure = () => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_FAILURE
})
export const getCountryData = ( payload ) => (dispatch) => {
    dispatch(countrySpecificDataRequest())
    axios.get(`https://disease.sh/v3/covid-19/countries/${payload}`)
    .then((res) => {
        dispatch(countrySpecificDataSuccess(res.data))
    })
    .catch(err => dispatch(countrySpecificDataFailure()))
}
// The Api calls for the history of last 30 days
export const historicalDataRequest = () => ({
    type : actionConstant.HISTORICAL_DATA_REQUEST
})
export const historicalDataSuccess = (payload) => ({
    type : actionConstant.HISTORICAL_DATA_SUCCESS,
    payload
})
export const historicalDataFailure = () => ({
    type : actionConstant.HISTORICAL_DATA_FAILURE
})
export const getHistoricalData = () => (dispatch) => {
    dispatch(historicalDataRequest())
    axios.get(`https://disease.sh/v3/covid-19/historical/all/?lastdays=120`)
    .then(res => {
        dispatch(historicalDataSuccess(res.data))
    })
    .catch(err => {
        dispatch(historicalDataFailure())
    })
}