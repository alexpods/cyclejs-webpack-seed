import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { Observable } from 'rx';

const PEOPLE_URL = '/people.json';

function main({ HTTP }) {

  const people$ = HTTP
    .filter(res$ => res$.request.url.indexOf(PEOPLE_URL) !== 1)
    .mergeAll()
    .map(res => res.body)
    .startWith(null);

  const requestPeople$ = Observable.timer(1000)
    .map(() => ({
      method: 'GET',
      url: PEOPLE_URL
    }));

  const vdom$ = people$
    .map((people) => {
      if (people === null) {
        return (
          <div>Loading</div>
        );
      }

      return (
        <div>
          {people.map((person) => (
            <div>
              <b>{person.name}</b>
              <span>{person.age}</span>
            </div>
          ))}
        </div>
      );
    });

  return {
    DOM: vdom$,
    HTTP: requestPeople$
  };
}

run(main, {
  DOM: makeDOMDriver('#app-container'),
  HTTP: makeHTTPDriver()
});