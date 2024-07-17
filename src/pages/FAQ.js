import React, {Component} from "react";
import '../styles/faq.css';

class FAQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    title: "Як я можу замовити ваші послуги?",
                    answer: "Ви можете замовити наші послуги, зв'язавшись з нашим відділом продажів за номером телефону, надіславши запит через наш веб-сайт або напишіть нам на електронну пошту. Ми готові вас обслуговувати 24/7."
                },
                {
                    title: "Які види перевезень ви надаєте?",
                    answer: "Ми надаємо широкий спектр послуг перевезень, включаючи наземний, морський та повітряний транспорт. Ми також можемо організувати мультимодальні перевезення, включаючи вантажні залізничні перевезення."
                },
                {
                    title: "Які країни ви обслуговуєте?",
                    answer: "Ми здійснюємо перевезення в більшість країн світу. Наша мережа партнерів та агентів по всьому світу допомагає нам доставляти вантажі в будь-яку точку."
                },
                {
                    title: "Як ви встановлюєте тарифи?",
                    answer: "Тарифи на наші послуги встановлюються на індивідуальній основі, враховуючи тип вантажу, відстань та вид транспорту. Зверніться до наших менеджерів з продажу для отримання докладної інформації про ціни."
                },
                {
                    title: "Як ви відстежуєте вантаж під час перевезення?",
                    answer: "Ми використовуємо сучасні системи відстеження та зв'язку, щоб забезпечити постійний контроль над вантажем протягом всього маршруту."
                }
            ]
        };
    }

    render() {
        const {questions} = this.state;
        return (
            <div className="faq">
                <h2 className="title">FAQ</h2>
                <div className="questions">
                    {questions.map((question) => (
                        <div key={question.title} className="faq-item">
                            <button
                                type="button"
                                onClick={() => this.handleClick(question.title)}
                            >
                                {question.title}
                            </button>
                            <div className="faq-text" style={question.isExpanded ? {} : {display: "none"}}>
                                {question.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    handleClick(id) {
        const questions = this.state.questions.map((question) => {
            if (question.title === id) {
                question.isExpanded = !question.isExpanded;
            }
            return question;
        });
        this.setState({questions});
    }
}

export default FAQ;
