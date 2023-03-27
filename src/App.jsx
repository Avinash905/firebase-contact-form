import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    return setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async () => {
    const { name, email, message } = formData;
    if (!name || !email || !message)
      return window.alert("Please fill all the details");
    setLoading(true);
    const data = await axios.post(
      "https://react-form-9730f-default-rtdb.firebaseio.com/contactform.json",
      {
        ...formData,
      }
    );
    setLoading(false);
    if (data.status === 200) return window.alert("Form submitted successfully");
    else return window.alert("Error while submitting");
  };
  return (
    <>
      <section className="contact-form">
        <div className="modal">
          <h1 className="heading">Contact Us</h1>
          <form className="form">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              id="name"
              className="input"
              placeholder="Enter your name"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={inputHandler}
              className="input"
              placeholder="Enter your email address"
            />
            <textarea
              type="text"
              name="message"
              id="message"
              value={formData.message}
              onChange={inputHandler}
              className="input"
              placeholder="Enter your message"
              rows={5}
            ></textarea>
            <input
              type="button"
              value={loading ? "Sending..." : "Submit"}
              className="button"
              onClick={submitHandler}
            />
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
