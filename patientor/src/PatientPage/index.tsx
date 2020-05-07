import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Container, Icon } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Entry, Diagnosis } from '../types';
import { setPatient } from '../state/reducer';

interface EntriesProps {
  entries: Entry[];
}

const EntriesDisplay: React.FC<EntriesProps> = (props) => {
  const diagDisplay = (diagnosisCodes: Array<Diagnosis['code']> | undefined) => {
    if (!diagnosisCodes) {
      return null;
    }

    return (
      <ul>
        {diagnosisCodes.map(code => <li key={code}>{code}</li>)}
      </ul>
    );
  };

  const entryDisplay = (entry: Entry) => {
    return (
      <div key={entry.id}>
        {entry.date} <em>{entry.description}</em>
        <ul>
          {diagDisplay(entry.diagnosisCodes)}
        </ul>
      </div>
    );
  };

  return (
    <>
      {props.entries.map(entry => entryDisplay(entry))}
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

  // {patientInfo.entries.map(entry => entryDisplay(entry))}
  return (
    <Container>
      <Header>{patientInfo.name} <Icon name={genderIcon} /></Header>
      <div>ssn: {patientInfo.ssn}</div>
      <div>occupation: {patientInfo.occupation}</div>
      <Header size='medium'>entries</Header>
      <EntriesDisplay entries={patientInfo.entries} />
    </Container>
  );
};

export default PatientPage;