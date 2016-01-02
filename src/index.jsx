import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';

function main() {
  return {
    DOM: Observable.from([
      <h1>Hello, world!</h1>
    ])
  }
}

run(main, {
  DOM: makeDOMDriver('#app-container')
});