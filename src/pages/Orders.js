import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/orders.css';
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";

function Orders() {
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getCurrentUserId();

        axios.get(`http://localhost:8080/order/user-orders/${userId}`)
            .then(response => {
                setUserOrders(initializeOrderStatus(response.data));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user orders:", error);
                setLoading(false);
            });

        const intervalId = setInterval(() => {
            setUserOrders(prevOrders => {
                const updatedOrders = updateOrderStatus(prevOrders);
                const allOrdersDelivered = updatedOrders.every(order => order.status === "Замовлення доставлено");
                if (allOrdersDelivered) {
                    clearInterval(intervalId);
                }
                return updatedOrders;
            });
        }, 15000);

        return () => clearInterval(intervalId);
    }, []);

    const getCurrentUserId = () => {
        const token = Cookies.get('token');
        const decodedToken = jwt_decode(token);
        return decodedToken.id;
    };

    const initializeOrderStatus = (orders) => {
        return orders.map(order => ({
            ...order,
            status: "Замовлення обробляється"
        }));
    };

    const updateOrderStatus = (prevOrders) => {
        return prevOrders.map(order => {
            switch (order.status) {
                case "Замовлення обробляється":
                    return { ...order, status: "Замовлення відправлено" };
                case "Замовлення відправлено":
                    return { ...order, status: "Замовлення їде" };
                case "Замовлення їде":
                    return { ...order, status: "Замовлення прибуло" };
                case "Замовлення прибуло":
                    return { ...order, status: "Замовлення доставлено" };
                default:
                    return order;
            }
        });
    };

    if (loading) {
        return <p>Завантаження...</p>;
    }

    return (
        <div className="orders-container">
            <h1>Мої замовлення</h1>
            <div className="order-list">
                {userOrders.map(order => (
                    <div key={order.id} className="order-item">
                        <p className="order-number">Замовлення {order.id}</p>
                        <ul>
                            <li>Місто відправлення: {order.cityFrom}</li>
                            <li>Місто отримання: {order.cityTo}</li>
                            <li>Вага вантажу: {order.cargoWeight}</li>
                            <li>Ціна: {order.price}</li>
                            <li>Статус: {order.status}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;

