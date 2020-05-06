import { v4 as uuid } from 'uuid';

import { PatientInfo, NewPatient, Patient } from '../types';
import patientData from '../../data/patientData';

const getAllPatientInfo = (): PatientInfo[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientInfo = (id: string): Patient => {
    const patient = patientData.find(p => p.id === id);
    if (!patient) {
        throw new Error('patient id not found: ' + id);
    }
    return patient;
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
    getAllPatientInfo,
    getPatientInfo,
    addPatient
};