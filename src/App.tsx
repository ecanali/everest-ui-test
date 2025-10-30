import { FC } from "react";
import everestLogo from "/everest-logo.svg";
import "./App.css";

const App: FC = () => (
  <div className="everest-app">
    <img className="everest-app__logo" src={everestLogo} alt="Everest logo" />
    <h1 className="everest-app__title">TODO App Challenge</h1>
    <p className="everest-app__docs">Read the instructions to get started!</p>
  </div>
);

export default App;
