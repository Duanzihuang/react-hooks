import React, { useState, useEffect, useCallback, useRef, memo } from "react";

import "./Index.css";

let idSeq = Date.now();
let LS_KEY = "_TODOS_";

const Control = memo(function Control(props) {
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();

    idSeq++;

    const text = inputRef.current.value.trim();

    if (text.length !== 0) {
      props.addTodo({
        id: idSeq,
        text,
        complete: false
      });
    }

    inputRef.current.value = "";
  };

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="what needs to be done?"
        />
      </form>
    </div>
  );
});

const Todos = memo(function Todos(props) {
  const onChange = id => {
    props.toggleTodo(id);
  };

  return (
    <ul className="todos">
      {props.todos.map(item => {
        return (
          <li className="todo-item" key={item.id}>
            <input
              type="checkbox"
              checked={item.complete}
              onChange={() => onChange(item.id)}
            />
            <label className={item.complete ? "complete" : ""}>
              {item.text}
            </label>
            <button onClick={() => props.removeTodo(item.id)}>&#xd7;</button>
          </li>
        );
      })}
    </ul>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);

  // http://www.visa-promotions.com/mepa/HiltonHHomors/form.html

  // 希尔顿 1170665218

  // const addTodo = useCallback(todo => {
  //   setTodos([...todos, todo]);
  // });
  const addTodo = useCallback(todo => {
    setTodos(todos => [...todos, todo]);
  }, []);

  const removeTodo = useCallback(id => {
    setTodos(todos => todos.filter(item => item.id !== id));
  }, []);

  const toggleTodo = useCallback(id => {
    setTodos(todos =>
      todos.map(item => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete
          };
        } else {
          return { ...item };
        }
      })
    );
  }, []);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

    setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default TodoList;
