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

const App = () => {
    const [itemCount, itemCountSet] = React.useState(0);
    const onAddToCart = () => {
        itemCountSet(itemCount + 1);
    }

    return (
        <div>
            <Header count={itemCount} onClear={() => itemCountSet(0)} />            
            <div>Hi there, I'm React from Webpack 5.</div>
            <button onClick={onAddToCart}>Buy me</button>
            <div>Cart count is {itemCount}</div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));

