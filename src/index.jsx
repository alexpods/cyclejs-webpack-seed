import Cycle from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';

function main({ DOM }) {
  return {
    DOM: DOM.select('input').events('click')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map((toggled) => (
        <div>
          Toggle me:
          <input type="checkbox" />
          <p>{toggled ? "ON" : "OFF"}</p>
        </div>
      ))
  };
}

Cycle.run(main, { DOM: makeDOMDriver('#app-container') });