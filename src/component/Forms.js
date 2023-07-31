import React, { useState } from "react";
import { Button, Offcanvas, Col, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import { VIDEO_API } from "../Config";
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = io.connect('http://localhost:5000'); 

export default function Forms() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [tittle, settiitle] = useState("");
  const [File, setFile] = useState();
  const [thumbnail, setthumbnail] = useState();

  const handleClose = () => {
    setValidated(false);
    settiitle("");
    setFile();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  //   onchange
  const file_thumbnail_onchange = (e) => {
    const image = e.target.files[0];
    setthumbnail(image);
   
  };
  const file_onchange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", tittle);
        formData.append("thumbnail", thumbnail);
        formData.append("video_path", File);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
           
        const Result = await axios.post(VIDEO_API, formData, config);
        console.log("ccccc", Result);
        if (Result.data.statuscode == 200) {
          toast.success(`${Result.data.msg}`, {
            position: toast.POSITION.TOP_RIGHT
        });
          handleClose();
          setTimeout(()=>{
            window.location.reload();
          },2000)
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="mb-5 mt-5">
      <Button variant="primary" onClick={handleShow}>
      Add New  Videos
      </Button>
      <ToastContainer />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        name={"Disable backdrop"}
        scroll={false}
        backdrop={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New  Videos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Video Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter The Tittle"
                  required
                  onChange={(e) => {
                    settiitle(e.target.value);
                  }}
                  value={tittle}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Tittle.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Video thumbnail </Form.Label>
                <Form.Control
                  type="file"
                  placeholder="State"
                  required
                  onChange={file_thumbnail_onchange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid file.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Video file</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="State"
                  required
                  onChange={file_onchange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid file.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">Submit form</Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
