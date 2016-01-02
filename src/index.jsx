import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';

function main({ DOM }) {

  const action$ = Observable.merge(
    DOM.select('#increment').events('click').map(_ => 1),
    DOM.select('#decrement').events('click').map(_ => -1)
  );

  const count$ = action$.startWith(0).scan((x, y) => x + y);

  const vdom$ = count$
      .map((count) => (
        <div>
          <button id="increment">Increment</button>
          <button id="decrement">Decrement</button>
          <p>{count}</p>
        </div>
      ));

  return {
    DOM: vdom$
  }
}

run(main, {
  DOM: makeDOMDriver('#app-container')
});