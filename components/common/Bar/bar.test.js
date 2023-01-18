import { render, screen } from '@testing-library/react';
import Bar from './';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a bar', () => {
    const { asFragment, getByText } = render(<Bar index="Index" text="Text" type="Type" />);

    expect(getByText('Index')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
  });
});
