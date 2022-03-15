import { xFieldMap } from '@formalizer/react-fields';
import { Field, Form } from '@formalizer/react-form';

declare const window: any;

const fields = [
  {
    name: 'first_name',
    type: 'text',
  },
  { name: 'last_name', type: 'text' },
  { name: 'age', type: 'number' },
  { name: 'email', type: 'email' },
  {
    name: 'address',
    type: 'json',
    fields: [
      { name: 'street_name', type: 'text' },
      { name: 'zipcode', type: 'text' },
      { name: 'city', type: 'text' },
    ],
  },
];

export function App() {
  return (
    <div>
      <Form
        xFieldMap={xFieldMap}
        autoGenerate
        fields={fields}
        value={{ first_name: 'Igor' }}
      />
      <Form fields={fields} value={{ first_name: 'Igor' }}>
        {({ formalizer }) => {
          window.A = formalizer;
          return (
            <>
              <Field name="first_name">
                {({ props, field }) => {
                  console.log('re-render first_name');
                  window.C = field;
                  return <input {...props} />;
                }}
              </Field>
              <Field name="last_name">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
              <Field name="age">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
              <Field name="email">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
              <Field name="address.street_name">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
              <Field name="address.zipcode">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
              <Field name="address.city">
                {({ props }) => {
                  return <input {...props} />;
                }}
              </Field>
            </>
          );
        }}
      </Form>
    </div>
  );
}

export default App;
