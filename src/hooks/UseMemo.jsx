import React, { useState, useMemo, memo, useCallback } from "react";

const Counter = memo(function Counter(props) {
  console.log("---Counter render---");
  return (
    <div>
      <button onClick={props.onClick}>111</button>
    </div>
  );
});

function UseState() {
  const [count, setCount] = useState(0);

  // const double = useMemo(() => {
  //     return count * 2
  // })

  // 和上面等价
  // const double = useMemo(() => {
  //     console.log('---invoke---')
  //     return count * 2
  // },[count])

  // const double = useMemo(() => {
  //   console.log('---invoke---')
  //   return count * 2
  // },[]) // 只执行一次

  const double = useMemo(() => {
    //   console.log('---invoke---')
    return count * 2;
  }, [count === 3]); // count === 3 的时候执行

  // const onClick = () => {
  //     console.log('ok')
  // }

  // const onClick = useMemo(() => {
  //     return () => {
  //         console.log('ok222')
  //     }
  // },[]) // 函数句柄只会执行一次

  // 和上面的等价
  const onClick = useCallback(() => {
    console.log("ok333");
  }, []); // 函数句柄只会执行一次

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click({count}) double:{double}
      </button>
      <Counter double={double} onClick={onClick} />
    </div>
  );
}

export default UseState;
