import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import reducers from './reducers'

/**
 * 参数1：reducers
 * 参数2：state的默认值
 * 参数3：中间件
 */
export default createStore(combineReducers(reducers),{
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    departStation: null,
    arriveStation: null,
    trainNumber: null,
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,
    searchParsed: false
},applyMiddleware(thunk))