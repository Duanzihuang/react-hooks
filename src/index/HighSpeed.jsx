import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './HighSpeed.css'

export default function HignSpeed(props){
    const {
        hignSpeed,
        toggle
    } = props
    return <div className="high-speed">
        <div className="high-speed-label">只看高铁/动车</div>
        <div className="high-speed-switch" onClick={() => toggle()}>
            <input type="hidden" name="highSpeed" value={hignSpeed}/>
            <div className={classnames('high-speed-track',{
                checked: hignSpeed
            })}>
                <span className={classnames('high-speed-handle',{
                    checked: hignSpeed
                })}></span>
            </div>
        </div>
    </div>
}

HignSpeed.propTypes = {
    hignSpeed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
}