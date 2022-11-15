import ListGroup from "react-bootstrap/ListGroup";
import Button from "./ui/Button";

const List = ({ todos, setTodos }) => {
  const deleteTodoHandler = (index) => {
    let updatedTodos = todos.filter((todo, i) => {
      return todo !== todos[index];
    });
    setTodos(updatedTodos);
  };
  const completeTodoHandler = (index) => {
    const updatedTodos = todos.map((x, i) =>
      i === index ? { ...x, completed: !x.completed } : x
    );

    setTodos(updatedTodos);
  };
  return (
    <ListGroup>
      {todos.map((todo, index) => {
        return (
          <ListGroup.Item
            key={index}
            style={{ border: todo.completed ? "1px solid green" : "" }}
          >
            {todo.title}
            <Button
              onClick={() => completeTodoHandler(index)}
              className="float-end"
              varient="outline-success"
            >
              Completed
            </Button>
            <Button
              onClick={() => deleteTodoHandler(index)}
              className="float-end"
              varient="outline-danger"
            >
              Delete
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default List;
