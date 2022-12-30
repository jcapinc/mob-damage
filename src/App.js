import React from "react";
import "./App.css";

const MobAttackMapStraight = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
  9: 2,
  10: 2,
  11: 2,
  12: 2,
  13: 3,
  14: 3,
  15: 4,
  16: 4,
  17: 5,
  18: 5,
  19: 10,
  20: 20,
};
const MobAttackMapAdvantage = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 2,
  12: 2,
  13: 2,
  14: 2,
  15: 2,
  16: 2,
  17: 3,
  18: 4,
  19: 5,
  20: 10,
};
const MobAttackMapDisadvantage = {
  1: 1,
  2: 1,
  3: 1,
  4: 2,
  5: 2,
  6: 2,
  7: 2,
  8: 2,
  9: 3,
  10: 3,
  11: 4,
  12: 5,
  13: 6,
  14: 8,
  15: 11,
  16: 16,
  17: 25,
  18: 44,
  19: 100,
  20: 400,
};

function App() {
  const [attackers, setAttackers] = React.useState(0);
  const [toHit, setToHit] = React.useState(0);
  const [targetAC, setTargetAC] = React.useState(0);
  const [damagedealt, setDamage] = React.useState(0);
  const [advantage, setAdvantage] = React.useState("");

  const rollNeeded =
    attackers > 0 && targetAC > 0
      ? Math.min(Math.max(targetAC - toHit, 1), 20)
      : null;
  const MobAttackMap = (() => {
    if (advantage === "Advantage") {
      return MobAttackMapAdvantage;
    }  
    if (advantage === "Disadvantage") {
      return MobAttackMapDisadvantage;
    } 
    return MobAttackMapStraight;
  })();
  
  const hits = rollNeeded
    ? Math.floor(attackers / MobAttackMap[rollNeeded])
    : null;
  const totalDamage = rollNeeded ? hits * damagedealt : null;

  return (
    <div className="App">
      <img src="./carp.webp" style={{ width: "0px", height: "0px" }} />
      <header className="App-header">
        <Attackers
          currentSelected={attackers}
          onChange={(count) => setAttackers(count)}
        />
        <p className="attackers feral">Current Attackers: {attackers}</p>
        <ToHit currentSelected={toHit} onChange={(count) => setToHit(count)} />
        <p className="tohit">
          Current To Hit: {toHit < 0 ? "" : "+"} {toHit}
        </p>
        <TargetAC
          currentSelected={targetAC}
          onChange={(count) => setTargetAC(count)}
        />
        <p className="ac">Current Target AC: {targetAC}</p>
        <DamageDealt
          currentSelected={damagedealt}
          onChange={(count) => setDamage(count)}
        />
        {damagedealt === 69 ? (
          <div style={{ textAlign: "center" }}>
            <img src="./musk.png" />
            <h1>Nice.</h1>
          </div>
        ) : (
          ""
        )}
        <p>Damage Per Hit: {damagedealt}</p>
        <AdvantageButton
          currentSelected={advantage}
          onChange={(status) => setAdvantage(status)}
        />
        <p>Advantage Status: {advantage}</p>
        {rollNeeded ? (
          <>
            <h1>Roll Needed: {rollNeeded}</h1>
            <h1>Mobs Needed for One Hit: {MobAttackMap[rollNeeded]}</h1>
            <h1>Attackers that Hit: {hits}</h1>
            <h1>Total Damage Dealt: {totalDamage}</h1>
          </>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

function Attackers({ onChange, currentSelected = null }) {
  const onClickGen = (key) => () => {
    console.log(`${key} was pressed`);
    onChange(key);
  };
  return (
    <div>
      {Array(40)
        .fill("")
        .map((_, key) => (
          <button
            key={key}
            onClick={onClickGen(key + 1)}
            className={`${currentSelected === key + 1 ? "selected" : ""}`}
          >
            {key + 1}
          </button>
        ))}
    </div>
  );
}

function ToHit({ onChange, currentSelected }) {
  const onClickGen = (key) => () => {
    onChange(key);
  };
  return (
    <div>
      {Array(25)
        .fill("")
        .map((_, key) => (
          <button
            key={key}
            onClick={onClickGen(key - 4)}
            className={`${currentSelected === key - 4 ? "selected" : ""}`}
          >
            {key - 4 < 0 ? "" : "+"}
            {key - 4}
          </button>
        ))}
    </div>
  );
}

// Make a similar button selector for AC.
// Start with an AC of 69 and end with an ac of 69 nice
function TargetAC({ onChange, currentSelected }) {
  const onClickGen = (key) => () => {
    onChange(key);
  };
  return (
    <div>
      {Array(35)
        .fill("hababab")
        .map((_, key) => (
          <button
            key={key}
            onClick={onClickGen(key + 1)}
            className={`${currentSelected === key + 1 ? "selected" : ""}`}
          >
            {key + 1}
          </button>
        ))}
    </div>
  );
}
function DamageDealt({ onChange, currentSelected = null }) {
  const audioRef = React.useRef();
  const [ackbar, setAckbar] = React.useState(false);
  const onClickGen = (key) => () => {
    onChange(key);
    if (key !== 69) {
      return;
    }
    const { current: player } = audioRef;
    setAckbar(true);
    player.currentTime = 1.75;
    player.play();
    player.onended = () => {
      setAckbar(false);
    };
  };
  return (
    <div>
      {Array(100)
        .fill("plplplpllpllp")
        .map((_, key) => (
          <button
            key={key}
            onClick={onClickGen(key + 1)}
            className={`${currentSelected === key + 1 ? "selected" : ""}`}
          >
            {key + 1}
          </button>
        ))}
      <audio
        ref={audioRef}
        style={{ opacity: "0", height: "0px", width: "0px" }}
      >
        <source src="HeartAttack.m4a" type="audio/x-m4a" />
      </audio>
      {ackbar ? (
        <img
          src="./carp.webp"
          style={{
            height: "100vh",
            position: "fixed",
            left: "50%",
            transform: "translate(-50%,0)",
            top: "0px",
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

// Write a component has two buttons: advantage and disadvantage. 
// if you click "advantage" make it call an event that outputs "advantage" as a message
// write an input prop called "status" that can either be "advantage", "disadvantage"
//    or some form of 'empty' (undefined, false, null, "")
// if the status is "advantage", make the advantage button highlit in some obvious way
// if the status is "disadvantage", make the disadvantage button highlit in some obvious way
// if the status is advantage and the advantage button is pressed again, emit from the event prop an "empty" status
//    same for the disadvantage if the status is already disadvantage

// teirnery: [condition] ? [true response] : [false response]
function AdvantageButton({ onChange, currentSelected = null }) {
  const handler = (selectType) => () => {
    if (currentSelected === selectType) {
      onChange(null);
    }
    else {
      onChange(selectType);
    }
  };
  return (
    <div class="advantage">
      <button
        class={(currentSelected === "Advantage") ? "selected" : ""}
        onClick={handler("Advantage")}
      >
        Advantage
      </button>
      <button
        class={(currentSelected === "Disadvantage") ? "selected" : ""}
        onClick={handler("Disadvantage")}
      >
        Disadvantage
      </button>
    </div>
  );
};

function ArrowFunctionDemonstrator() {
  const LongSyntax = () => {
    return AdvantageButton();
  };

  const ShortSyntax = () => AdvantageButton();

  // ShortSyntax and Long Syntax do the EXACT same thing, return included.
  // you can convert these between each other at anytime.
  // it is common to have to take a short arrow function and transform it
  // into a long arrow function to make it do more than one thing.
}

/**
 * Problems to deal with next week:
 *  - There is no way to set it back to a straight roll!
 *    Perhaps we need to complicate our onclick logic?
 *  - Changing it to advantage does not actually change the calculation!
 *    Perhaps we need to complicate our damage calculation logic?
 *  - The buttons do not highlight to indicate which advantage status is selected!
 *    Perhaps we need to add reactive logic based on currentSelected?
 */

export default App;
