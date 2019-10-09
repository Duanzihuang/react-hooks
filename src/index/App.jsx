import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HignSpeed from './HignSpeed'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'

import { bindActionCreators } from 'redux'

import { exchangeFromTo, showCitySelector, hideCitySelector,fetchCityData } from './actions'

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData
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
        fetchCityData
      },
      dispatch
    )
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form className="form">
        {/* 使用 useCallBack */}
        {/* <Journey from={from} to={to} exchangeFromTo={doExchangeFromTo} showCitySelector={doShowCitySelector}/> */}

        {/* 使用 useMemo  */}
        <Journey from={from} to={to} {...cbs} />

        <DepartDate />
        <HignSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      ></CitySelector>
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
