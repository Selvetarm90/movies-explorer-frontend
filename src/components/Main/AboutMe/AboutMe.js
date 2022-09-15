import './AboutMe.css';
import photo from '../../../images/photo.jpg';
import Heading from '../Heading/Heading';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <Heading text='Студент' />
      <img className='about-me__photo' src={photo} alt='фото' />
      <div className='about-me__content'>
        <h3 className='about-me__name'>Алексей</h3>
        <p className='about-me__profession'>Фронтенд-разработчик, 31 год</p>
        <p className='about-me__description'>
          Живу в г. Ульяновск, родом из маленькой деревни в области. Закончил
          УлГТУ, специальность инженер-радиотехник. Работаю по специальности 10
          лет. После выплаты ипотеки появилась возможность исполнить мечту, к
          которой давно стремлюсь - выучиться на IT специальность. И вот курс
          почти пройден, это мой дипломный проект. Есть жена и дочь, и огромное
          желание развиваться в данном направлении!{' '}
        </p>
        <a
          className='about-me__link'
          href='https://github.com/Selvetarm90?tab=repositories'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </div>
    </section>
  );
}
