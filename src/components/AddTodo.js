import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "./ui/Button";
import { useRef, useState } from "react";
import axios from "axios";

const AddTodo = ({ setTodos }) => {
  const [addTodo, setAddTodo] = useState("");
  const todoRef = useRef();

  const addTodoHandler = () => {
    let data = {
      title: addTodo,
      completed: false,
    };

    axios
      .post(
        "https://react-todo-backend-production.up.railway.app/api/todo",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setTodos((prev) => [
          ...prev,
          {
            _id: response.data._id,
            title: response.data.title,
            completed: response.data.completed,
          },
        ]);
      })
      .catch((error) => {});
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
        varient="outline-primary"
        id="button-addon2"
      >
        Add
      </Button>
    </InputGroup>
  );
};

export default AddTodo;
