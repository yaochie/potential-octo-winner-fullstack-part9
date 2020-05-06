import { v4 as uuid } from 'uuid';

import { PatientInfo, NewPatient } from '../types';
import patientData from '../../data/patientData';

const getPatientInfo = (): PatientInfo[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): PatientInfo => {
    console.log(typeof patient);
    const newPatient = {
        ...patient,
        id: uuid()
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatientInfo,
    addPatient
};