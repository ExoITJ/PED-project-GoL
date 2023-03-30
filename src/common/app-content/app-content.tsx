import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../error-boundary";
import { AppRoutes } from "../routes";

const RulesScreen = lazy(() => import("../../features/rules/rules-screen"));

const AppContent: FC = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ErrorBoundary>
                <Routes>
                    <Route
                        path={AppRoutes.Any}
                        element={<div style={{ color: "white" }}>Ты не туда попал братишка</div>}
                    />
                    <Route path={AppRoutes.Game} element={<div>Тут игра</div>} />
                    <Route path={AppRoutes.Rules} element={<RulesScreen />} />
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};

export default AppContent;
