// import {} from 'styled-components';
import { Theme } from './src/lib/theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
