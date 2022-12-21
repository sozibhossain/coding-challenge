import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SaveData from './Pages/SaveData/SaveData';
import AddSectors from './Pages/AddSectors/AddSectors';
import Sectors from './Pages/Sectors/Sectors';

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
