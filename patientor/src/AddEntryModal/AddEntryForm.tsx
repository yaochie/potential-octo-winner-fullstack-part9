import React from 'react';
import { Grid, Button, Form as FormUI } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type EntryOption = {
  value: string;
  label: string;
};

interface TextProps {
  name: string;
  label: string;
  placeholder: string;
}

const TextField2: React.FC<{name: string; label: string; placeholder: string}> = ({
  name,
  label,
  placeholder
}) => (
  <FormUI.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} name={name} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={Field.name} />
    </div>
  </FormUI.Field>
);

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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
  } as EntryFormValues;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
          <TextField2
            label='Specialist'
            placeholder='test'
            name='specialist'
          />
          <Field
            label='Discharge Date'
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

export default AddEntryForm;