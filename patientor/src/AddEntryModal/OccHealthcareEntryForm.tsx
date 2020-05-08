import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { OccupationalHeathcareEntry } from '../types';
import { useStateValue } from '../state';

export type OHEntryFormValues = Omit<OccupationalHeathcareEntry, 'id'>;

interface OHProps {
  onSubmit: (values: OHEntryFormValues) => void;
  onCancel: () => void;
}

export const OccHealthcareEntryForm: React.FC<OHProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues = {
    type: 'OccupationalHealthcare',
    date: '',
    description: '',
    specialist: '',
    employerName: '',
    diagnosisCodes: [],
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  } as OHEntryFormValues;

  const validate = (values: OHEntryFormValues) => {
    const requiredError = 'Field is required';
    const dateError = 'Invalid date';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: { [field: string]: any } = {};
    
    if (!values.date) {
      errors.date = requiredError;
    } else if (!Date.parse(values.date)) {
      errors.date = dateError;
    }
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (!values.employerName) {
      errors.employerName = requiredError;
    }

    if (values.sickLeave &&
        (values.sickLeave.startDate.length > 0 ||
        values.sickLeave.endDate.length > 0)) {
      console.log('sickLeave', values.sickLeave);
      const sickLeaveErrors: { [field: string]: string } = {};

      if (!values.sickLeave.startDate) {
        sickLeaveErrors.startDate = requiredError;
      } else if (!Date.parse(values.sickLeave.startDate)) {
        sickLeaveErrors.startDate = dateError;
      }
      if (!values.sickLeave.endDate) {
        sickLeaveErrors.endDate = requiredError;
      } else if (!Date.parse(values.sickLeave.endDate)) {
        sickLeaveErrors.endDate = dateError;
      }

      if (Object.keys(sickLeaveErrors).length > 0) {
        errors.sickLeave = sickLeaveErrors;
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => 
        <Form className="form ui">
          <Field
            label='Date'
            placeholder='YYYY-MM-DD'
            name='date'
            component={TextField}
          />
          <Field
            label='Description'
            placeholder=''
            name='description'
            component={TextField}
          />
          <Field
            label='Specialist'
            placeholder=''
            name='specialist'
            component={TextField}
          />
          <Field
            label='Employer Name'
            placeholder=''
            name='employerName'
            component={TextField}
          />
          <Field
            label='Sick Leave Start'
            placeholder='YYYY-MM-DD'
            name='sickLeave.startDate'
            component={TextField}
          />
          <Field
            label='Sick Leave End'
            placeholder='YYYY-MM-DD'
            name='sickLeave.endDate'
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button type='button' onClick={onCancel} color='red'>
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      }
    </Formik>
  );
};

export default OccHealthcareEntryForm;