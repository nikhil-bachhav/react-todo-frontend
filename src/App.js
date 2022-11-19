import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import List from "./components/List";
import axios from "axios";
import ModalComponent from "./components/ui/Modal";
import PaginationBasic from "./components/ui/Pagination";

function App() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editTodo, setEditTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalIems, setTotalItems] = useState(null);
  const handleShow = (todo) => {
    setEditTodo(todo);
    setShow(true);
  };

  const getTodos = (page) => {
    axios
      .get("http://localhost:8080/api/todo/" + page)
      .then(function (response) {
        setTodos(response.data[0].paginatedResult);
        setTotalItems(response.data[0].totalCount[0].totalCount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdate = (id, title) => {
    const updatedTodos = todos.map((todo, i) =>
      todo._id === id ? { ...todo, title: title } : todo
    );
    axios
      .put(
        "http://localhost:8080/api/todo/" + id,
        { title: title },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setTodos([...updatedTodos]);
        setShow(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    let page = parseInt(currentPage);
    console.log(page);
    getTodos(page);
  }, [currentPage]);

  useEffect(() => {}, [totalIems]);

  return (
    <div className="container mt-5">
      <AddTodo setTodos={setTodos} />
      <List
        todos={todos}
        setTodos={setTodos}
        handleClose={handleClose}
        handleShow={handleShow}
        setEditTodo={setEditTodo}
      />
      {show && (
        <ModalComponent
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          editTodo={editTodo}
          handleUpdate={handleUpdate}
        />
      )}
      {totalIems && (
        <PaginationBasic
          page={currentPage}
          setCurrentPage={setCurrentPage}
          todos={todos}
          totalIems={totalIems}
        />
      )}
    </div>
  );
}

export default App;
