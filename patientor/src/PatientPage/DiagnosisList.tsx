import React from 'react';

import { Diagnosis } from '../types';
import { useStateValue } from '../state';

interface DiagListProps {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
}

const DiagnosisList: React.FC<DiagListProps> = ({ diagnosisCodes }) => {
  const [{ diagnoses },] = useStateValue();

  if (!diagnosisCodes || !diagnoses) {
    return null;
  }

  const displayCode = (code: string) => {
    // if (!diagnoses.hasOwnProperty(code)) {
    if (!(code in diagnoses)) {
      return null;
    }
    return (
      <li key={code}>{code} {diagnoses[code].name}</li>
    );
  };

  // TODO: error handling?
  return (
    <ul>
      {diagnosisCodes.map(code => displayCode(code))}
    </ul>
  );
};

export default DiagnosisList;