import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'
import URI from 'urijs'
import Nav from '../common/Nav.jsx'
import List from './List'
import Bottom from './Bottom'
import Header from '../common/Header'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'
import useNav from '../common/useNav'
import { bindActionCreators } from 'redux'

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleHighSpeed,
  toggleOrderType,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd
} from './actions'

function App(props) {
  const {
    trainList,
    from,
    to,
    departDate,
    searchParsed,
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // 副作用，解析url
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)

    // 结构赋值
    const { from, to, date, highSpeed } = queries

    // 给store 设置值
    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setHighSpeed(highSpeed === 'true'))

    // 设置当前的解析状态为解析成功
    dispatch(setSearchParsed(true))
  }, [])

  // 副作用，发送网路请求
  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/api/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join()
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString()

    // console.log(url)
    // 查询
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation }
            }
          }
        } = result

        dispatch(setTrainList(trains))
        dispatch(setTicketTypes(ticketType))
        dispatch(setTrainTypes(trainType))
        dispatch(setDepartStations(depStation))
        dispatch(setArriveStations(arrStation))
      })
  }, [from, to, departDate, highSpeed, orderType, onlyTickets])

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  )

  // 设置Bottom的callback
  const bottomCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleHighSpeed,
        toggleOrderType,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd
      },
      dispatch
    )
  }, [])

  if (!searchParsed) {
    return null
  }

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from}-${to}`} onBack={onBack} />
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
      <List list={trainList} />
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        setCheckedTicketTypes={setCheckedTicketTypes}
        setCheckedTrainTypes={setCheckedTrainTypes}
        setCheckedDepartStations={setCheckedDepartStations}
        setCheckedArriveStations={setCheckedArriveStations}
        setDepartTimeStart={setDepartTimeStart}
        setDepartTimeEnd={setDepartTimeEnd}
        setArriveTimeStart={setArriveTimeStart}
        setArriveTimeEnd={setArriveTimeEnd}
        {...bottomCbs}
      />
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
