export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
  'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
  'SET_CURRENT_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
  'SET_IS_DATE_SELECTOR_VISIBLE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

export function showCitySelector(currentSelectingLeftCity) {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })

    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}

export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()

    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }

    dispatch(hideCitySelector())
  }
}

export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}

export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

export function setDepartDate(departDate){
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState()
    // console.log(from, to)
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

export function fetchCityData() {
  return (dispatch,getState) => {
    const {isLoadingCityData,cityData} = getState()

    if (isLoadingCityData || cityData) {
      return 
    }

    // 判断缓存是否可用
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data))
      return
    }

    // 开始发送网络请求
    dispatch(setIsLoadingCityData(true))

    // 发送网路请求获取
    fetch('/rest/cities?_'+Date.now()).then(res => res.json()).then(cityData => {
      // console.log(cityData)
      dispatch(setCityData(cityData.message))

      // 缓存到本地
      localStorage.setItem('city_data_cache',JSON.stringify({
        expires: Date.now() + 60 * 1000,
        data: cityData.message
      }))

      dispatch(setIsLoadingCityData(false))
    }).catch(() => {
      dispatch(setIsLoadingCityData(false))
    })
  }
}