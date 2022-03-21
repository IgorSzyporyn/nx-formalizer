import { render } from '@testing-library/react';

import Designer from './Designer';

describe('Designer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Designer />);
    expect(baseElement).toBeTruthy();
  });
});
