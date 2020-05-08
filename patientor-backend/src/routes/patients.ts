import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('sending patient info');
    res.json(patientService.getAllPatientInfo());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatientInfo(req.params.id);
        res.json(patient);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        console.log('got entry', req.body);
        const entry = toNewEntry(req.body);
        const patient = patientService.addPatientEntry(req.params.id, entry);
        res.json(patient);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

export default router;
