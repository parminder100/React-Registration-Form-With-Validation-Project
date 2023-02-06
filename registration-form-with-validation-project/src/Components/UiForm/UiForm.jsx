import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState} from "react";
import "../UiForm/UiForm.css";

const UiForm = () => {
  const [userregistration, setUserregistration] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [record, setRecord] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [formerror, setFormError] = useState(userregistration);
  const [successmessage, setSuccessmessage] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserregistration({ ...userregistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newrecord = {
      ...userregistration,
      id: new Date().getTime().toString(),
    };
    setSubmitted(true);
    if(submitted === true){
      setRecord([...record, newrecord]);
      setSuccessmessage(true);
    }
    else{
      setFormError(validate(userregistration));
    }
    setUserregistration({ firstname: "", lastname: "", email: "" });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "First Name is Required";
    }
    if (!values.lastname) {
      errors.lastname = "Last Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    }
    return errors;
  };
  return (
    <>
        {/* {Object.keys(formerror).length === 0 && successmessage ? (<p className="success-message alert-success">Successfully registered</p>) : ("")} */}
        {successmessage ? (<p className="success-message alert-success">Successfully registered</p>): ("")}
        <Form onSubmit={handleSubmit} className="form-content">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
                name="firstname"
                value={userregistration.firstname}
                onChange={handleInput}
                type="text"
                placeholder="Enter First Name"
            />
            <p className="error-message">{formerror.firstname}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                name="lastname"
                value={userregistration.lastname}
                onChange={handleInput}
                type="text"
                placeholder="Enter Last Name"
            />
            <p className="error-message">{formerror.lastname}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                name="email"
                value={userregistration.email}
                onChange={handleInput}
                type="email"
                placeholder="Enter Email"
            />
            <p className="error-message">{formerror.email}</p>
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        <div style={{display: record.length === 0 ? "none" : "block"}}  className="form-data-content">
            <div className="form-data">
                {record.map((e) => {
                    return (
                    <>
                        <p>{e.firstname}</p>
                        <p>{e.lastname}</p>
                        <p>{e.email}</p>
                    </>
                    );
                })}
            </div>
        </div>
    </>
  );
};
export default UiForm;
