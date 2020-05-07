import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Container, Icon, Segment } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import {
  Patient, Entry, Diagnosis, OccupationalHeathcareEntry, HealthCheckEntry,
  HospitalEntry
} from '../types';
import { setPatient } from '../state/reducer';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface DiagListProps {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
}

const DiagnosesList: React.FC<DiagListProps> = ({ diagnosisCodes }) => {
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

const HospitalDisp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment key={entry.id}>
      <Header size='small'>{entry.date} <Icon name='hospital' /></Header>
      <em>{entry.description}</em>
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      Discharge: {entry.discharge.date}: {entry.discharge.criteria}
    </Segment>
  );
};

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
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      <Header size='tiny'>
        <Icon color={iconColor} name='heart' />
      </Header>
    </Segment>
  );
};

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
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      {sickLeave(entry.sickLeave)}
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalDisp entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDisp entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDisp entry={entry} />;
    default:
      assertNever(entry);
  }
  return null;
};

const EntriesDisplay: React.FC<{ entries: Entry[]}> = ({ entries }) => {
  return (
    <>
      <Header size='medium'>entries</Header>
      {entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
    </>
  );
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    // don't query if the info is already in the state
    const patientInfo = Object.values(patients).find((p: Patient) => p.id === id);
    if (patientInfo && patientInfo.ssn) {
      return;
    }

    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch(e) {
        console.error(e);
      }
    };
    fetchPatient(id);
  }, [dispatch, id, patients]);

  const patientInfo = Object.values(patients).find((p: Patient) => p.id === id);

  if (!patientInfo) {
    return null;
  }

  const genderIcon = patientInfo.gender === 'male'
    ? 'mars'
    : (patientInfo.gender === 'female' ? 'venus' : 'genderless');

  if (!patientInfo.entries) {
    return (
      <Container>
        loading...
      </Container>
    );
  }

  return (
    <Container>
      <Header>{patientInfo.name} <Icon name={genderIcon} /></Header>
      <div>ssn: {patientInfo.ssn}</div>
      <div>occupation: {patientInfo.occupation}</div>
      <EntriesDisplay entries={patientInfo.entries} />
    </Container>
  );
};

export default PatientPage;