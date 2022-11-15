import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "./ui/Button";
import { useRef, useState } from "react";

const AddTodo = ({ setTodos }) => {
  const [addTodo, setAddTodo] = useState("");
  const todoRef = useRef();

  const addTodoHandler = () => {
    setTodos((prev) => [...prev, { title: addTodo, completed: false }]);
  };

  const todoChangeHandler = () => {
    setAddTodo(todoRef.current.value);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Add Todo"
        aria-label="Add Todo"
        aria-describedby="basic-addon2"
        ref={todoRef}
        value={addTodo}
        onChange={todoChangeHandler}
      />
      <Button
        onClick={addTodoHandler}
        variant="outline-primary"
        id="button-addon2"
      >
        Add
      </Button>
    </InputGroup>
  );
};

export default AddTodo;
