import { Col, Container, Row } from "react-bootstrap";
import {useSignupUserMutation} from '../services/appApi'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './Signup.css';
import { Link, useNavigate } from "react-router-dom";
import bot from '../assets/bot.avif';
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupUser, {isLoading, error}] = useSignupUserMutation()
  const navigate = useNavigate();

  // Image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("Max file size is 1MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'd4kqp4j5'); // Correct parameter name  

    try {
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/drq2hnezo/image/upload', {
        method: 'post',
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (e) {
      setUploadingImg(false);
      console.log(e);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert('Please upload a profile picture');
    const url = await uploadImage(image);
    console.log(url);
    //singup thr user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
          console.log(data);
          navigate('/chat')
      }
  });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
              <h1 className="text-center">Create Account</h1>
              <div className="signup-profile-pic__container">
                <img src={imagePreview || bot} className="signup-profile-pic" alt="Profile" />
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
              </div>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <Form.Text className="text-muted">
                  Well never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {uploadingImg ? 'signing up...':'Signup'}
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
