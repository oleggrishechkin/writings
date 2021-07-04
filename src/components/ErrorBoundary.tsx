import { Component, ReactElement } from 'react';

interface IProps {
    fallback: ReactElement;
    children: any;
}

interface IState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): IState {
        return { hasError: true };
    }

    render(): ReactElement {
        return this.state.hasError ? this.props.fallback : this.props.children;
    }
}

export default ErrorBoundary;
