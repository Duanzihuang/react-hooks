import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import './App.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import { h0 } from '../common/fp'
import Header from '../common/Header'
import Nav from '../common/Nav'
import useNav from '../common/useNav'

import {
  setArriveStation,
  setDepartStation,
  setTrainNumber,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setDepartDate,
  setDurationStr,
  setArriveDate,
  setTickets
} from './actions'

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // 副作用，解析查询参数
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)

    const { aStation, dStation, trainNumber, date } = queries

    dispatch(setArriveStation(aStation))
    dispatch(setDepartStation(dStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))

    dispatch(setSearchParsed(true))
  }, [])

  // 副作用，更改标题
  useEffect(() => {
    document.title = trainNumber
  }, [trainNumber])

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  )

  // 发送请求的副作用
  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/api/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString()

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const { detail, candidates } = result

        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail

        // 更新仓库中的数据
        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setTickets(candidates))
      })
  }, [searchParsed, departDate, trainNumber])

  if (!searchParsed) return null

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
      </div>
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
