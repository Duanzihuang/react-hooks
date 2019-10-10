import React, { useState, useMemo, useCallback,useEffect } from 'react'

/**
function WithoutMemo() {
  const [count, setCount] = useState(1)
  const [value, setValue] = useState('')

  function expensive() {
    console.log('compute')
    let sum = 0
    for (let i = 0; i < count * 100; i++) {
      sum += i
    }
    return sum
  }

  return <div>
      <h4>{count}---{value}---{expensive()}</h4>
      <div>
          <button onClick={() => setCount(count+1)}>+count1</button>
          <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
      </div>
  </div>
}

export default WithoutMemo
 */

/**
function WithMemo() {
  const [count, setCount] = useState(1)
  const [value, setValue] = useState('')

  const expensive = useMemo(() => {
    console.log('compute')
    let sum = 0
    for (let i = 0; i < count * 100; i++) {
      sum += i
    }
    return sum
  }, [count])

  console.log("-----",expensive)

  return (
    <div>
      <h4>
        {count}---{value}---{expensive}
      </h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+count1</button>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="text"
        />
      </div>
    </div>
  )
}

export default WithMemo

 */

/**
const set = new Set()

function Callback() {
    const [count, setCount] = useState(1)
    const [value, setValue] = useState('')

    const callback = useCallback(() => {
        console.log(count)
    },[count])

    console.log(callback)
    set.add(callback)

    return <div>
        <h4>{count}</h4>
        <h4>{set.size}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        </div>
    </div>
}

export default Callback
 */

function Parent() {
  const [count, setCount] = useState(1)
  const [value, setValue] = useState('')

  const callback = useCallback(() => {
    // console.log('count')
  }, [count])

  return <div>
       <h4>{count}</h4>
       <Child callback={callback}/>
       <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        </div>
  </div>
}

function Child({callback}) {
    const [count,setCount] = useState(() => callback())

    // console.log('count is ',count)

    useEffect(() => {
        console.log("1111111111")
        setCount(callback())
    }, [callback])

    return <div>
        {count}
    </div>
}

export default Parent
