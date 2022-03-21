import './root.css';
import './layout.css';
import './design.css';
import { Designer, fields } from '@formalizer/designer';

declare const window: any;

export function App() {
  return <Designer fields={fields} />;
}

export default App;
