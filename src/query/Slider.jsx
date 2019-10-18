import React, { memo, useState, useMemo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Slider.css'
import leftPad from 'left-pad'
import useWinSize from './useWinSize'

const Slider = memo(function(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged
  } = props

  const winSize = useWinSize()

  const startHandle = useRef()
  const endHandle = useRef()

  const range = useRef()
  const rangeWidth = useRef()

  // 设置横坐标的位置
  const lastStartX = useRef()
  const lastEndX = useRef()

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100)
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100)

  const prevCurrentStarHours = useRef(currentStartHours)
  const prevCurrentEndHours = useRef(currentEndHours)

  if (prevCurrentStarHours.current != currentStartHours) {
    setStart((currentStartHours / 24) * 100)

    prevCurrentStarHours.current = currentStartHours
  }

  if (prevCurrentEndHours.current != currentEndHours) {
    setEnd((currentEndHours / 24) * 100)

    prevCurrentEndHours.current = currentEndHours
  }

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100
    }

    if (start < 0) {
      return 0
    }

    return start
  }, [start])

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100
    }

    if (end < 0) {
      return 0
    }

    return end
  }, [end])

  //   console.log(currentStartHours,currentEndHours,startPercent,endPercent)

  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100)
  }, [startPercent])

  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100)
  }, [endPercent])

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00'
  }, [startHours])

  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00'
  }, [endHours])

  function onStartTouchBegin(e) {
    lastStartX.current = e.targetTouches[0].pageX
  }

  function onEndTouchBegin(e) {
    lastEndX.current = e.targetTouches[0].pageX
  }

  function onStartTouchMove(e) {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastStartX.current
    // 更新上一次的值
    lastStartX.current = touch.pageX

    // console.log(lastStartX.current)

    // 更新start的值
    setStart(start => start + (distance / rangeWidth.current) * 100)
  }

  function onEndTouchMove(e) {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastEndX.current

    lastEndX.current = touch.pageX

    // 更新end的值
    setEnd(end => end + (distance / rangeWidth.current) * 100)
  }

  // 获取range的宽度
  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    )
    // console.log(rangeWidth.current)
  }, [winSize.width])

  // 副作用用于处理dom事件
  useEffect(() => {
    startHandle.current.addEventListener('touchstart', onStartTouchBegin, false)
    startHandle.current.addEventListener('touchmove', onStartTouchMove, false)
    endHandle.current.addEventListener('touchstart', onEndTouchBegin, false)
    endHandle.current.addEventListener('touchmove', onEndTouchMove, false)
    return () => {
      startHandle.current.removeEventListener(
        'touchstart',
        onStartTouchBegin,
        false
      )
      startHandle.current.removeEventListener(
        'touchmove',
        onStartTouchMove,
        false
      )
      endHandle.current.removeEventListener(
        'touchstart',
        onEndTouchBegin,
        false
      )
      endHandle.current.removeEventListener('touchmove', onEndTouchMove, false)
    }
  })

  useEffect(() => {
    onStartChanged(startHours)
  }, [startHours])

  useEffect(() => {
    onEndChanged(endHours)
  }, [endHours])

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%'
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
              left: startPercent + '%'
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endPercent + '%'
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
})

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired
}

export default Slider
