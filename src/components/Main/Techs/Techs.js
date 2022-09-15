import './Techs.css';
import Heading from '../Heading/Heading';

export default function Techs() {
  return (
    <section className='techs'>
      <Heading text='Технологии' />
      <h3 className='techs__heading'>7 технологий</h3>
      <p className='techs__paragraph'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='list-component'>HTML</li>
        <li className='list-component'>CSS</li>
        <li className='list-component'>JS</li>
        <li className='list-component'>React</li>
        <li className='list-component'>Git</li>
        <li className='list-component'>Express.js</li>
        <li className='list-component'>mongoDB</li>
      </ul>
    </section>
  );
}
