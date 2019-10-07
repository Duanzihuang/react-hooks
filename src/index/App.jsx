import React, { useCallback } from 'react'
import { connect } from 'react-redux'
// import './App.css'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HignSpeed from './HignSpeed'
import Submit from './Submit'

function App(props) {
  // 使用 useCallback 避免Header不必要的重渲染
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <Journey />
      <DepartDate />
      <HignSpeed />
      <Submit />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {}
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(App)
