import React from "react";
import { FaPhone, FaEnvelope, FaTelegram, FaWhatsapp } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <FaPhone />
            <a href="tel:+380661152532">+380661152532</a>
            <FaEnvelope />
            <a href="mailto:TerraTranzLogistics@gmail.com">TerraTranzLogistics@gmail.com</a>
            <FaTelegram />
            <a href="tg://resolve?domain=terraTranzLogistics">Telegram</a>
            <FaWhatsapp />
            <a href="whatsapp://send?phone=+380661152532">Whatsapp</a>
        </div>
    );
};

export default Footer;
