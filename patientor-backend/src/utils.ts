/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isSsn = (ssn: string): boolean => {
    const ssnRegex = RegExp(/^[0-9]{6}-(?:[0-9]{2,3}[A-Z]|[0-9]{2,4})$/);
    return ssnRegex.test(ssn);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name: ' + name);
    }
    return name;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseDob = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isSsn(ssn)) {
        throw new Error('incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDob(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};

export default toNewPatient;