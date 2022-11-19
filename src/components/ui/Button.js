import ReactButton from "react-bootstrap/Button";

const Button = (props) => {
  return (
    <ReactButton
      className={props.className}
      onClick={props.onClick}
      variant={props.variant}
      style={props.style}
    >
      {props.children}
    </ReactButton>
  );
};

export default Button;
