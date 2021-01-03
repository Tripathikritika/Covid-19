import actionConstant from './actionTypes'
import axios from 'axios'

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
        
        dispatch(getCountrySuccess(res.data))
    })
    .catch((err) => dispatch(getCountryFailure()))
}

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
        console.log(res.data)
        dispatch(countryAllDataSuccess())
    })
    .catch((err) => {
        dispatch(countryAllDataFailure())
    })

}

export const countrySpecificDataRequest = () => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_REQUEST
})
export const countrySpecificDataSuccess = () => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_SUCCESS
})
export const countrySpecificDataFailure = () => ({
    type : actionConstant.GET_SPECIFIC_COUNTRIES_DATA_FAILURE
})
export const getCountryData = ( payload ) => (dispatch) => {
    console.log(payload)
    dispatch(countrySpecificDataRequest())
    axios.get(`https://disease.sh/v3/covid-19/countries/${payload}`)
    .then((res) => {
        // console.log(res.data)
        dispatch(countrySpecificDataSuccess())
    })
    .catch(err => dispatch(countrySpecificDataFailure()))
}