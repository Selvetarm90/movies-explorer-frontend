import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__paragraph'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className='footer__year'>© 2022</p>
      <ul className='footer__links'>
        <li className='footer__link'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
        </li>
        <li>
          <a
            className='footer__link'
            href='https://github.com/Selvetarm90?tab=repositories'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </li>
      </ul>
    </footer>
  );
}
