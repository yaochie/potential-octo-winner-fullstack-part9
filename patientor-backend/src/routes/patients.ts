import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('sending patient info');
    res.json(patientService.getPatientInfo());
});

router.post('/', (req, res) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

export default router;