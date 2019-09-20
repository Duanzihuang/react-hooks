import React from 'react';
import UseState from './hooks/UseState'
import UseEffect from './hooks/UseEffect'
import UseContext from './hooks/UseContext'
import UseMemo from './hooks/UseMemo'
import Todos from './todos/Index'
import SelfCount from './hooks/SelfHook'

function App() {
  return (
    <div className="App">
      {/* <UseState /> */}
      {/* <UseEffect /> */}
      {/* <UseContext /> */}
      {/* <UseMemo /> */}
      {/* <Todos /> */}
      <SelfCount />
    </div>
  );
}

export default App;
