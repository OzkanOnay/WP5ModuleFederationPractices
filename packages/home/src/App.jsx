import React from "react";
import ReactDOM from "react-dom";
import FederatedWrapper from "./FederatedWrapper";

const wrapComponent = (Component) => ({error, delayed, ...props}) => (
    <FederatedWrapper error={error} delayed={delayed}>
        <Component {...props} />
    </FederatedWrapper>
)

const Header = wrapComponent(React.lazy(() => import("nav/Header")));

const SingleValue = () => {
    const [singleValue, singleValueSet] = React.useState(null);

    React.useEffect(() => {
        import("logic/singleValue")
            .then(({default : value}) => singleValueSet(value))
            .catch((err) => console.error(`Error getting single value: ${err}`));
    }, []);

    return <div>Single value: {singleValue}</div>
}

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
            <SingleValue></SingleValue>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));

