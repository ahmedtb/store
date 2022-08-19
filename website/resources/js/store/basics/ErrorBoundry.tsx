import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        // console.log('ErrorBoundary error', error)
        // console.log('errorInfo', errorInfo)

        // apiCallHandler(
        //     () => api.reportError({ url: window.location.href, content: errorInfo }),
        //     null,
        //     'report error',
        //     true
        // )
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1 className="text-center my-5">{localization.errorBoundaryMessage}</h1>;
        }

        return this.props.children;
    }
}