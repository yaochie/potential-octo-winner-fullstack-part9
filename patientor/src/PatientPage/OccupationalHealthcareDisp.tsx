import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

import { OccupationalHeathcareEntry } from '../types';
import DiagnosisList from './DiagnosisList';

const OccupationalHealthcareDisp: React.FC<{ entry: OccupationalHeathcareEntry }> = ({ entry }) => {
  const sickLeave = (leave: OccupationalHeathcareEntry['sickLeave']) => {
    if (!leave) {
      return null;
    }

    return (
      <div>
        Sick Leave: {leave.startDate} - {leave.endDate}
      </div>
    );
  };

  return (
    <Segment key={entry.id}>
      <Header size='small'>{entry.date} <Icon name='doctor' /> {entry.employerName}</Header>
      <em>{entry.description}</em>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      {sickLeave(entry.sickLeave)}
    </Segment>
  );
};

export default OccupationalHealthcareDisp;