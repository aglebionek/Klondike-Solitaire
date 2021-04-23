import React from "react";
import "./App.css";
import Settings from "./Components/Settings";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Settings />
    </div>
  );
}

export default App;
