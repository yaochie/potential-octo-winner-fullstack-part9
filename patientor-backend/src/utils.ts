/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isHcr = (hcr: any): hcr is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(hcr);
};

const ssnRegex = RegExp(/^[0-9]{6}-(?:[0-9]{2,3}[A-Z]|[0-9]{2,4})$/);
const isSsn = (ssn: string): boolean => {
    return ssnRegex.test(ssn);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name: ' + name);
    }
    return name;
};

const parseString = (s: any, field: string): string => {
    if (!s || !isString(s)) {
        throw new Error('incorrect or missing ' + field + ': ' + s);
    }
    return s;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseDate = (date: any): string => {
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
    if (!isGender(gender)) {
        throw new Error('incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseHcr = (hcr: any): HealthCheckRating => {
    if (!isHcr(hcr)) {
        throw new Error('incorrect or missing hcr: ' + hcr);
    }
    return hcr;
};

const parseEntry = (entry: any): Entry => {
    // get base data
    const baseEntry: Entry = {
        id: parseString(entry.id, 'id'),
        date: parseDate(entry.date),
        description: parseString(entry.description, 'description'),
        specialist: parseString(entry.specialist, 'specialist'),
    } as Entry;

    if (entry.diagnosisCodes) {
        baseEntry.diagnosisCodes = entry.diagnosisCodes.map(
            (code: any) => parseString(code, 'code')
        );
    }

    switch(entry.type) {
        case 'HealthCheck':
            return {
                ...baseEntry,
                type: entry.type,
                healthCheckRating: parseHcr(entry.healthCheckRating),
            };
        case 'OccupationalHealthcare':
            if (entry.sickLeave) {
                return {
                    ...baseEntry,
                    type: entry.type,
                    employerName: parseString(entry.employerName, 'employerName'),
                    sickLeave: {
                        startDate: parseDate(entry.sickLeave.startDate),
                        endDate: parseDate(entry.sickLeave.endDate)
                    }
                };
            }
            return {
                ...baseEntry,
                type: entry.type,
                employerName: parseString(entry.employerName, 'employerName'),
            };
        case 'Hospital':
            return {
                ...baseEntry,
                type: entry.type,
                discharge: {
                    date: parseDate(entry.discharge.date),
                    criteria: parseString(entry.discharge.criteria, 'discharge criteria')
                }
            };
        default:
            throw new Error('incorrect or missing type: ' + entry.type);
    }
};

const parseEntries = (entries: any[]): Entry[] => {
    if (!entries) {
        throw new Error('missing entries: ' + entries);
    }

    return entries.map(e => parseEntry(e));
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
    };
};

export default toNewPatient;