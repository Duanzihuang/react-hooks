import React,{useMemo} from 'react'
import PropTypes from 'prop-types'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'
import './DepartDate.css'

export default function DepartDate(props){
    const {
        time,
        onClick
    } = props

    // console.log('time is ',time)
    const h0OfDepart = h0(time)
    const departDate = new Date(h0OfDepart)
    // console.log('h0OfDepart is ',h0OfDepart)

    const departDateString = useMemo(() => {
        const date = dayjs(h0OfDepart).format('YYYY-MM-DD')

        // console.log('date is ',date)

        return date
    }, [h0OfDepart])

    // console.log("day is ",departDate.getDay())
    // 判断是否是今天
    const isToday = h0OfDepart === h0()
    const weekString = '周' + ['日','一','二','三','四','五','六'][departDate.getDay()] + (isToday ? '(今天)' : '')

    return <div className="depart-date" onClick={onClick}>
        <input type="hidden" name="date" value={departDateString}/>
        { departDateString } <span className="depart-week">{weekString}</span>
    </div>
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}