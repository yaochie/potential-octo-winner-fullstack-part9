import { Diagnose } from '../types';
import diagnoseData from '../../data/diagnoseData';

const getDiagnoses = (): Diagnose[] => {
    return diagnoseData;
};

export default {
    getDiagnoses
};