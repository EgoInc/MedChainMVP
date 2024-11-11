import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExamplePage from './pages/ExamplePage';
import HomePage from './pages/HomePage';

function App() {  
  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/example' element={<ExamplePage />}/>
        </Routes>
    </div>
  );
}

export default App;
