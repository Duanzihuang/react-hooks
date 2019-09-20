import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import reducers from './reducers'

/**
 * 参数1：reducers
 * 参数2：state的默认值
 * 参数3：中间件
 */
export default createStore(combineReducers(reducers),{
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelecingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    hignSpeed: false
},applyMiddleware(thunk))