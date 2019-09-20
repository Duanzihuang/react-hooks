import React from 'react'
import {connect} from 'react-redux'
// import './App.css'

function App(props) {
    return <div>测试</div>
}

export default connect(
    function mapStateToProps(state){},
    function mapDispatchToProps(dispatch){}
)(App)