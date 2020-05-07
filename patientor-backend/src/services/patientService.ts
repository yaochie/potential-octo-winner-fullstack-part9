import { v4 as uuid } from 'uuid';

import { PatientInfo, NewPatient, Patient, NewEntry } from '../types';
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
    const newPatient = {
        ...patient,
        id: uuid()
    };

    patientData.push(newPatient);
    return newPatient;
};

const addPatientEntry = (id: string, entry: NewEntry): Patient => {
    const patientIndex = patientData.findIndex(p => p.id === id);
    if (patientIndex === -1) {
        throw new Error('patient id not found: ' + id);
    }

    const patient = patientData[patientIndex];
    const newEntry = {
        ...entry,
        id: uuid()
    };

    const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(newEntry)
    };

    patientData.splice(patientIndex, 1, updatedPatient);

    return updatedPatient;
};

export default {
    getAllPatientInfo,
    getPatientInfo,
    addPatient,
    addPatientEntry
};