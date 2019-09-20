export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'

export function setFrom(from){
    return {
        type: ACTION_SET_FROM,
        payload: from
    }
}

export function setTo(to){
    return {
        type: ACTION_SET_TO,
        payload: to
    }
}

export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

export function toggleHignSpeed(){
    return (dispatch,getState) => {
        const { hignSpeed } = getState()
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !hignSpeed
        })
    }
}

export function showCitySelector(currentSelectingLeftCity) {
    return (dispatch) => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}

export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();

        if (currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }

        dispatch(hideCitySelector());
    };
}

export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}

export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}
