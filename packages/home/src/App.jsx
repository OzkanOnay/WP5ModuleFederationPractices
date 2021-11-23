import React from "react";
import ReactDOM from "react-dom";
import FederatedWrapper from "./FederatedWrapper";

const wrapComponent = (Component) => ({error, delayed, ...props}) => (
    <FederatedWrapper error={error} delayed={delayed}>
        <Component {...props} />
    </FederatedWrapper>
)

const Header = wrapComponent(React.lazy(() => import("nav/Header")));

import "./index.css";

const App = () => (
    <div>
        <Header />            
        <div>Hi there, I'm React from Webpack 5.</div>
    </div>
);

ReactDOM.render(<App />, document.getElementById("app"));

