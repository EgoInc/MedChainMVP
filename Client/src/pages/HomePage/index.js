import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Перед началом работы изучите структуру папок и правила в README</h3>
      <button onClick={() => navigate('/example')}>Открыть пример</button>
    </div>
  );
}

export default HomePage;
