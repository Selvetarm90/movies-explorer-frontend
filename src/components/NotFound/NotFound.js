import { useHistory } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const handleClick = () => {
    history.goBack();
  };
  const history = useHistory();
  return (
    <div className='not-found'>
      <h2 className='not-found__error'>404</h2>
      <p className='not-found__paragraph'>Страница не найдена</p>
      <button type='button' className='not-found__link' onClick={handleClick}>
        Назад
      </button>
    </div>
  );
}
