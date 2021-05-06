import React, { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/example/test").then((resp) => {
      const { data } = resp;
      setState(data);
    });
  }, []);

  return (
    <div>
      <div>
        {state.map((item) => (
          <div key={item.ID}>
            <p>{item.ID}</p>
            <p>{item.FirstName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
