import React from 'react'

export default class FederatedWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error)  {
        return { hasError : true };
    }

    componentDidCatch(error, errorInfo) {

    }

    render() {
        if (this.state.hasError) {
            return this.props.error || <div>Someting went wrong</div>;
        }

        return <React.Suspense fallback={this.props.delayed || <div/>}>
            {this.props.children}
        </React.Suspense> ;
    }
}