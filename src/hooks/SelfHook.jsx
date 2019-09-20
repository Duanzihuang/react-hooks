import React,{useState,useRef,useEffect} from 'react'

function useCount(defaultCount){
    const [count,setCount] = useState(defaultCount)

    const it = useRef()

    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1)
        }, 1000);
    }, [])

    useEffect(() => {
        if (count > 10) {
            clearInterval(it.current)
        }
    })

    return [count,setCount]
}

function Counter(props){
    return (
        <h1>{props.count}</h1>
    )
}

function SelfCount(){
    const [count] = useCount(0)

    return <div>
        <Counter count={count}/>
    </div>
}

export default SelfCount