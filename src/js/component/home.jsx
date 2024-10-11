import React, { useState } from "react";

const Home = () => {
	const [todo, setTodo] = useState([]);
	const [aux, setAux] = useState("");

	const eliminarTarea = (index) => {
		const nuevasTareas = todo.filter((elemento, i) => i !== index);
		setTodo(nuevasTareas);
	};

	return (
		<div className="text-center bg-light" style={{ height: "550px" }}>
			<h1 className="text-center mt-5 text-muted">t o d o s</h1>
			<br />
			<div className="container list-group">
				<input
					type="text"
					className="list-group-item" value={aux} placeholder="What needs to be done?"
					onChange={(e) => setAux(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && aux.trim() !== "") {
							setTodo([...todo, aux]);
							setAux("");
						}
					}}
				/>
				<ul className="list-group-item list-unstyled">
					{todo.length === 0 ? (<li className="todo-item">There are no current tasks</li>) :
						(todo.map((task, index) => (<li className="todo-item" key={index}>{task}
							<button className="btn d-btn btn-sm float-end" onClick={() => eliminarTarea(index)}>X</button>
						</li>)))}
					<li className="todo-item">
						{todo.length} tasks left
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
