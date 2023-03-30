import { FC } from "react";
import { Footer } from "antd/es/layout/layout";
import s from "./app-footer.module.scss";

const AppFooter: FC = () => {
    return <Footer className={s.footer}>PED Project - GoL</Footer>;
};

export default AppFooter;
