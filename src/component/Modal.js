import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Player } from 'video-react';
import { API } from '../Config';

export default function MyVerticallyCenteredModal(props) {
    const {url,thumbnail}=props;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          
        </Modal.Header> */}
        <Modal.Body>
        
          <Player  
  playsInline
  autoPlay={true}
  fluid={true}
  poster={`${API}/images/${thumbnail}`}
  src={`${API}/images/${url}`}
/> 
        </Modal.Body>
       
      </Modal>
    );
  }