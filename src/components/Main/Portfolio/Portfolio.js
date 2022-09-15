import './Portfolio.css';
import arrow from '../../../images/link-arrow.svg';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__heading'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Статичный сайт</p>
          <a href='#'><img src={arrow} alt='Ссылка' /></a>
        </li>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Адаптивный сайт</p>
          <a href='#'><img src={arrow} alt='Ссылка' /></a>
        </li>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Одностраничное приложение</p>
          <a href='#'><img src={arrow} alt='Ссылка' /></a>
        </li>
      </ul>
    </section>
  );
}
