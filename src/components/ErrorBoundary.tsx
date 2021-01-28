import { Component, ReactElement } from 'react';

interface IErrorBoundaryProps {
    fallback: ReactElement;
    children: any;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): IErrorBoundaryState {
        return { hasError: true };
    }

    render(): ReactElement {
        const { fallback, children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return fallback;
        }

        return children;
    }
}

export default ErrorBoundary;
