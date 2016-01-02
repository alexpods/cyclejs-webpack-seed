import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';

function intent(DOM) {
  return {
    changeWeight$: DOM.select('#weight').events('change').map(event => event.target.value),
    changeHeight$: DOM.select('#height').events('change').map(event => event.target.value)
  };
}

function model({ changeWeight$, changeHeight$ }) {
  return Observable.combineLatest(
    changeWeight$.startWith(40),
    changeHeight$.startWith(140),
    (weight, height) => ({
      weight,
      height,
      bmi: calculateBMI(weight, height)
    })
  )
}

function view(state$) {
  return state$.map(({ weight, height, bmi }) => (
    <div>
      {renderWeightInput(weight)}
      {renderHeightInput(height)}
      {renderBMI(bmi)}
    </div>
  ));
}

function renderWeightInput(weight) {
  return (
    <div>
      Weight: <input id="weight" type="range" min="40" max="140" value={weight} />
    </div>
  );
}

function renderHeightInput(height) {
  return (
    <div>
      Height: <input id="height" type="range" min="140" max="210" value={height} />
    </div>
  );
}

function renderBMI(bmi) {
  return (
    <h1>
      BMI: {bmi}
    </h1>
  );
}

function calculateBMI(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

function main({ DOM }) {
  return {
    DOM: view(model(intent(DOM)))
  };
}

run(main, {
  DOM: makeDOMDriver('#app-container')
});