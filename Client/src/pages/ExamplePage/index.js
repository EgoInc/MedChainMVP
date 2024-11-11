import Header from '../../features/Header';
import './index.css';

function ExamplePage() {
  return (
    <div>
      <Header />
      <h5>Пример страницы</h5>
      <div className='examplePage_container'>
        {/* их тоже можно было вынести в отдельную папку в features */}
        <div className='components_container'>Другие компоненты</div>
        <div className='components_container'>Другие компоненты</div>
        <div className='components_container'>Другие компоненты</div>
      </div>
    </div>
  );
}

export default ExamplePage;
