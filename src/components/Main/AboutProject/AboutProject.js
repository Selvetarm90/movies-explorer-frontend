import Heading from '../Heading/Heading';
import './AboutProject.css'
export default function AboutProject() {
  return (
    <section className='about'>
      <Heading text='О проекте' id='about-project'/>
      <div className='description'>
        <h2 className='description__heading'>
          Дипломный проект включал 5 этапов
        </h2>
        <p className='description__paragraph'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </div>
      <div className='description'>
        <h2 className='description__heading'>
          На выполнение диплома ушло 5 недель
        </h2>
        <p className='description__paragraph'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="diagram">
        <p className="diagram diagram_first">1 неделя</p>
        <p className="diagram diagram_second">4 недели</p>
      </div>
    </section>
  );
}
