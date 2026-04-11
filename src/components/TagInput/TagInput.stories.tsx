import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Components/Inputs/Tag Input',
  component: TagInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'TagInput — multi-value text input that creates removable tag chips. Type and press Enter or comma to add tags.\n\nAccessibility:\n- Tags have remove buttons with `aria-label`\n- Backspace removes last tag when input is empty\n- Tag count announced via `aria-live` region\n- Paste support for comma-separated values\n- Duplicate and max-count validation',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md'], description: 'Size variant.' },
    max: { control: 'number', description: 'Maximum number of allowed tags.' },
    error: { control: 'boolean', description: 'Applies error border styling.' },
    disabled: { control: 'boolean', description: 'Disables the input.' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: function DefaultTags() {
    const [tags, setTags] = React.useState(['payments', 'reconciliation']);
    return <TagInput value={tags} onChange={setTags} label="Transaction Tags" />;
  },
};

export const WithMax: Story = {
  render: function MaxTags() {
    const [tags, setTags] = React.useState(['USD', 'EUR']);
    return <TagInput value={tags} onChange={setTags} label="Currencies" max={5} />;
  },
};

export const WithError: Story = {
  render: function ErrorTags() {
    const [tags, setTags] = React.useState<string[]>([]);
    return <TagInput value={tags} onChange={setTags} label="Categories" error />;
  },
};
