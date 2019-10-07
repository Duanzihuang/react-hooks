import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HignSpeed from './HignSpeed'
import Submit from './Submit'

import { bindActionCreators } from 'redux'

import { exchangeFromTo, showCitySelector } from './actions'

function App(props) {
  const { from, to, dispatch } = props

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
