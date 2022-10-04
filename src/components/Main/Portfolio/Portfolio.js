import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__heading'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Статичный сайт</p>
          <a
            href='https://github.com/Selvetarm90/how-to-learn'
            target='_blank'
            rel='noreferrer'
            className='portfolio__link-arrow'
          />
        </li>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Адаптивный сайт</p>
          <a
            href='https://github.com/Selvetarm90/russian-travel'
            target='_blank'
            rel='noreferrer'
            className='portfolio__link-arrow'
          />
        </li>
        <li className='portfolio__link'>
          <p className='portfolio__link-name'>Одностраничное приложение</p>
          <a
            href='https://github.com/Selvetarm90/react-mesto-api-full'
            target='_blank'
            rel='noreferrer'
            className='portfolio__link-arrow'
          />
        </li>
      </ul>
    </section>
  );
}
