import ListGroup from "react-bootstrap/ListGroup";
import Button from "./ui/Button";
import axios from "axios";
import "../list.css";

const List = ({ todos, setTodos, handleShow }) => {
  const deleteTodoHandler = (id) => {
    let updatedTodos = todos.filter((todo, i) => {
      return todo._id !== id;
    });
    axios
      .delete(
        "https://react-todo-backend-production.up.railway.app/api/todo/" + id,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setTodos(updatedTodos);
      })
      .catch((error) => {});
  };
  const completeTodoHandler = (id) => {
    const updatedTodos = todos.map((todo, i) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const selectedTodo = todos.filter((todo, i) => {
      return todo._id === id;
    });
    axios
      .put(
        "https://react-todo-backend-production.up.railway.app/api/todo/" + id,
        { completed: !selectedTodo[0].completed },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setTodos([...updatedTodos]);
      })
      .catch((error) => {});
  };
  return (
    <ListGroup style={{ height: "320px" }}>
      {todos.map((todo, index) => {
        return (
          <ListGroup.Item
            key={index}
            style={{
              border: todo.completed ? "1px solid green" : "1px solid orange",
              marginBottom: "5px",
            }}
          >
            {todo.title}
            <Button
              onClick={() => completeTodoHandler(todo._id)}
              className="float-end action-btn completed-btn"
              variant={`${
                todo.completed ? "outline-success" : "outline-primary"
              } `}
              style={{ marginLeft: "5px" }}
            >
              {todo.completed ? "Completed" : "Mark as done"}
            </Button>
            <Button
              onClick={() => deleteTodoHandler(todo._id)}
              className="float-end action-btn"
              variant="outline-danger"
              style={{ marginLeft: "5px" }}
            >
              Delete
            </Button>
            <Button
              variant="outline-warning"
              className="float-end action-btn"
              onClick={() => handleShow({ _id: todo._id, title: todo.title })}
              style={{ width: "60px", marginLeft: "5px" }}
            >
              Edit
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default List;
