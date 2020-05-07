import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

import { HealthCheckEntry } from '../types';
import DiagnosisList from './DiagnosisList';

const HealthCheckDisp: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let iconColor: ('green' | 'yellow' | 'orange' | 'red') = 'green';

  switch (entry.healthCheckRating) {
    case 0:
      iconColor = 'green';
      break;
    case 1:
      iconColor = 'yellow';
      break;
    case 2:
      iconColor = 'orange';
      break;
    case 3:
      iconColor = 'red';
      break;
    default:
      break;
  }

  return (
    <Segment key={entry.id}>
      <Header size='small'>{entry.date} <Icon name='treatment' /></Header>
      <em>{entry.description}</em>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      <Header size='tiny'>
        <Icon color={iconColor} name='heart' />
      </Header>
    </Segment>
  );
};

export default HealthCheckDisp;