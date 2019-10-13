import {createStore,combineReducers,applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * 参数1：reducers
 * 参数2：state的默认值
 * 参数3：中间件
 */
export default createStore(combineReducers(reducers),{
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    // currentSelecingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    highSpeed: false
},composeEnhancers(applyMiddleware(thunk)))