import React from "react";
import '../styles/home.css';
import arkasLogo from "./temp/arkas.png";
import coscoLogo from "./temp/cosco.png";
import fiataLogo from "./temp/fiata.png";
import maerskLogo from "./temp/maersk.png";
import mscLogo from "./temp/msc.png";
import ebaLogo from "./temp/eba.png";



function Home() {
    return (
        <body className="body_home">
        <h2 className="about-us">Трохи про нас</h2>
        <div className="about">
            <p className="text">Компанія "TerraTranz Logistics" - ваш надійний партнер у світі логістики та
                вантажних перевезень. Ми - це команда професіоналів, які забезпечують найвищий рівень сервісу
                в галузі транспортування та відстеження маршрутизації вантажів.</p>
            <p className="text">Наша місія - зробити процес логістики для вас якнайбільш ефективним і прозорим.
                Ми розуміємо, що точність та швидкість перевезення є критичними факторами для вашого бізнесу,
                тому ми пропонуємо інноваційні рішення та найсучасніше обладнання для відстеження вашого вантажу
                в режимі реального часу.</p>
            <p className="text">Наша компанія спеціалізується на розробці та імплементації систем маршрутизації,
                які допомагають оптимізувати рух вантажів, знижуючи витрати на пальне і підвищуючи продуктивність.
                Наші клієнти отримують доступ до інтелектуальних інструментів для моніторингу та аналізу маршрутів,
                що дозволяє їм приймати кращі управлінські рішення.</p>
        </div>

        <div className="testimonials">
            <h2 className="our-testimonials">Відгуки наших клієнтів</h2>
            <div className="testimonial">
                <p className="testimonial-text">
                    "Дуже задоволений роботою компанії TerraTranz Logistics. Їхня команда виконала перевезення
                    нашого вантажу швидко та надійно. Рекомендую їх як надійного партнера з логістики."
                </p>
                <p className="testimonial-client">- Іван Петров, Директор компанії ABC Import</p>
            </div>
            <div className="testimonial">
                <p className="testimonial-text">
                    "Працюємо з TerraTranz Logistics вже декілька років. Високий рівень сервісу та завжди
                    своєчасні перевезення. Дякуємо за професіоналізм!"
                </p>
                <p className="testimonial-client">- Ольга Сидорова, Логістичний менеджер, XYZ Company</p>
            </div>
        </div>

        <div className="partners">
            <h2 className="our-partners">Наші партнери</h2>
            <div className="animation">
                <div className="part">
                    <img className="image" src={arkasLogo} alt="arkasLogo"/>
                    <img className="image" src={coscoLogo} alt="coscoLogo"/>
                    <img className="image" src={fiataLogo} alt="fiataLogo"/>
                </div>
                <div className="part">
                    <img className="image" src={maerskLogo} alt="maerskLogo"/>
                    <img className="image" src={mscLogo} alt="mscLogo"/>
                    <img className="image" src={ebaLogo} alt="ebaLogo"/>
                </div>
            </div>
        </div>
        </body>
    );
}

export default Home;
