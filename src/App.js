import React from "react";
import "./App.css";
const MobAttackMap = {
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
	20: 20
};

function App() {
  const [attackers, setAttackers] = React.useState(0);
  const [toHit, setToHit] = React.useState(0);
  const [targetAC, setTargetAC] = React.useState(0);
	const [damagedealt, setDamage] = React.useState(0);
	const rollNeeded = attackers > 0 && targetAC > 0 
		? Math.min(Math.max(targetAC - toHit, 1), 20)
		: null;
	const hits = rollNeeded 
		? Math.floor(attackers / MobAttackMap[rollNeeded])
		: null;
	const totalDamage = rollNeeded 
		? hits * damagedealt
		: null;

	console.log({rollNeeded});

  return (
    <div className="App">
      <header className="App-header">
        <Attackers onChange={(count) => setAttackers(count)} />
        Current Attackers: {attackers}
        <ToHit onChange={(count) => setToHit(count)} />
        Current To Hit: {toHit < 0 ? "" : "+"}
        {toHit}
        <TargetAC onChange={(count) => setTargetAC(count)} />
        Current Target AC: {targetAC}
				<DamageDealt onChange={(count) => setDamage(count)} />
				Damage Per Hit: {damagedealt}
				{rollNeeded ? <>
					<h1>
						Roll Needed: {rollNeeded}
					</h1>
					<h1>
						Mobs Needed for One Hit: {MobAttackMap[rollNeeded]}
					</h1>
					<h1>
						Attackers that Hit: {hits}
					</h1>
					<h1>
						Total Damage Dealt: {totalDamage}
					</h1>
				</>: ""}
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
      {Array(40)
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
      {Array(25)
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
      {Array(35)
        .fill("hababab")
        .map((_, key) => (
          <button key={key} onClick={onClickGen(key + 1)}>
            {key + 1}
          </button>
        ))}
    </div>
  );
}
function DamageDealt ({ onChange }) {
	const onClickGen = (key) => () => {
		onChange(key);
	};
	return (
		<div>
			{Array(100)
				.fill("plplplpllpllp")
				.map((_, key) => (
					<button key={key} onClick={onClickGen(key + 1)}>
						{key + 1}
					</button>
				))}
		</div>
	)
}

export default App;
