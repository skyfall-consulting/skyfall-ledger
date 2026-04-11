import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FileUpload } from './FileUpload';

/**
 * Components / Inputs / File Upload
 *
 * Drag-and-drop file upload zone with click-to-browse fallback.
 * Validates file size, surfaces selected files in an accessible list,
 * and provides keyboard + screen-reader support for financial workflows.
 */
const meta: Meta<typeof FileUpload> = {
  title: 'Components/Inputs/File Upload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'FileUpload -- Drag-and-drop file upload zone for financial document ingestion: bank statements, identity documents, tax forms, invoices, and compliance artifacts.\n\n' +
          'Accessibility:\n' +
          '- Dropzone uses `role="button"` with `tabIndex` for keyboard focus\n' +
          '- Enter and Space keys open the native file dialog\n' +
          '- `aria-label` announces single vs. multiple file mode\n' +
          '- File list uses `<ul>` with `aria-label="Selected files"` for screen readers\n' +
          '- Each remove button has an `aria-label` identifying the file by name\n' +
          '- Error messages are surfaced via `role="alert"` for live-region announcement\n' +
          '- Disabled state sets `aria-disabled` and removes from tab order',
      },
    },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted MIME types or extensions (e.g. ".pdf,.jpg,image/*").',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple files at once.',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum allowed file size in bytes.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the dropzone and prevents interaction.',
    },
    error: {
      control: 'text',
      description: 'External error message shown below the dropzone.',
    },
  },
  args: {
    multiple: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// ---------- Stories ----------

export const Default: Story = {
  args: {},
};

export const BankStatements: Story = {
  name: 'Bank Statements',
  args: {
    accept: '.pdf,.csv',
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10 MB
  },
  parameters: {
    docs: {
      description: {
        story:
          'Configured for uploading bank statement files (PDF or CSV) with a 10 MB size limit. Multiple file selection is enabled for batch statement uploads.',
      },
    },
  },
};

export const IdentityDocuments: Story = {
  name: 'Identity Documents',
  args: {
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: 5 * 1024 * 1024, // 5 MB
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-file upload for KYC identity verification. Accepts PDF and common image formats with a 5 MB limit.',
      },
    },
  },
};

export const TaxForms: Story = {
  name: 'Tax Forms',
  args: {
    accept: '.pdf',
    multiple: true,
    maxSize: 20 * 1024 * 1024, // 20 MB
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-file PDF upload for tax document submission (W-2, 1099, etc.) with a 20 MB size limit per file.',
      },
    },
  },
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    error: 'Please upload a valid bank statement in PDF format.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const MultipleFiles: Story = {
  name: 'Multiple Files',
  args: {
    multiple: true,
    accept: '.pdf,.csv,.xlsx',
    maxSize: 15 * 1024 * 1024, // 15 MB
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-file upload supporting PDF, CSV, and Excel spreadsheets for bulk financial document ingestion.',
      },
    },
  },
};
