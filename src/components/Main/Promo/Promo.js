import './Promo.css';
import web from '../../../images/promo-image.svg';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__text'>
        <h1 className='promo__heading'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className='promo__paragraph'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
      </div>
      <img className='promo__image' src={web} alt='Вэб' />
      <a className='promo__more' href='#about-project'>
        Узнать больше
      </a>
    </section>
  );
}
