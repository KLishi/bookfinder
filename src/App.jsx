import {useState} from 'react';
import './App.css';
// required imports from reactstrap
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label, Spinner} from 'reactstrap';
// installed and import toastify for custom notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios
import axios from 'axios';
// import bookcard
import BookCard from './BookCard.jsx';


function App() {
  // setting states for input fields- search, max results and start index
  const [maxResults, setMaxResults]= useState(10);
  const [startIndex, setStartIndex]= useState(1);
  const [query, setQuery]= useState('');
  // setting state for loading
  const [loading, setLoading] = useState(false);
  // state for search result cards
  const [cards,setCards] = useState([]);
  // search button functionality 
  //  google api link customized with axios -get,then,catch[https://www.googleapis.com/books/v1/volumes?q=search+terms]
  const handleSubmit = () => {
    setLoading(true);
    if(maxResults > 10 || maxResults < 1){
    toast.error("Max results must be between 1 and 10")
  } else {
    axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`)
    .then(res =>{
      if(startIndex >= res.data.totalItems || startIndex < 1){
        toast.error(` Start index must be between 1 and ${res.data.totalItems}`);
      }else {
        if(res.data.items.length > 0){
          setCards(res.data.items);
          setLoading(false);
         
        }
      }
    } )
    .catch(err => {setLoading(true);
      toast.error(`${err.response.data.error.message}`)})
  }
}
    
  // to dispaly main background image and input fields
  const mainTheme = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* light-dark filter on top of the image */}
        <div className='filter'> </div>
        {/* title */}
        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2 }}
        >
          Book Finder
        </h1>
        {/* search bar */}
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input placeholder='Search For Books' value={query} onChange ={e => setQuery(e.target.value)}/>

            <InputGroupText>
            {/* added functionality to search button */}
              <Button color='secondary' onClick={handleSubmit}>
                <i className='fas fa-search'></i>
              </Button>
            </InputGroupText>
          </InputGroup>
          {/* max results */}
          <div className='d-flex text-white justify-content-center'>
            <FormGroup className='ml-5'>
              <Label for='maxResults'>Max Results</Label>
              <input
                type='number'
                id='maxResults'
                placeholder='Max Results upto 10'
                value={maxResults} onChange ={e => setMaxResults(e.target.value)}
              />
            </FormGroup>
            {/* start index  */}
            <FormGroup className='ml-5'>
              <Label for='startIndex'>Start Index</Label>
              <input
                type='number'
                id='startIndex'
                placeholder='Start Index'
                value={startIndex} onChange ={e => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };
  // adding spinner and card management
 
  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
         
          <div className='col-lg-4 mb-3' key={item.id}>
            
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };
    return (
    <div className='w-100, h-100'>
      {/* main background image */}
     {mainTheme()}
     {/* adding cards */}
     {handleCards()}
     {/* adding toast container for notifications */}
     <ToastContainer />
    </div>
  );
  }

export default App;
