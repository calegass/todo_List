import React from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";
// import TodoHead from "./components/TodoHead";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>TODOList</h1>
      {/* <TodoHead /> */}
      <TodoItem />
      <h6>by Matheus@Robbyson</h6>
    </div>
  );
}

export default App;
