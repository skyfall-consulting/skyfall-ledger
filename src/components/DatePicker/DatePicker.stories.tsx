import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Inputs/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'DatePicker — styled native date input with consistent sizing across form controls.\n\nAccessibility:\n- Uses native `<input type="date">` for built-in assistive technology and keyboard support\n- Browser-provided date picker popup\n- `aria-invalid` signals error state\n- Consistent sizing with other Ledger form controls',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Control height preset.' },
    error: { control: 'boolean', description: 'Applies error border styling.' },
    fullWidth: { control: 'boolean', description: 'Stretches to fill container width.' },
    min: { control: 'text', description: 'Minimum selectable date in YYYY-MM-DD format.' },
    max: { control: 'text', description: 'Maximum selectable date in YYYY-MM-DD format.' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
export const WithRange: Story = { args: { min: '2024-01-01', max: '2024-12-31' } };
export const Error: Story = { args: { error: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const FullWidth: Story = { args: { fullWidth: true } };
