import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';

export type HCEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface HCProps {
  onSubmit: (values: HCEntryFormValues) => void;
  onCancel: () => void;
}

export const HealthCheckEntryForm: React.FC<HCProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues = {
    type: 'HealthCheck',
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: 0
  } as HCEntryFormValues;

  const validate = (values: HCEntryFormValues) => {
    const requiredError = 'Field is required';
    const dateError = 'Invalid date';
    const errors: { [field: string]: string } = {};
    
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
            label='healthCheckRating'
            name='healthCheckRating'
            component={NumberField}
            min={0}
            max={3}
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

export default HealthCheckEntryForm;