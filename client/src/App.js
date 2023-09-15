import logo from "./logo.svg";
import "./App.css";
import { useLazyQuery } from "@apollo/client";
import { HELLO } from "./graphql/ApolloClient";
import { useEffect } from "react";

function App() {
  const [getFirstResponse] = useLazyQuery(HELLO);

  useEffect(() => {
    getHello();
  }, []);

  const getHello = async () => {
    const response = await getFirstResponse();
    console.log("response", response.data);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
