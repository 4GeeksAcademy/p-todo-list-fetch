import React, { useState, useEffect } from "react";

const Home = () => {

	const [todos, setTodos] = useState([]);
	const [aux, setAux] = useState("");

	const fetchTodos = () => {
		fetch(`https://playground.4geeks.com/todo/users/dimatto404`)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				setTodos(data.todos);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	function agregarTarea(nuevaTarea) {
		const Tarea = {
			label: nuevaTarea,
			is_done: false
		};
		fetch(`https://playground.4geeks.com/todo/todos/dimatto404`, {
			method: "POST",
			body: JSON.stringify(Tarea),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then(() => {
				fetchTodos();
			})
			.catch((error) => console.error(error));
	}

	function eliminarTarea(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((data) => {
				console.log(data);
				fetchTodos();
			})
			.catch((error) => console.error(error));
	}

	function eliminarTodasLasTareas() {
		todos.forEach((todo) => eliminarTarea(todo.id));
	}

	return (
		<div className="text-center bg-light" style={{ height: "550px" }}>
			<h1 className="text-center mt-5 text-muted">t o d o s</h1>
			<button className="btn btn-secondary m-3 " onClick={eliminarTodasLasTareas}>
				All is done!
			</button>
			<br />
			<div className="container list-group">
				<input
					type="text"
					className="list-group-item"
					value={aux}
					placeholder="What needs to be done?"
					onChange={(e) => setAux(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && aux.trim() !== "") {
							agregarTarea(aux);
							setAux("");
						}
					}}
				/>
				<ul className="list-group-item list-unstyled">
					{todos.length === 0 ? (<li className="todo-item">There are no current tasks</li>) :
						(todos.map((todo, index) => (
							<li className="todo-item" key={index}>
								{todo.label}
								<button className="btn d-btn btn-sm float-end" onClick={() => eliminarTarea(todo.id)}>X</button>
							</li>
						)))}
					<li className="todo-item">
						{todos.length} tasks left
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
