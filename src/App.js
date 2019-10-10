import React from 'react';
import UseState from './hooks/UseState'
import UseEffect from './hooks/UseEffect'
import UseContext from './hooks/UseContext'
import UseCallback from './hooks/UseCallback'
import UseMemo from './hooks/UseMemo'
import Todos from './todos/Index'
import SelfCount from './hooks/SelfHook'
import SelfCount2 from './hooks/SelfHook2'
import UseLayoutEffect from './hooks/UseLayoutEffect'
import UseReducer from './hooks/UseReducer'
import UseRef from './hooks/UseRef'
import Demo1 from './hooks/SearchDemo/Demo1'
import Demo2 from './hooks/SearchDemo/Demo2'

function App() {
  return (
    <div className="App">
      {/* <UseState /> */}
      {/* <UseEffect /> */}
      {/* <UseContext /> */}
      <UseCallback />
      {/* <UseMemo /> */}
      {/* <Todos /> */}
      {/* <SelfCount /> */}
      {/* <SelfCount2 /> */}
      {/* <UseLayoutEffect /> */}
      {/* <UseReducer /> */}
      {/* <UseRef /> */}
      {/* <Demo1 /> */}
      {/* <Demo2 /> */}
    </div>
  );
}

export default App;
