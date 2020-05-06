import React from 'react';
import ReactDOM from 'react-dom';

import { CoursePart } from './types';

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p>)}
  </>
);

const Total: React.FC<{ exerciseTotal: number }> = ({ exerciseTotal }) => (
  <p>
    Number of exercises{" "} {exerciseTotal}
  </p>
);

const App: React.FC = () => {
  const courseName = 'Half stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ];
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