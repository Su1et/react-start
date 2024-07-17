import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Login({ setLoggedIn }) {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors,isValid },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const onSubmit = async (data) => {
        console.log(data);
        console.log(errors, isValid);

        try {
            const response = await axios.post("http://localhost:8080/auth/sign-in", data, {
                headers: { "Content-Type": "application/json" },
            });
            const token = response.data.token;
            Cookies.set("token", token);
            setLoggedIn(true);
            navigate('/')
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };
    return (
        <>
            <h1>Вхід</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">Ваш нікнейм: </label>
                    <input id="username"
                           className="register-input"
                           {...register("username", {
                               minLength: 2,
                               required: true,
                           })}
                    />
                    <div>
                        {errors?.username && (
                            <p> Поля обов'язкове та має містити мінімум 2 символи </p>
                        )}
                    </div>
                    <label htmlFor="password"> Пароль: </label>
                    <input id="password"
                           type="password"
                           {...register("password", {
                               required: true,
                               minLength: 8,
                               pattern: /^(?=.*\d)(?=.*[A-Z])/,
                           })}
                    />
                    <div>
                        {errors?.password && <p> Некоректний пароль </p>}
                    </div>
                </fieldset>
                <input className="button-registration" type="submit" value="Увійти"/>
            </form>
        </>
    );
}

export default Login;