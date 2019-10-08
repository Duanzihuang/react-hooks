import React from 'react';
import UseState from './hooks/UseState'
import UseEffect from './hooks/UseEffect'
import UseContext from './hooks/UseContext'
import UseMemo from './hooks/UseMemo'
import Todos from './todos/Index'
import SelfCount from './hooks/SelfHook'
import SelfCount2 from './hooks/SelfHook2'
import UseLayoutEffect from './hooks/UseLayoutEffect'
import UseReducer from './hooks/UseReducer'
import UseRef from './hooks/UseRef'

function App() {
  return (
    <div className="App">
      {/* <UseState /> */}
      {/* <UseEffect /> */}
      {/* <UseContext /> */}
      {/* <UseMemo /> */}
      {/* <Todos /> */}
      {/* <SelfCount /> */}
      {/* <SelfCount2 /> */}
      <UseLayoutEffect />
      {/* <UseReducer /> */}
      {/* <UseRef /> */}
    </div>
  );
}

export default App;
