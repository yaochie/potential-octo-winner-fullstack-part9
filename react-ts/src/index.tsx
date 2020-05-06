import React from 'react';
import ReactDOM from 'react-dom';

import { CoursePart } from './types';

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "More types",
    exerciseCount: 9,
    description: "In-depth type part",
    feedbackLink: "https://feedback.site"
  }
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch(coursePart.name) {
    case "Fundamentals":
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
          <blockquote>{coursePart.description}</blockquote>
        </>
      );
    case "Using props to pass data":
      return (
        <p>{coursePart.name} {coursePart.exerciseCount} #projects: {coursePart.groupProjectCount}</p>
      );
    case "Deeper type usage":
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount} Link: {coursePart.exerciseSubmissionLink}</p>
          <blockquote>{coursePart.description}</blockquote>
        </>
      );
    case "More types":
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount} Feedback Link: {coursePart.feedbackLink}</p>
          <blockquote>{coursePart.description}</blockquote>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map(c => <Part key={c.name} coursePart={c} />)}
  </>
);

const Total: React.FC<{ exerciseTotal: number }> = ({ exerciseTotal }) => (
  <p>
    Number of exercises{" "} {exerciseTotal}
  </p>
);

const App: React.FC = () => {
  const courseName = 'Half stack application development';
  const exerciseTotal = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total exerciseTotal={exerciseTotal} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));