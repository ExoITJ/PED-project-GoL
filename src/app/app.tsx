import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../common/error-boundary";
import { AppRoutes } from "../common/routes";

const MainPage = lazy(() => import("../common/pages/main-page/main-page"));

const App: FC = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path={AppRoutes.Any} element={<MainPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default App;
