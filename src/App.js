import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = useState("Yarcx");
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const changeName = (name) => setName(name);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setisSubmit(false);
    setFormError(validate(formValues));
    isSubmit && alert("finally your forom is submitted");
  };

  useEffect(() => {
    Object.keys(formError).length > 0 ? setisSubmit(false) : setisSubmit(true);
  }, [formError]);

  const validate = (values) => {
    let error = {};
    if (!values.username) {
      error.username = "Username cant be empty";
    }
    if (!values.password) {
      error.password = "Password cant be empty";
    }
    if (values.password.length < 4) {
      error.password = "Password cant be less than 4 characters";
    }
    if (values.password.length > 8) {
      error.password = "Password cant be greater than 8 characters";
    }
    return error;
  };

  return (
    <div className="App">
      <h1>Hello {name}</h1>
      <Child changeName={changeName} />
      <pre>{JSON.stringify(formValues, undefined, 3)}</pre>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        {formError.username && (
          <p style={{ color: "red" }}>{formError.username}</p>
        )}
        <br />
        <label>Password</label>
        <input
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {formError.password && (
          <p style={{ color: "red" }}>{formError.password}</p>
        )}
        <br />
        <button>Click to Login</button>
      </form>
    </div>
  );
}

const Child = ({ changeName }) => (
  <div>
    <h1>Child</h1>
    <button onClick={() => changeName("Young Don")}>Change Name</button>
  </div>
);
