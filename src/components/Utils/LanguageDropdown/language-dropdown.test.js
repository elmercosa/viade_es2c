import React from 'react';
import {cleanup, render} from 'react-testing-library';
import Language from './language-dropdown.component';

afterAll(cleanup);

const { container } = render(<Language t={key => key} />);

describe('Language', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
