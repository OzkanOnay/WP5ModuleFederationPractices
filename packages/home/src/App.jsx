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




// const analyticsFunc = import("logic/analyticsFunc");
// const sendAnalytics = (msg) => {
//   analyticsFunc
//     .then(({ default: analyticsFunc }) => analyticsFunc(msg))
//     .catch((err) => console.log(`Error sending analytics value: ${msg}`));
// };

// const createAsyncFunc = (promise) => (...args) =>
//   promise
//     .then(({ default: func }) => func(...args))
//     .catch((err) =>
//       console.log(`Error sending analytics value: ${JSON.stringify(args)}`)
//     );

// const sendAnalytics = createAsyncFunc(import("logic/analyticsFunc"));

const queuedFunction = (funcPromise) => {
    let queueFunc = null;
    let queue = [];
    let pending = false;
  
    return (msg) => {
      if (queueFunc) {
        queueFunc(msg);
      } else {
        queue.push(msg);
  
        if (!pending) {
          pending = true;
          funcPromise
            .then((func) => {
              queueFunc = func;
              queue.forEach(queueFunc);
              queue = [];
            })
            .catch((err) => console.log(`Error getting queued function ${err}`));
        }
      }
    };
  };
  
  const sendAnalytics = queuedFunction(
    import("logic/analyticsFunc").then(({ default: func }) => func)
  );

sendAnalytics("Application startup");


const classExport = import("logic/classExport");
const newClassObject = (...args) => 
    classExport
        .then( ({default: classRef}) => {
            return new classRef(...args);
        })
        .catch( (err) => console.log(`Error getting class: ${err}`));

newClassObject("initial value").then(
    (theObject) => {
        theObject.logString();
    }
);


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

