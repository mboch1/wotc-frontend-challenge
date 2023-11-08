import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import TalentCalculator from './TalentCalculator';

test('fully renders TalentCalculator in initial state', () => {
  render(<TalentCalculator />);
  const title = screen.getByText(/TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000/i);
  const talentIconFirst = screen.getByTestId('talent-icon-0-0');
  const talentIconLast = screen.getByTestId('talent-icon-1-3');
  const counter = screen.getByTestId('counter-container');
  expect(title).toBeInTheDocument();
  expect(counter).toHaveTextContent(/0 \/ 6/i);
  expect(talentIconFirst).toBeInTheDocument();
  expect(talentIconLast).toBeInTheDocument();
  const talentIconButtons = screen.getAllByRole('button');
  expect(talentIconButtons).toHaveLength(8);
});

test('selects 1st talent icon', () => {
  render(<TalentCalculator />);
  const talentIcon = screen.getByTestId('talent-icon-0-0');

  act(() => {
    talentIcon.click();
  });

  expect(talentIcon).toHaveClass('canvas-active');
  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/1 \/ 6/i);
});

test('de-selects 1st talent icon', () => {
  render(<TalentCalculator />);
  const talentIcon = screen.getByTestId('talent-icon-0-0');

  act(() => {
    talentIcon.click();
  });

  act(() => {
    talentIcon.click();
  });

  expect(talentIcon).not.toHaveClass('canvas-active');
  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/0 \/ 6/i);
});

test('does not select talent icon when path is not yet filled', () => {
  render(<TalentCalculator />);
  const talentIcon = screen.getByTestId('talent-icon-0-3');

  act(() => {
    talentIcon.click();
  });

  expect(talentIcon).not.toHaveClass('canvas-active');
  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/0 \/ 6/i);
});

test('selects full row of talents', () => {
  render(<TalentCalculator />);
  const talentIcon1 = screen.getByTestId('talent-icon-0-0');
  const talentIcon2 = screen.getByTestId('talent-icon-0-1');
  const talentIcon3 = screen.getByTestId('talent-icon-0-2');
  const talentIcon4 = screen.getByTestId('talent-icon-0-3');

  act(() => {
    talentIcon1.click();
  });
  act(() => {
    talentIcon2.click();
  });
  act(() => {
    talentIcon3.click();
  });
  act(() => {
    talentIcon4.click();
  });

  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/4 \/ 6/i);
});

test('does not un-select 1st talent when 3rd is activated in a row', () => {
  render(<TalentCalculator />);
  const talentIcon1 = screen.getByTestId('talent-icon-0-0');
  const talentIcon2 = screen.getByTestId('talent-icon-0-1');
  const talentIcon3 = screen.getByTestId('talent-icon-0-2');

  act(() => {
    talentIcon1.click();
  });
  act(() => {
    talentIcon2.click();
  });
  act(() => {
    talentIcon3.click();
  });
  act(() => {
    talentIcon1.click();
  });

  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/3 \/ 6/i);
});

test('selects 6 talents and does not allow to select any more', () => {
  render(<TalentCalculator />);
  const talentIcon1 = screen.getByTestId('talent-icon-0-0');
  const talentIcon2 = screen.getByTestId('talent-icon-0-1');
  const talentIcon3 = screen.getByTestId('talent-icon-0-2');
  const talentIcon4 = screen.getByTestId('talent-icon-0-3');
  const talentIcon5 = screen.getByTestId('talent-icon-1-0');
  const talentIcon6 = screen.getByTestId('talent-icon-1-1');
  const talentIcon7 = screen.getByTestId('talent-icon-1-2');

  act(() => {
    talentIcon1.click();
  });
  act(() => {
    talentIcon2.click();
  });
  act(() => {
    talentIcon3.click();
  });
  act(() => {
    talentIcon4.click();
  });
  act(() => {
    talentIcon5.click();
  });
  act(() => {
    talentIcon6.click();
  });
  act(() => {
    talentIcon7.click();
  });

  const counter = screen.getByTestId('counter-container');
  expect(counter).toHaveTextContent(/6 \/ 6/i);
});
