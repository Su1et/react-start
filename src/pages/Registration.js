import React, { useState } from "react";
import "../styles/registration.css";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        setValue,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "",
            phoneNumber: "",
            email: "",
            password: "",
        },
    });

    const handleRoleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedRole(selectedValue);
        setValue("role", selectedValue);
    };

    const operatorCodes = [
        "50", "66", "63", "67", "68", "91", "92", "93", "94", "95", "96", "97", "98", "99"
    ];

    const onSubmit = async (data) => {
        console.log(data);
        console.log(errors, isValid);

        try {
            const response = await fetch("http://localhost:8080/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                navigate("/login");
            } else {
                const errorData = await response.json();
                setErrMsg(errorData.message);
                console.error("Server error:", response.status, response.statusText);
            }
        } catch (error) {
            setErrMsg("No Server Response");
            console.error("Fetch error:", error.message);
        }
    };

    const validatePhoneNumber = (value) => {
        const cleanedNumber = value.replace(/\D/g, '');

        if (cleanedNumber.length >= 5) {
            const operatorCode = cleanedNumber.slice(3, 5);
            if (operatorCodes.includes(operatorCode)) {
                return true;
            } else {
                return '';
            }
        } else {
            return '';
        }
    };


    return (
        <body>
        <h1>Створіть акаунт</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="username">Ваш нікнейм: </label>
                <input id="username" className="register-input"
                    {...register("username", {
                        minLength: 2,
                        required: true,
                    })}/>
                <div>
                    {errors?.username && <p> Поля обов'язкове та має містити мінімум 2 символи </p>}
                </div>
                <label htmlFor="phoneNumber">Номер телефону: </label>
                <InputMask className="register-input"
                    mask="+38(099)-999-99-99"
                    maskChar="_"
                    id="phoneNumber"
                    name="tel"
                    placeholder="+38(0__)-___-__-__"
                    required
                    {...register("phoneNumber", {validate: validatePhoneNumber})}
                />
                <div>
                    {errors?.phoneNumber && <p> Введіть коректний номер </p>}
                </div>
                <label htmlFor="email">E-mail: </label>
                <input id="email" className="register-input"
                    {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        }
                    )}/>
                <div>
                    {errors?.email && <p> Введіть коректну електронну пошту </p>}
                </div>
                <label htmlFor="password"> Створіть пароль (Не менше ніж 8 символів): </label>
                <input id="password" className="register-input"
                    type="password"
                        {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*\d)(?=.*[A-Z])/,
                            }
                        )}
                />
                <div>
                    {errors?.password&& <p> Пароль має містити хоча б 1 цифру і 1 велику літеру </p>}
                </div>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            </fieldset>
            <fieldset>
                <label htmlFor="personal_account"><input id="personal_account" type="radio" name="account_type"
                                                         className="inline"
                                                         value="ROLE_CUSTOMER"
                                                         onChange={handleRoleChange}
                                                         checked={selectedRole === "ROLE_CUSTOMER"}/>
                    Особистий</label>
                <label htmlFor="business_account"><input id="business_account" type="radio" name="account_type"
                                                         className="inline"
                                                         value="ROLE_COMPANY"
                                                         onChange={handleRoleChange}
                                                         checked={selectedRole === "ROLE_COMPANY"}/>
                    Компанія</label>
            </fieldset>
            <input className="button-registration" type="submit" value="Створити акаунт"/>
        </form>
        </body>
    )
}

export default Registration;