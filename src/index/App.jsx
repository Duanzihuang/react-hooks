import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'

import { bindActionCreators } from 'redux'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from './actions'

import { h0 } from '../common/fp'

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    highSpeed
  } = props

  // 使用 useCallback 避免Header不必要的重渲染
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  /**
   * useCallback
    const doExchangeFromTo = useCallback(() => {
      dispatch(exchangeFromTo())
    },[])

    const doShowCitySelector = useCallback(m => {
      dispatch(showCitySelector(m))
    },[])
   */

  /**
   * useMemo
   *
   * useCallback & useMemo
   * https://blog.csdn.net/sinat_17775997/article/details/94453167
   */
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    )
  }, [])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    )
  }, [])

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector
    },dispatch)
  }, [])

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({
      toggle: toggleHighSpeed
    },dispatch)
  },[])

  const onSelectDate = useCallback(day => {
    if (!day) {
      return 
    }

    if (day < h0()) {
      return
    }

    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  },[])

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form action="./query.html" className="form">
        {/* 使用 useCallBack */}
        {/* <Journey from={from} to={to} exchangeFromTo={doExchangeFromTo} showCitySelector={doShowCitySelector}/> */}

        {/* 使用 useMemo  */}
        <Journey from={from} to={to} {...cbs} />

        <DepartDate time={departDate} {...departDateCbs}/>
        <HighSpeed {...highSpeedCbs} hignSpeed={highSpeed}/>
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      ></CitySelector>
      <DateSelector onSelect={onSelectDate} show={isDateSelectorVisible} {...dateSelectorCbs}/>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App)
