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