import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
    </BrowserRouter>
  );
}

export default App;
