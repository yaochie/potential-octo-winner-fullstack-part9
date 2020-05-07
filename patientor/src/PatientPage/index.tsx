import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Container, Icon, Segment } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import {
  Patient, Entry, OccupationalHeathcareEntry
} from '../types';
import { setPatient } from '../state/reducer';
import HospitalDisp from './HospitalDisp';
import HealthCheckDisp from './HealthCheckDisp';
import OccupationalHealthcareDisp from './OccupationalHealthcareDisp';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
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