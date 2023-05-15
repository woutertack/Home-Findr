import "./Input.css";

const Input = ({ type, name, value, onChange, disabled = false }) => {
  return (
    <input
      className="input"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
