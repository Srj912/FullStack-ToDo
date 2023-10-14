import React, { useEffect, useState } from "react";
import axios from "axios";

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get("http://localhost:3000/todos").then((response) => {
            setTodos(response.data);
        });
    };

    const addTodo = () => {
        if (newTask) {
            axios
                .post("http://localhost:3000/todos", { task: newTask })
                .then(() => {
                    setNewTask("");
                    fetchTodos();
                })
                .catch((err) => console.log(err));
        }
    };

    const toggleComplete = (id, completed) => {
        axios
            .put(`http://localhost:3000/todos/${id}`, { completed: !completed })
            .then(() => {
                fetchTodos();
            })
            .catch((err) => console.log(err));
    };

    const deleteTodo = (id) => {
        axios
            .delete(`http://localhost:3000/todos/${id}`)
            .then(() => {
                fetchTodos();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>To-Do App</h2>
            <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                            onClick={() => toggleComplete(todo.id, todo.completed)}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

