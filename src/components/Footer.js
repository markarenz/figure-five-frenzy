import React from 'react';
import css from "../css/modules/footer.module.scss";

const Footer = () => {
    return (
        <footer className={css.footer}>
            &copy;{new Date().getFullYear()} MarkMakesStuff.com
        </footer>
    )
};
export default Footer;
