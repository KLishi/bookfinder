import './App.css';
// required imports from reactstrap
import { InputGroup, Input, InputGroupText, Button, FormGroup, Label} from 'reactstrap';


function App() {
  // to dispaly main background image
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
            <Input placeholder='Search For Books' />

            <InputGroupText>
              <Button color='secondary'>
                <i className='fas fa-search'></i>
              </Button>
            </InputGroupText>
          </InputGroup>
          {/* max results */}
          <div className='d-flex text-white justify-content-center'>
            <FormGroup className='ml-5'>
              <Label for='maxResults'></Label>
              <input type='number' id='maxResults' placeholder='Max Results upto 10' />
            </FormGroup>

          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* main background image */}
     {mainTheme()}
    </div>
  );
}

export default App;
