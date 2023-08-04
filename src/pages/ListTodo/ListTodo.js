import React from "react";
import "./ListTodo.css";
import { IconDelete } from "../Todo/icon";
function ListTodo({ data, onToggleCompleted, completed, deleteTodo }) {
  const isActive = data.completed ? "active-text" : "";
  const valueCheckBox = () => {
    onToggleCompleted(data.id);
  };
  const handleRemove = () => {
    deleteTodo(data.id);
  };
  return (
    <form>
      <div className="list-todo-item">
        <input
          type="checkbox"
          checked={data.completed}
          name="todo"
          onChange={valueCheckBox}
        />
        <p className={`list-todo-text ${isActive}`}>{data.name}</p>
        {completed && (
          <div className="icon-delete" onClick={handleRemove}>
            <IconDelete />
          </div>
        )}
      </div>
    </form>
  );
}

export default ListTodo;
