export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// type Date = string;

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface LeaveInfo {
    startDate: string;
    endDate: string;
}

interface OccupationalHeathCheckEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: LeaveInfo;
}

interface DischargeInfo {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: DischargeInfo;
}

export type Entry =
    | HospitalEntry
    | HealthCheckEntry
    | OccupationalHeathCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;