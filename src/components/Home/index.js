import React from 'react';
import { withAuthorization } from '../Session';
import Questions from '../questions'

const questions = [
  {
    text: "question 1",
    answers: [
      {
        text: "answer 1"
      },
      {
        text: "answer 2"
      },
      {
        text: "answer 3"
      },
      {
        text: "answer 4"
      }
    ]
  },
  {
    text: "question 2",
    answers: [
      {
        text: "answer 1"
      },
      {
        text: "answer 2"
      },
      {
        text: "answer 3"
      },
      {
        text: "answer 4"
      }
    ]
  }
]

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Questions/>

  </div>
);

const condition = user => !!user;

export default withAuthorization(condition)(HomePage);