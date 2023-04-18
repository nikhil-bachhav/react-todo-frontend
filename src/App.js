import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import List from "./components/List";
import axios from "axios";
import ModalComponent from "./components/ui/Modal";
import PaginationBasic from "./components/ui/Pagination";
import { InfinitySpin } from "react-loader-spinner";
import { constants } from "./config";

function App() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editTodo, setEditTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalIems, setTotalItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleShow = (todo) => {
    setEditTodo(todo);
    setShow(true);
  };

  const getTodos = (page) => {
    setIsLoading(true);
    axios
      .get(constants.API_BASE_URL + "todo/" + page)
      .then(function (response) {
        console.log(response);
        setTodos(response.data[0].paginatedResult);
        setTotalItems(response.data[0].totalCount[0].totalCount);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleUpdate = (id, title) => {
    const updatedTodos = todos.map((todo, i) =>
      todo._id === id ? { ...todo, title: title } : todo
    );
    axios
      .put(
        constants.API_BASE_URL + "todo/" + id,
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
    getTodos(page);
  }, [currentPage]);

  useEffect(() => {}, [totalIems]);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Todo App</h1>
      <AddTodo setTodos={setTodos} />
      {isLoading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginRight: "5%" }}
        >
          <InfinitySpin width="100" color="#0b5ed7" />
        </div>
      ) : (
        <List
          todos={todos}
          setTodos={setTodos}
          handleClose={handleClose}
          handleShow={handleShow}
          setEditTodo={setEditTodo}
        />
      )}
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
