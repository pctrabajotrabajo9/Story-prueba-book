import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './cc-alert';

const meta: Meta = {
  title: 'Atoms/Alert',
  component: 'cc-alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**cc-alert** muestra mensajes de estado con 4 tipos: info, success, warning y error.

Soporta título opcional y botón de cierre.

### Uso

\`\`\`html
<cc-alert type="success" message="Operación completada." dismissible></cc-alert>
\`\`\`

### Eventos

| Evento | Detalle |
|---|---|
| \`cc-alert:dismiss\` | \`{ type: string }\` |
        `,
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Mensaje principal',
      table: { category: 'Content' },
    },
    title: {
      control: 'text',
      description: 'Título opcional',
      table: { category: 'Content' },
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Tipo de alerta',
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Muestra botón para cerrar',
      table: { category: 'Behavior' },
    },
  },
  args: {
    message:     'Este es un mensaje de alerta de prueba.',
    title:       '',
    type:        'info',
    dismissible: false,
  },
  render: (args) => html`
    <div style="max-width: 480px;">
      <cc-alert
        message=${args.message}
        title=${args.title ?? ''}
        type=${args.type}
        ?dismissible=${args.dismissible}
      ></cc-alert>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  name: 'Info',
  args: { type: 'info', message: 'Hay una actualización disponible para tu cuenta.' },
};

export const Success: Story = {
  name: 'Success',
  args: { type: 'success', message: 'Los cambios se guardaron correctamente.' },
};

export const Warning: Story = {
  name: 'Warning',
  args: { type: 'warning', message: 'Tu sesión expirará en 5 minutos.' },
};

export const Error: Story = {
  name: 'Error',
  args: { type: 'error', message: 'No se pudo completar la operación. Intenta de nuevo.' },
};

export const WithTitle: Story = {
  name: 'With Title',
  args: {
    type:    'info',
    title:   'Información importante',
    message: 'Los cambios entrarán en vigencia a partir del próximo ciclo de facturación.',
  },
};

export const Dismissible: Story = {
  name: 'Dismissible',
  args: {
    type:        'warning',
    title:       'Atención',
    message:     'Haz clic en la X para cerrar esta alerta.',
    dismissible: true,
  },
};

export const AllTypes: Story = {
  name: '⚡ Todos los tipos',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:480px;padding:1.5rem;font-family:sans-serif;">
      <cc-alert type="info"    title="Info"    message="Mensaje informativo del sistema."           dismissible></cc-alert>
      <cc-alert type="success" title="Éxito"   message="La operación se completó correctamente."    dismissible></cc-alert>
      <cc-alert type="warning" title="Aviso"   message="Revisa los datos antes de continuar."       dismissible></cc-alert>
      <cc-alert type="error"   title="Error"   message="Ocurrió un error. Intenta nuevamente."      dismissible></cc-alert>
    </div>
  `,
};

export const LongMessage: Story = {
  name: '⚡ Mensaje largo',
  args: {
    type:    'error',
    title:   'Error de validación',
    message: 'El campo "Correo electrónico" es obligatorio y debe contener una dirección válida. Por favor, corrige este error para continuar.',
    dismissible: true,
  },
};