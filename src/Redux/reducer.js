import actionConstant from './actionTypes'

export const initState = {
    countriesArray :  [],
    allCountriesData  : [],
    specificData : [],
    pastData : []
}

const reducer = ( state = initState , action ) => {
    switch(action.type){
    //Reducer for displaying all country list in dropdown
        case actionConstant.COUNTRIES_DATA_REQUEST:
            return {
                ...state ,
            }
        case actionConstant.COUNTRIES_DATA_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                countriesArray : action.payload.map((res) => ({
                    name : res.country,
                    value : res.countryInfo.iso2,
                    cases : res.cases,
                    lat : res.countryInfo.lat,
                    long : res.countryInfo.long,
                    flag : res.countryInfo.flag,
                    recovered : res.recovered, 
                    deaths : res.deaths
                })),
               
            }
        case actionConstant.COUNTRIES_DATA_FAILURE:
            return{
                ...state
            }
    //Reducer to get the total number of cases, deaths and recovered
        case actionConstant.GET_ALL_COUNTRIES_DATA_REQUEST:
            return {
                ...state
            }
        case actionConstant.GET_ALL_COUNTRIES_DATA_SUCCESS :
            return{
                ...state ,
                allCountriesData : action.payload
            }
        case actionConstant.GET_ALL_COUNTRIES_DATA_FAILURE:
            return {
                ...state
            }
    //Reducer to get the total number of cases , deaths and recovered for a specific country  
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_REQUEST:
            return {
                ...state,
               
            }
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_SUCCESS :
            return{
                ...state,
                specificData : action.payload
            }
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_FAILURE:
            return {
                ...state
            }       
    //Reducer for history of last 30 days
        case actionConstant.HISTORICAL_DATA_REQUEST:
            return {
                ...state
            }
        case actionConstant.HISTORICAL_DATA_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                pastData : action.payload
            }
        case actionConstant.HISTORICAL_DATA_FAILURE:
            return {
                ...state
            }
        default :
            return state
    }
}

export default reducer