import ReactButton from "react-bootstrap/Button";

const Button = (props) => {
  return (
    <ReactButton
      className={props.className}
      onClick={props.onClick}
      variant={props.varient}
      style={{ marginRight: "5px" }}
    >
      {props.children}
    </ReactButton>
  );
};

export default Button;
