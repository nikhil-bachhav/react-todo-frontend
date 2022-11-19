import Form from "react-bootstrap/Form";
import Button from "../ui/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const ModalComponent = ({ handleClose, show, editTodo, handleUpdate }) => {
  const [title, setTitle] = useState(editTodo.title);

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleUpdate(editTodo._id, title);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
