import { Form } from '@formalizer/react-form';
import { fields } from './data/fields';

export const Designer = () => {
  return (
    <div style={{ padding: 80, width: 600, margin: '0 auto' }}>
      <Form
        autoGenerate
        fields={fields}
        onSubmit={(formalizer) => {
          alert(JSON.stringify(formalizer.value));
        }}
      >
        {() => {
          return <button type="submit">Submit</button>;
        }}
      </Form>
    </div>
  );
};
