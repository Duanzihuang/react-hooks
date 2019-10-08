import React, { useState, useLayoutEffect } from 'react'

function UseLayoutEffect() {
  const [width, setWidth] = useState(0)

  //useLayoutEffect中的副作用会在DOM更新之后同步执行,等dom结构渲染完毕之后执行
  useLayoutEffect(() => {
    const title = document.querySelector('#title')
    const titleWidth = title.getBoundingClientRect().width

    if (title !== titleWidth) {
      setWidth(titleWidth)
    }
  })

  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  )
}

export default UseLayoutEffect
