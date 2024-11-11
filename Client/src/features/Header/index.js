import { useNavigate } from 'react-router-dom';
import './index.css'

function Header() {
  const navigate = useNavigate();

  return (
    <div className='header_mainContainer'>
      <h3>MedChain</h3>
      <button onClick={() => navigate('/')}>Вернуться домой</button>
    </div>
  );
}

export default Header;
