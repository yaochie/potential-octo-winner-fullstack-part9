import React from 'react';

import { Diagnosis } from '../types';
import { useStateValue } from '../state';

interface DiagListProps {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
}

const DiagnosisList: React.FC<DiagListProps> = ({ diagnosisCodes }) => {
  const [{ diagnoses },] = useStateValue();

  if (!diagnosisCodes) {
    return null;
  }

  // TODO: error handling?
  return (
    <ul>
      {diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
    </ul>
  );
};

export default DiagnosisList;