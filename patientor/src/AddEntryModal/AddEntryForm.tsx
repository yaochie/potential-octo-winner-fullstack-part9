import React from 'react';
import { Tab } from 'semantic-ui-react';

import HospitalEntryForm, { HospitalEntryFormValues } from './HospitalEntryForm';
import HealthCheckEntryForm, { HCEntryFormValues } from './HealthCheckEntryForm';
import OccHealthcareEntryForm, { OHEntryFormValues } from './OccHealthcareEntryForm';

// export type EntryFormValues = Omit<HospitalEntry, 'id'>;
export type EntryFormValues =
  | HospitalEntryFormValues
  | HCEntryFormValues
  | OHEntryFormValues;

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

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const panes = [
    {
      menuItem: 'Hospital',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'HealthCheck',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'OccupationalHealthcare',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tab.Pane>
          <OccHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      )
    },
  ];

  return <Tab panes={panes} />;
};

export default AddEntryForm;