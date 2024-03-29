import React, {useState} from 'react'
// import card features
import {Card, CardTitle, CardImg, CardBody, Modal, Button } from 'reactstrap';

const BookCard = ({
    thumbnail,
    title,
    authors,
    description,
    pageCount,
    language,
    publisher,
    previewLink,
    infoLink



}) => {
    // states
    const[modal,setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
      <Card style={{ width: '233 px' }} className='m-auto '>
        <CardImg
          top
          style={{ width: '100%', height: '233px' }}
          src={thumbnail}
          alt={title}
        />
        <CardBody>
          <CardTitle className='card-title'>{title}</CardTitle>
          <Button onClick={toggle}>More Info</Button>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle}>
          <div className='modal-header d-flex justify-content-center'>
            <h5 className='modal-title text-center' id='exampleModalLabel'>
              {title}
            </h5>
            <button
              aria-label='close'
              className='close'
              type='button'
              onClick={toggle}
            >
              <span aria-hidden={true}>x</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='d-flex justify-content-between ml-3'>
              <img src={thumbnail} alt={title} style={{ height: '233px' }} />
              <div>
                <p>Authors:{authors}</p>
                <p>Publisher:{publisher}</p>
                <p>Page Count:{pageCount}</p>
                <p>Language:{language}</p>
              </div>
            </div>
            <div className='mt-3'>{description}</div>
          </div>
          <div className='modal-footer'>
            <div className='left-silde'>
              <a
                href={previewLink}
                className='btn-link'
                color='default'
                type='button'
                target='_blank'
                rel='noopener noreferre'
              >
                Preview Link
              </a>
            </div>
            <div className='divider'>
              <div className='right-silde'>
                <a
                  href={infoLink}
                  className='btn-link'
                  color='default'
                  type='button'
                  target='_blank'
                  rel='noopener noreferre'
                >
                  Info Link
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </Card>
    );
}

export default BookCard;


