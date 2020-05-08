import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues = {
    type: 'Hospital',
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: [],
    discharge: {
      date: '',
      criteria: ''
    },
  } as HospitalEntryFormValues;

  const validate = (values: HospitalEntryFormValues) => {
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

    const dischargeErrors: { [field: string]: string } = {};
    if (!values.discharge.criteria) {
      dischargeErrors.criteria = requiredError;
    }
    if (!values.discharge.date) {
      dischargeErrors.date = requiredError;
    } else if (!Date.parse(values.discharge.date)) {
      dischargeErrors.date = dateError;
    }
    if (Object.keys(dischargeErrors).length > 0) {
      errors.discharge = dischargeErrors;
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
            label='Discharge Date'
            placeholder='YYYY-MM-DD'
            name='discharge.date'
            component={TextField}
          />
          <Field
            label='Discharge Criteria'
            name='discharge.criteria'
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

export default HospitalEntryForm;