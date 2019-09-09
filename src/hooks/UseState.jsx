import React,{useState} from 'react'

function UseState(props){
    console.log('---UseState---')
    // const [count,setCount] = useState(0)

    const [count,setCount] = useState(() => {
        console.log('--延迟初始化，只会执行一次--')
        return props.defaultValue || 0
    })

    return <div>
        <button onClick={() => setCount(count+1)}>Click({count})</button>
    </div>
}

export default UseState