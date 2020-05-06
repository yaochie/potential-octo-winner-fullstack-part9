import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Container, Icon } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

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
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
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

  return (
    <Container>
      <Header>{patientInfo.name} <Icon name={genderIcon} /></Header>
      <div>ssn: {patientInfo.ssn}</div>
      <div>occupation: {patientInfo.occupation}</div>
    </Container>
  );
};

export default PatientPage;