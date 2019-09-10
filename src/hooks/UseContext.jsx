import React,{Component,useState,useContext} from 'react'

const CountContext = React.createContext()

class Foo extends Component{
    render(){
        return <div>
            <CountContext.Consumer>
                {
                    value => <h1>{value}</h1>
                }
            </CountContext.Consumer>
        </div>
    }
}

class Bar extends Component{
    static contextType = CountContext
    render(){
        return <div>
          <h1>{this.context}</h1>
        </div>
    }
}

function Counter(){
    const count = useContext(CountContext)

    return <h3>{count}</h3>
}

function UseContext(){
    const [count,setCount] = useState(0)

    return <div>
        <button onClick={() => setCount(count+1)}>Click({count})</button><br/>
        <CountContext.Provider value={count}>
            <Foo />
            <Bar />
            <Counter />
        </CountContext.Provider>
    </div>
}

export default UseContext