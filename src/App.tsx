import React from "react";
import * as Components from "./Components";
import Intro from "./Home/Intro";
import "./Scss/main.scss";

function App() {
  const list = [
    {
      id: 1,
      component: <Intro />,
    },
    {
      id: 2,
      component: <Intro />,
    },
    {
      id: 3,
      component: <Intro />,
    },
    {
      id: 4,
      component: <Intro />,
    },
  ];

  return (
    <React.Fragment>
      <Components.Header />
      <Components.Slider.Vertical infinite>
        {list.map((l) => (
          <div
            key={l.id}
            style={{ width: "100%", height: "100%", background: "#333" }}
          >
            {l.component}
          </div>
        ))}
      </Components.Slider.Vertical>
    </React.Fragment>
  );
}

export default App;
