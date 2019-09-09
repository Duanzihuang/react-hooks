import React,{useState,useEffect} from 'react'

function UseEffect(){
    const [count,setCount] = useState(0)
    const [size,setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    useEffect(() => {
        // 在 mount 和 update 之后都会执行到这里
        // console.log('---count invoke---')
        document.title = count
    })

    // 更改size大小的事件
    const onReSize = () => {
        console.log('--onReSize invoke--')
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    }

    useEffect(() => {
        console.log('---event bind---')
        // 相当于在 componentDidMount 之后绑定事件
        window.addEventListener('resize',onReSize,false)

        return () => {
            // 相当于在 componentWillUnMount 之后解绑事件
            window.removeEventListener('resize',onReSize,false)
        }
    },[]) // 传入空数组确保只会执行一次

    // 测试互不影响
    useEffect(() => {
        console.log("---只有count 改变的时候，才会执行---")
    },[count])

    const onClick = () => {
        console.log('click')
    }

    useEffect(() => {
        document.querySelector('#sizer').addEventListener('click',onClick,false)

        return () => {
            document.querySelector('#sizer').removeEventListener('click',onClick,false)
        }
    }) // 不写任何参数，每次都会执行绑定与解绑，与此刻的应用场景是匹配的

    return <div>
        <button onClick={() => setCount(count + 1)}>{count} </button>
        {count % 2 === 0 ? <span id="sizer">size:{size.width}x{size.height}</span> : <p id="sizer">size:{size.width}x{size.height}</p>}
    </div>
}

export default UseEffect