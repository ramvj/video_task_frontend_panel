import React, { useState, useEffect } from "react";
import { API } from "../Config/index";
import { Col, Row, Card } from "react-bootstrap";
import {socket}from '../socket'
import Modal from "./Modal";

export default function VideoList(props) {
  const [data, setdata] = useState();
  const [singledata, setsingledata] = useState();
  const [modalShow, setModalShow] = React.useState(false);
    useEffect(() => {
    getAlldata();
  }, []);

  const getAlldata = () => {
    socket.on("video_getdata", (messages) => {
      setdata(messages);
    });
  };
  const show_videopopup = (id) => {
    socket.emit("single_video", id ? id : null);
    socket.on("video_get_single_data", (messages) => {
      setsingledata(messages);
    });
    setModalShow(true);
  };
  return (
    <div>
      <Row className="mb-3">
        {data &&
          data.map((items) => (
            <Col md={4} key={items._id} className="mb-3">
              <Card onClick={() => show_videopopup(items._id)} className="h-100 cursor">
                <Card.Img
                  variant="top"
                  src={`${API}/images/${items.thumbnail}`}
                  className="img"
                />
                <Card.Body>
                  <Card.Text>
                    <b> {items.title} </b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal
        url={singledata?.video_path}
        thumbnail={singledata?.thumbnail}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
