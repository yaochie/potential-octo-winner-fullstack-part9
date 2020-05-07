import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { HospitalEntry } from '../types';
import DiagnosisList from './DiagnosisList';

const HospitalDisp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment key={entry.id}>
      <Header size='small'>{entry.date} <Icon name='hospital' /></Header>
      <em>{entry.description}</em>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      Discharge: {entry.discharge.date}: {entry.discharge.criteria}
    </Segment>
  );
};

export default HospitalDisp;