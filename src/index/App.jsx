import React from 'react'
import {connect} from 'react-redux'
// import './App.css'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HignSpeed from './HignSpeed'
import Submit from './Submit'

function App(props) {
    return <div>
        <Header />
        <Journey />
        <DepartDate />
        <HignSpeed />
        <Submit />
    </div>
}

export default connect(
    function mapStateToProps(state){
        return {}
    },
    function mapDispatchToProps(dispatch){
        return {}
    }
)(App)