import actionConstant from './actionTypes'

export const initState = {
    countriesArray :  [],
    allCountriesData  : []
}

const reducer = ( state = initState , action ) => {
    switch(action.type){
        case actionConstant.COUNTRIES_DATA_REQUEST:
            return {
                ...state ,
            }

        case actionConstant.COUNTRIES_DATA_SUCCESS:
            return {
                ...state,
                countriesArray : action.payload.map((res) => ({
                    name : res.country,
                    value : res.countryInfo.iso2
                })),
               
            }

        case actionConstant.COUNTRIES_DATA_FAILURE:
            return{
                ...state
            }
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
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_REQUEST:
            return {
                ...state
            }
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_SUCCESS :
            return{
                ...state
            }
        case actionConstant.GET_SPECIFIC_COUNTRIES_DATA_FAILURE:
            return {
                ...state
            }       

        default :
            return state
    }
}

export default reducer