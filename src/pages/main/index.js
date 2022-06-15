import React from 'react'
import './style.scss'

export default function MainPage() {
  return (
    <div>
      <section className="marketplace-section section-hero">
        <div className="marketplace-section__container">
          <div className="section-hero__wrapper">
            <div className="section-hero-text">
              <h1 className="section-hero__title pb-20">Зарабатывайте вместе с 05.RU</h1>
              <span className="section-hero__sale p">Продавайте свои товары на маркетплейсе:</span>
              <ul className="list section-hero__list">
                <li className="list__item">Гибкие схемы работы</li>
                <li className="list__item">Простое подключение и помощь в интеграции</li>
                <li className="list__item">Льготные условия и поддержка новых партнеров</li>
              </ul>
              <p className="section-hero__desc p">
                Мы предоставим Вам нашу интернет-витрину, маркетинг, логистику, РКО и восхитительный клиентский сервис!
              </p>
            </div>
            <div className="section-hero-images">
              <img
                src={require('src/assets/img/landing/web-page.png')}
                srcSet={`
                    ${require('src/assets/img/landing/web-page.png')} 1x,
                    ${require('src/assets/img/landing/web-page@2x.png')} 2x
                  `}
                alt="img-main"
                className="marketplace-img section-hero-images_main"
              />
              <img
                srcSet={`
                    ${require('src/assets/img/landing/zoom.png')} 1x,
                    ${require('src/assets/img/landing/zoom@2x.png')} 2x
                 `}
                src={require('src/assets/img/landing/web-page.png')}
                alt="img-zoom"
                className="marketplace-img section-hero-images_zoom"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="marketplace-section section-economy">
        <div className="marketplace-section__container">
          <div className="section-economy__wrapper">
            <h2 className="section-economy__title">Экономика</h2>
            <div className="section-economy-wrap">
              <div className="section-economy-block">
                <div className="section-economy-text">
                  <h3 className="section-economy-text__title">Мы берем комиссию только за выполненные заказы</h3>
                  <p className="section-economy__desc p">Ее размер устанавливается индивидуально, с учетом средних цен и маржинальности</p>
                </div>
                <div className="section-economy__img">
                  <img src={require('src/assets/img/landing/icon/icon-6.svg').default} alt="" className="marketplace-img" />
                </div>
              </div>
              <div className="section-economy-block">
                <div className="section-economy-text">
                  <h3 className="section-economy-text__title">Гибкий график выплат и прозрачная финансовая отчетность</h3>
                </div>
                <div className="section-economy__img">
                  <img src={require('src/assets/img/landing/icon/icon-2.svg').default} alt="" className="marketplace-img" />
                </div>
              </div>
              <div className="section-economy-block">
                <div className="section-economy-text">
                  <h3 className="section-economy-text__title">Вы решаете какой товар продавать и по какой цене</h3>
                </div>
                <div className="section-economy__img">
                  <img src={require('src/assets/img/landing/icon/icon-3.svg').default} alt="" className="marketplace-img" />
                </div>
              </div>
              <div className="section-economy-block">
                <div className="section-economy-text">
                  <h3 className="section-economy-text__title">Минимальный размер комиссии на срок до 6 месяцев</h3>
                  <p className="section-economy__desc p">
                    Для привлечения и заинтересованности новых партнёров мы готовы предложить индивидуальные условия для эксклюзивных
                    партнеров
                  </p>
                </div>
                <div className="section-economy__img">
                  <img src={require('src/assets/img/landing/icon/icon-4.svg').default} alt="" className="marketplace-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marketplace-section section-scheme">
        <div className="marketplace-section__container">
          <div className="section-scheme__wrapper">
            <h2 className="section-scheme__title">Схема работы</h2>
            <div className="section-scheme-wrap">
              <div className="section-scheme-block">
                <div className="section-scheme__img">
                  <img src={require('src/assets/img/landing/icon/icon-5.svg').default} alt="" className="marketplace-img" />
                </div>
                <div className="section-scheme-text">
                  <h3 className="section-scheme-text__title">Отгрузка с вашего склада</h3>
                  <p className="section-scheme-text__desc p">
                    Мы берем комиссию только за выполненные заказы. Ее размер устанавливается индивидуально, с учетом средних цен и
                    маржинальности
                  </p>
                </div>
              </div>
              <div className="section-scheme-block">
                <div className="section-scheme__img">
                  <img src={require('src/assets/img/landing/icon/icon-1.svg').default} alt="" className="marketplace-img" />
                </div>
                <div className="section-scheme-text">
                  <h3 className="section-scheme-text__title">Отгрузка со склада 05.ru</h3>
                  <p className="section-scheme-text__desc p">
                    Вы поставляете товары на наш склад. Мы комплектуем, упаковываем и отправляем заказы покупателям
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketplace-section section-advantages">
        <div className="marketplace-section__container">
          <div className="section-advantages__wrapper">
            <h2 className="h2 section-advantages__title">Почему стоит работать с нами?</h2>
            <div className="section-advantages__wrapper-blocks">
              <div className="section-advantages__blocks">
                <div className="section-advantages__block">
                  <p className="section-advantages__text">
                    <span className="red-text">Комиссия намного ниже</span>, чем в крупнейших маркетплейсах Beru, Ozon, WildBerries
                  </p>
                </div>
                <div className="section-advantages__block">
                  <p className="section-advantages__text">
                    <span className="red-text">Льготные условия</span> для новых партнеров
                  </p>
                </div>
                <div className="section-advantages__block">
                  <p className="section-advantages__text">
                    <span className="red-text">Крупнейшая интернет-площадка</span> на Северном Кавказе
                  </p>
                </div>
              </div>
              <div className="section-advantages__blocks">
                <div className="section-advantages__block section-advantages__block_circle">
                  <div className="circle-block">
                    <div className="circle-block__percent">5%</div>
                    <div className="circle-block__text">Минимальная комиссия</div>
                  </div>
                </div>
                <div className="section-advantages__block">
                  <div className="section-advantages__content">
                    <h3 className="h3 section-advantages__title-block">Комиссия за продажу</h3>
                    <p className="p">
                      Размер комиссии и стоимость доставки обсуждается с продавцом индивидуально и устанавливается в зависимости от
                      эксклюзивности товаров, количества заказов и других факторов.
                    </p>
                    <p className="p text-grey mt-5">
                      <i>Начните продавать первым, пока это не сделал кто-то другой!</i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-advantages__blocks">
                <div className="section-advantages__block section-advantages__block_bg-card" />
                <div className="section-advantages__block">
                  <div className="section-advantages__content">
                    <h3 className="h3 section-advantages__title-block">Техническая сторона</h3>
                    <p className="p">
                      Если у Вас уже есть свой веб-сайт с фотографиями и описаниями товаров - вам потребуется только YML выгрузка товаров.
                    </p>
                    <h5 className="h5 section-advantages__subtitle">Кроме того, наши партнеры получат от нас</h5>
                    <ul className="list list_advantages">
                      <li className="list__item">Помощь в технической интеграции</li>
                      <li className="list__item">Помощь в описании Ваших товаров</li>
                      <li className="list__item">Помощь в организации логистики и бизнес-процессов</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marketplace-section section-feedback">
        <div className="marketplace-section__container">
          <div className="section-feedback__wrapper">
            <h3 className="h3 section-feedback__title">С удовольствием ответим на ваши вопросы!</h3>
            <div className="section-feedback__button">
              <button size="49">Задать вопрос</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
