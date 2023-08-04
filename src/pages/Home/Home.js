import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import Todo from "../Todo/Todo";
import ListTodo from "../ListTodo/ListTodo";

function Home() {
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [dataTask, setDataTask] = useState([]);
  const [dataTaskDone, setDataTaskDone] = useState([]);
  const [dataTaskComple, setDataTaskComple] = useState([]);
  const handleAdd = (todo) => {
    const newTodo = {
      id: Date.now(),
      name: todo,
      completed: false,
    };

    setDataTask([...dataTask, newTodo]);
    const completedTodosNot = dataTask.filter((todo) => !todo.completed);
    setDataTaskComple([...completedTodosNot, newTodo]);
    localStorage.setItem("data", JSON.stringify([...dataTask, newTodo]));
    localStorage.setItem("dataNot", JSON.stringify([...dataTask, newTodo]));
  };
  const handleToggleCompleted = (id) => {
    const newTodos = dataTask.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setDataTask(newTodos);
    localStorage.setItem("data", JSON.stringify(newTodos));
    const completedTodos = newTodos.filter((todo) => todo.completed);
    const completedTodosNot = newTodos.filter((todo) => !todo.completed);

    localStorage.setItem("dataDone", JSON.stringify(completedTodos));
    localStorage.setItem("dataNot", JSON.stringify(completedTodosNot));

    setDataTaskDone(completedTodos);
    setDataTaskComple(completedTodosNot);
  };
  const deleteTodo = (id) => {
    const updatedTodos = dataTaskDone.filter((todo) => todo.id !== id);
    const updatedTodosAll = dataTask.filter((todo) => todo.id !== id);

    setDataTaskDone(updatedTodos);
    setDataTask(updatedTodosAll);

    localStorage.setItem("dataDone", JSON.stringify(updatedTodos));
    localStorage.setItem("data", JSON.stringify(updatedTodosAll));
  };
  const handleDeleteAll = () => {
    const completedTodosNot = dataTaskDone.filter((todo) => !todo.completed);
    const completedTodos = dataTask.filter((todo) => !todo.completed);

    setDataTask(completedTodos);
    setDataTaskDone(completedTodosNot);
    localStorage.setItem("dataDone", JSON.stringify(completedTodosNot));
    localStorage.setItem("data", JSON.stringify(completedTodos));
  };
  const loadTodo = () => {
    const storedTodos = localStorage.getItem("data");
    const storedTodosDone = localStorage.getItem("dataDone");
    const storedTodosNot = localStorage.getItem("dataNot");
    if (storedTodos) {
      setDataTask(JSON.parse(storedTodos));
      setDataTaskDone(JSON.parse(storedTodosDone));
      setDataTaskComple(JSON.parse(storedTodosNot));
    }
  };
  useEffect(() => {
    loadTodo();
  }, []);
  const renderListTodo = dataTask?.map((item, index) => {
    return (
      <ListTodo
        key={index}
        data={item}
        onToggleCompleted={handleToggleCompleted}
      />
    );
  });
  const renderListActive = dataTaskComple?.map((item, index) => {
    return (
      <ListTodo
        key={index}
        data={item}
        onToggleCompleted={handleToggleCompleted}
      />
    );
  });
  const renderListComple = dataTaskDone?.map((item, index) => {
    return (
      <ListTodo
        key={index}
        data={item}
        onToggleCompleted={handleToggleCompleted}
        completed={completed}
        deleteTodo={deleteTodo}
      />
    );
  });
  return (
    <div className="wrapper">
      <Header
        setAll={setAll}
        setActive={setActive}
        setCompleted={setCompleted}
      />
      {(all || active) && <Todo handleAdd={handleAdd} />}
      {all && <div className="repeat-list">{renderListTodo}</div>}
      {active && <div className="repeat-list">{renderListActive}</div>}
      {completed && <div className="repeat-list">{renderListComple}</div>}
      {completed && (
        <button className="icon-delete-all" onClick={handleDeleteAll}>
          Xóa tất cả
        </button>
      )}
    </div>
  );
}

export default Home;
