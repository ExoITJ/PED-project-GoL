import { FC } from "react";
import { Layout } from "antd";
const { Content } = Layout;
import AppHeader from "../../app-header";
import AppContent from "../../app-content";
import s from "./main-page.module.scss";

const MainPage: FC = () => {
    return (
        <Layout className="layout">
            <AppHeader />
            <Content className={s.siteLayoutContent}>
                <AppContent />
            </Content>
        </Layout>
    );
};

export default MainPage;
