import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState({ id: null, text: "" });
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleEdit = (id, text) => {
        setEditingTask({ id, text });
        setShowEditModal(true);
    };

    const editTask = () => {
        axios
            .put(`http://localhost:3000/todos/${editingTask.id}`, { task: editingTask.text }) // Update the task text
            .then(() => {
                setShowEditModal(false);
                fetchTodos(); // Fetch updated data from the server
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
                        <FaEdit className="edit-icon" onClick={() => handleEdit(todo.id, todo.task)} />
                        <FaTrash className="delete-icon" onClick={() => deleteTodo(todo.id)} />
                    </li>
                ))}
            </ul>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={editingTask.text}
                        onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={editTask}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
