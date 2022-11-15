import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import List from "./components/List";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([]);
  }, []);

  return (
    <div className="container mt-5">
      <AddTodo setTodos={setTodos} />
      <List todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
