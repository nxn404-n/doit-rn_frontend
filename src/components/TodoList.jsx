import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import Todo from "./Todo";

const TodoList = ({ setLoggedIn, setSignUp, loggedIn }) => {
  // This input stores the value of the input box
  const [input, setInput] = useState("");

  // state for storing todos
  const [todos, setTodos] = useState(() => {
    // Lazy intialization in useState to check if there are any todos in localStorage when the component first reneders
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : []; //Checks if savedTodos exists in localStorage or not
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return [];
    }
  });

  // Saving todos in localStorage everytime todos changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  function addTodo() {
    if (input !== "") {
      const newTodo = {
        id: nanoid(), //unique id for todos
        task: input.trim(), //trims any spaces
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  }

  // Delete Todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Toggle completed
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }


  function handleLogOut() {
    setLoggedIn(false)
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    setSignUp(false);
  }

  return (
    <div>
      <h2>To-Do</h2>

      {/* Todo input */}
      <div>
        <input
          type='text'
          className='border-2 border-black'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='border-2 border-black bg-white'
          onClick={() => addTodo()}
        >
          Add todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <Todo
              data={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
            />
          </div>
        ))}
      </div>
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
};
TodoList.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setSignUp: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,

};

export default TodoList;