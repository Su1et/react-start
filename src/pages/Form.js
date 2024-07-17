import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Form() {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    const getAuthToken = () => {
        return Cookies.get('token');
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            cityFrom: "",
            cityTo: "",
            price: "",
            cargoWeight: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        console.log(errors, isValid);

        try {
            const token = getAuthToken();

            const response = await fetch("http://localhost:8080/order/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                navigate("/orders");
            } else {
                const errorData = await response.json();
                setErrMsg(errorData.message); // Assuming the error message is present in the response JSON
                console.error("Server error:", response.status, response.statusText);
            }
        } catch (error) {
            setErrMsg("No Server Response");
            console.error("Fetch error:", error.message);
        }
    };

    return (
        <>
            <h1>Заповніть форму</h1>
            <form action="/" onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="cityFrom">Звідки: </label>
                    <select className='city' name="cityFrom" id="cityFrom"  {...register("cityFrom")} required>
                        <option value="">Виберіть місто</option>
                        <option value="Київ">Київ</option>
                        <option value="Харків">Харків</option>
                        <option value="Одеса">Одеса</option>
                        <option value="Варшава">Варшава</option>
                        <option value="Батумі">Батумі</option>
                        <option value="Париж">Париж</option>
                        <option value="Констанца">Констанца</option>
                    </select>
                    <label htmlFor="cityTo">Куди: </label>
                    <select className='city' name="cityTo" id="cityTo" {...register("cityTo")} required>
                        <option value="">Виберіть місто</option>
                        <option value="Київ">Київ</option>
                        <option value="Харків">Харків</option>
                        <option value="Варшава">Варшава</option>
                        <option value="Батумі">Батумі</option>
                        <option value="Париж">Париж</option>
                        <option value="Одеса">Одеса</option>
                        <option value="Констанца">Констанца</option>
                    </select>
                    <label htmlFor="price">Максимальна ціна: </label>
                    <input id="price" className="price"
                           type="number"
                           {...register("price", {
                                   required: true,
                                   min: 100,
                               }
                           )}/>
                    <div>
                        {errors?.price && <p> Ціна має бути мінімум 100 </p>}
                    </div>
                    <label htmlFor="cargoWeight">Вага вантажу(Від 100 до 1000): </label>
                    <input id="cargoWeight" className="cargoWeight"
                           type="number"
                           {...register("cargoWeight", {
                                   required: true,
                                   min: 10,
                                   max: 1000,
                               }
                           )}/>
                    <div>
                        {errors?.cargoWeight && <p> Вага має бути мінімум 10 і максимум 1000</p>}
                    </div>
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <input className="button-registration" type="submit" value="Відправити"/>
                </fieldset>
            </form>
        </>
    )
}

export default Form;
