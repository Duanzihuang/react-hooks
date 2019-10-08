import React,{useState,useEffect} from 'react'

function useIncrementTimer(){
    const [count,setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1)
        },1000)

        return () => {
            clearInterval(timer)
        }
    })

    return count
}

function SelfHook2() {
    const count = useIncrementTimer()
    return <div> 
        <p style={{color:count % 2 === 0 ? 'red' : 'blue'}}>自定义Hook</p>
    </div>
}

export default SelfHook2