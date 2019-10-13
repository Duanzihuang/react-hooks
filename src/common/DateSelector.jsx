import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {h0} from '../common/fp'
import Header from './Header'

import './DateSelector.css'

function Day(props) {
    const {
        day,
        onSelect
    } = props

    if (!day) {
        return <td className="null"></td>
    }

    const classes = []
    const now = h0()
    // 是否是今天之前的时间
    if (day < now) {
        classes.push('disabled')
    }

    // 是否是周末
    if ([6,0].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }

    const dateString = day === now ? '今天' : new Date(day).getDate()

    return <td className={classnames(classes)} onClick={() => onSelect(day)}>
        {dateString}
    </td>
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired
}

function Week(props) {
    const {
        days,
        onSelect
    } = props

    return <tr className="date-table-days">
        {
            days.map((day,idx) => {
                return <Day key={idx} day={day} onSelect={onSelect}/>
            })
        }
    </tr>
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}

function Month(props) {
    const {
        startingTimeInMonth,
        onSelect
    } = props

    // 每个月的第一天
    const startDay = new Date(startingTimeInMonth)
    const currentDay = new Date(startingTimeInMonth)
    // console.log(startDay)

    let days = []
    while(currentDay.getMonth() === startDay.getMonth()) {
        // console.log(currentDay.getDate() , currentDay.getTime())
        days.push(currentDay.getTime())

        currentDay.setDate(currentDay.getDate() + 1)
    }

    // 在前面添加一些空格
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days)

    const lastDay = new Date(days[days.length - 1])
    // console.log('lastDay is',lastDay,lastDay.getDay())
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))
    // console.log('days is ',days)
    const weeks = []

    for (let row = 0 ; row < days.length / 7 ; ++row) {
        const week = days.slice(row * 7,(row + 1) * 7)
        weeks.push(week)
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>{startDay.getFullYear()}年{startDay.getMonth() + 1}月</h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week,idx) => {
                        return <Week key={idx} days={week} onSelect={onSelect}/>
                    })
                }
            </tbody>
        </table>
    )
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default function DateSelector(props){
    const {
        show,
        onSelect,
        onBack
    } = props

    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    now.setDate(1)

    // 这个月
    const monthSequence = [now.getTime()]
    
    // 下个月
    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    // 下下个月
    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())
    // console.log('monthSequence ',monthSequence)

    return (
        <div className={classnames('date-selector',{hidden: !show})}>
            <Header title="日期选择" onBack={onBack}/>
            <div className="date-selector-tables">
                {
                    monthSequence.map(month => {
                        return <Month key={month} startingTimeInMonth={month} onSelect={onSelect}/>
                    })
                }
            </div>
        </div>
    )
}