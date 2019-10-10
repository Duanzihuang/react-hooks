# react-hooks
使用React最新特性Hooks构建项目

### React 16.x的新特性

> Context
```
作用：实现爷孙组件之间传值

步骤：
	1、创建Context
		React.createContext()
	
	2、使用Context中的Provider提供数据
		<Provider value={值}>
		</Provider>

	3、使用Context中的Consumer消费数据
		<Consumer>
			{
				value => <div>内容 : {value}</div>
			}
		</Consumer>
```
> ContextType
```
前提：项目中只有一个Context的时候使用

步骤：
	1、在子孙组件中，通过 static 声明 contextType
		static contextType = Context
	
	2、在render方法中，使用 this.context 即可拿到内容
		const value = this.context
```

> lazy & Suspense
```
作用：实现组件懒加载

相关概念：
	Webpack Code Splitting
	import 动态导入

步骤：
	1、在 App组件中，从React中导入 {lazy,Suspense} 
	
	2、使用 lazy 包装导入 组件
		const 组件 = lazy(() => import ('./组件路径.jsx'))
	
	3、在 render 组件中的最外层包裹 Suspense，然后实现 fallback 函数
		<Suspense fallback={<div>loading...</div>}>
		</Suspense>
		
注意点：
	封装的是组件的导入行为，而不是组件本身
	如果加载组件出错，则使用ErrorBoundary
```
> memo

```
适用场景：
	函数式组件，使用mome来解决父组件数据变化，而子组件数据没有变化导致的子组件更新的问题
	相当于类组件中的 PureComponent

作用：
	解决函数式组件中，父组件数据变化，而子组件数据没有变化导致的子组件更新的问题
```

### Hooks

```
注意点：
	所有的钩子函数都是以 use 开头
```

> useState

```
作用：
	相当于class组件中的 state、setState({})
	
步骤：
	1、从React包中导入 useState
		import React,{useState} from 'react'
		
	2、在渲染jsx前，写上如下代码
		const [count,setCount] = useState(0)
		
注意点：
	useState必须在顶层中调用，不能在条件语句或是循环语句中调用
	useState必须按照固定的顺序和个数调用
	
其它：
	可以使用 eslint-plugin-react-hooks 这个插件来检测useState书写是否正确
```

> useEffect

```
作用：
	执行副作用，比如绑定事件、网络请求、访问Dom
	useEffect在组件mount时执行，但也会在组件更新时执行【默认情况】
	
好处：
	关注点分离
	事件绑定与解绑写在一起，不容易遗漏
	
语法：
	useEffect(() => {
		// 在mount和update之后，都会执行到这里的代码
	}) 没有第二个参数，每次都会执行代码
	
	useEffect(() => {
		// 有点类似于componentDidMount
		绑定事件
		
		return () => { // 有点类似于 componentWillUnMount
			解绑事件
		}
	},[]) // 空数组，只会执行一次，在 componentDidMount 中绑定事件
	在 componentWillUnMount 解绑事件
	
	useEffect(() => {
		console.log('只有当数组中的模型值发生改变的时候才会执行...')
	},[模型值])
	
其它：
	useEffect其实就相当于在替代 componentDidMount、componentDidUpdate、componentWillUnMount
```
> useLayoutEffect
```
处理跟DOM相关的副作用
useLayoutEffect中的副作用会在DOM更新之后同步执行

function App() {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        const title = document.querySelector('#title');
        const titleWidth = title.getBoundingClientRect().width;
        if (width !== titleWidth) {
            setWidth(titleWidth);
        }
    });
    return <div>
        <h1 id="title">hello</h1>
        <h2>{width}</h2>
    </div>
}
```
> useContext

```
作用：
	跨层级组件传递数据
	
语法：
	const count = useContext(CountContext)
```

> useMemo

```
作用：
	优化性能
	决定组件是否重新渲染，用来解决重复渲染的问题
	
语法：
	useMemo(() => {
		return count * 2
	},[count]) // 当count每次变化的时候，回调函数就会执行
	
	useMemo(() => {
		return count * 2
	},[count === 3]) // 当count === 3 的时候，回调函数就会执行
	
其它：
	在渲染前执行,跟useEffect不一样
```

> useCallBack

```
作用：
	优化性能
	useMemo的简化写法，只生成一个事件句柄

语法：
	useCallback(() => {
		
	},[]) // 设置为[] 里面的代码只会执行一次
	
和useMemo的关系
useMemo(() => fn) 这种写法和 useCallback(fn) 等价，所以说userCallback是useMome的简写

应用场景：
	把函数作为参数传递给子组件,如果不需要传递则不需要使用useCallback
```
> useCallback & useMemo
```
相同点：
	都能进行性能优化
	
不同点：
	useMemo返回缓存的变量
	useCallback返回缓存的函数
```
> 自定义Hooks【使用到useEffect】

```
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

function SelfHook() {
    const count = useIncrementTimer()
    return <div> 
        <p style={{color:count % 2 === 0 ? 'red' : 'blue'}}>自定义Hook</p>
    </div>
}

export default SelfHook
```

> useReducer

```
实现部分reducer的功能

const reducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return initState;
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initState);
    return <div>
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'reset'})}>reset</button>
    </div>
}
```

> useRef

```
获取Dom节点

function App() {
    const inputRef = useRef(null);

    return <div>
        <input type="text" ref={inputRef}/>
        <button onClick={() => inputRef.current.focus()}>focus</button>
    </div>
}
```

### Todos

### 火车票项目

> 用到的第三方包

```
normalize.css
	https://www.npmjs.com/package/normalize.css
```

