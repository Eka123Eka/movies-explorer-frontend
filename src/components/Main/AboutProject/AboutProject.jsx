import './AboutProject.css'

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__item'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__item'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__stages'>
        <div className='about-project__stage'>
          <div className='about-project__period'>1 неделя</div>
          <div className='about-project__stage-info'>Back-end</div>
        </div>
        <div className='about-project__stage about-project__stage_two'>
          <div className='about-project__period about-project__period_two'>4 недели</div>
          <div className='about-project__stage-info'>Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
