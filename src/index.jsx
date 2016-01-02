import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';

function main({ DOM }) {

  const changeWeight$ = DOM.select('#weight').events('change').map(event => event.target.value);
  const changeHeight$ = DOM.select('#height').events('change').map(event => event.target.value);

  const bmi$ = Observable.combineLatest(
    changeWeight$.startWith(40),
    changeHeight$.startWith(140),
    (weight, height) => {
      const heightMeters = height * 0.01;
      return Math.round(weight / (heightMeters * heightMeters));
    }
  );

  const vdom$ = bmi$
    .map((bmi) => (
      <div>
        <div>Weight: <input id="weight" type="range" min="40" max="140" /></div>
        <div>Height: <input id="height" type="range" min="140" max="210" /></div>
        <h1>BMI: {bmi}</h1>
      </div>
    ));

  return {
    DOM: vdom$
  };
}

run(main, {
  DOM: makeDOMDriver('#app-container')
});