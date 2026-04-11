import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Slider — range input for selecting numeric values within a bounded range.\n\nAccessibility:\n- Uses native `<input type="range">` for full keyboard and assistive technology support\n- Label linked via `htmlFor`/`id` association\n- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` communicated natively\n- `showValue` provides a visual readout of the current selection',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 }, description: 'Current numeric value.' },
    min: { control: 'number', description: 'Minimum allowed value.' },
    max: { control: 'number', description: 'Maximum allowed value.' },
    step: { control: 'number', description: 'Step increment between valid values.' },
    size: { control: { type: 'select' }, options: ['sm', 'md'], description: 'Track and thumb size.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    showValue: { control: 'boolean', description: 'Displays the current value as a readout.' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: function DefaultSlider() {
    const [val, setVal] = React.useState(50);
    return <Slider value={val} onChange={setVal} label="Amount" showValue />;
  },
};

export const TransactionLimit: Story = {
  render: function TransactionLimitSlider() {
    const [val, setVal] = React.useState(5000);
    return <Slider value={val} onChange={setVal} min={100} max={25000} step={100} label="Daily transfer limit ($)" showValue />;
  },
};

export const Small: Story = {
  render: function SmallSlider() {
    const [val, setVal] = React.useState(30);
    return <Slider value={val} onChange={setVal} size="sm" label="Risk tolerance" showValue />;
  },
};

export const Disabled: Story = {
  args: { value: 75, disabled: true, label: 'Locked allocation', showValue: true },
};
