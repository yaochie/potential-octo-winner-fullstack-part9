import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Container, Icon, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Entry } from '../types';
import { setPatient } from '../state/reducer';
import HospitalDisp from './HospitalDisp';
import HealthCheckDisp from './HealthCheckDisp';
import OccupationalHealthcareDisp from './OccupationalHealthcareDisp';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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

  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log('got values', values);
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(newPatient));
      closeModal();
    } catch(e) {
      console.error(e.response.data);
    }
  };

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
    <div>
      <Container>
        <Header>{patientInfo.name} <Icon name={genderIcon} /></Header>
        <div>ssn: {patientInfo.ssn}</div>
        <div>occupation: {patientInfo.occupation}</div>
        <EntriesDisplay entries={patientInfo.entries} />
      </Container>
      <Container>
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientPage;