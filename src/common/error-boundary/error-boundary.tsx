import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        return hasError ? <span>Произошла ошибка</span> : children;
    }
}

export default ErrorBoundary;
