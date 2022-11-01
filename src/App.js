import React from "react";
import "./App.css";

function App() {
  const [attackers, setAttackers] = React.useState(0);
  const [toHit, setToHit] = React.useState(0);
  const [targetAC, setTargetAC] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Attackers onChange={(count) => setAttackers(count)} />
        Current Attackers: {attackers}
        <ToHit onChange={(count) => setToHit(count)} />
        Current To Hit: {toHit < 0 ? "" : "+"}
        {toHit}
        <TargetAC onChange={(count) => setTargetAC(count)} />
        Current Target AC:{" "}
        {targetAC == 69 ? (
          <div>
            <img src="musk.png" />
            <br />
            Nice👍
          </div>
        ) : (
          targetAC
        )}
      </header>
    </div>
  );
}

function Attackers({ onChange }) {
  const onClickGen = (key) => () => {
    console.log(`${key} was pressed`);
    onChange(key);
  };
  return (
    <div>
      {Array(20)
        .fill("")
        .map((_, key) => (
          <button key={key} onClick={onClickGen(key + 1)}>
            {key + 1}
          </button>
        ))}
    </div>
  );
}

function ToHit({ onChange }) {
  const onClickGen = (key) => () => {
    onChange(key);
  };
  return (
    <div>
      {Array(20)
        .fill("")
        .map((_, key) => (
          <button key={key} onClick={onClickGen(key - 4)}>
            {key - 4 < 0 ? "" : "+"}
            {key - 4}
          </button>
        ))}
    </div>
  );
}

// Make a similar button selector for AC.
// Start with an AC of 69 and end with an ac of 69 nice
function TargetAC({ onChange }) {
  const onClickGen = (key) => () => {
    onChange(key);
  };
  return (
    <div>
      {Array(69)
        .fill("hababab")
        .map((_, key) => (
          <button key={key} onClick={onClickGen(key + 1)}>
            {key + 1}
          </button>
        ))}
    </div>
  );
}

export default App;
