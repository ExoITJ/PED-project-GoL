import { FC, useState, MouseEvent } from "react";
import { Header } from "antd/es/layout/layout";
import { AppRoutes } from "../routes";
import s from "./app-header.module.scss";
import { useNavigate } from "react-router-dom";

const AppHeader: FC = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(AppRoutes.Rules);

    const handleChangePage = (e: MouseEvent<HTMLButtonElement>) => {
        const { name } = e.currentTarget;
        setActivePage(name as AppRoutes);
        navigate(name);
    };

    return (
        <Header className={s.header}>
            <div className={s.logo}>
                <div>GAME</div>
                <div>of</div>
                <div>LIFE</div>
            </div>
            <div className={s.button}>
                <button
                    name={AppRoutes.Game}
                    className={activePage === AppRoutes.Game ? s.active : ""}
                    onClick={handleChangePage}
                >
                    Игра
                </button>
                <button
                    name={AppRoutes.Rules}
                    className={activePage === AppRoutes.Rules ? s.active : ""}
                    onClick={handleChangePage}
                >
                    Правила
                </button>
            </div>
        </Header>
    );
};

export default AppHeader;
