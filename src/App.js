import logo from './logo.svg';
import './App.css';
import Sectors from './Pages/Sectors/Sectors';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SaveData from './Pages/SaveData/SaveData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sectors>
          <Routes>
            <Route path="/" element={<SaveData/>} />
          </Routes>
      </Sectors>
    </BrowserRouter>
    </div>
  );
}

export default App;
