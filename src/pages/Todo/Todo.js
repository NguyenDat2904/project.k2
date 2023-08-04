import React, { useState } from "react";
import "./Todo.css";

function Todo({ handleAdd }) {
  const [valueTask, setValueTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueTask !== "") {
      handleAdd(valueTask);
      setValueTask("");
    }
  };
  const handleValueTask = (e) => {
    setValueTask(e.target.value);
  };
  return (
    <div className="todo-list">
      <div className="add-item">
        <form action="" className="form-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={valueTask}
            onChange={handleValueTask}
            placeholder="add details"
            className="value-add"
          />
          <button type="submit" className="btn-add">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Todo;
