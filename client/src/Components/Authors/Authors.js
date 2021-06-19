import React from 'react';
import { Link } from 'react-router-dom';
import list from './AuthorList.json';

import './Authors.css';

function Authors() {

  console.log(list.people);

  return (
    <section className="authors__container">
      <a className="authors__back" href="./..">
        &#129044;
      </a>
      <h1 className="authors__headline">Autorzy</h1>
      <article className="authors__list">
        {list.people.map((person, index) => (
          <div key={index} className="authors__author">
            <p>{person.role}</p>
            <p>{person.name}</p>
          </div>
        ))}
      </article>
    </section>
  )
}

export default Authors;

