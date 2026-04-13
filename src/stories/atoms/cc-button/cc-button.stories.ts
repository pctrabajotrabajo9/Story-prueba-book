import type { Meta, StoryObj } from '@storybook/web-components';
import { html }                from 'lit';
import { ButtonSize }          from '@enums/button-size.enum';
import { ButtonVariant }       from '@enums/button-variant.enum';

// Register the component
import './cc-button';

// ── Meta ──────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'cc-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**cc-button** es el átomo base para todas las acciones interactivas del sistema.

mediante CSS custom properties inyectadas en el Shadow DOM desde \`cc-button.lit.ts\`.

### Uso

\`\`\`html
<cc-button label="Aceptar" variant="primary" size="md"></cc-button>
\`\`\`

### Eventos

| Evento           | Detalle                           |
|------------------|-----------------------------------|
| \`cc-button:click\` | \`{ label: string, variant: string }\` |
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visible dentro del botón',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(ButtonVariant),
      description: 'Variante visual (mapea a modificadores BEM)',
      table: { category: 'Appearance', defaultValue: { summary: ButtonVariant.Primary } },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ButtonSize),
      description: 'Tamaño del botón',
      table: { category: 'Appearance', defaultValue: { summary: ButtonSize.Medium } },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita la interacción',
      table: { category: 'State' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expande el botón al 100% del contenedor',
      table: { category: 'Layout' },
    },
    icon: {
      control: 'text',
      description: 'Icono líder (texto plano; extiende con tu sistema de iconos)',
      table: { category: 'Content' },
    },
  },
  args: {
    label:     'Botón',
    variant:   ButtonVariant.Primary,
    size:      ButtonSize.Medium,
    disabled:  false,
    fullWidth: false,
    icon:      '',
  },
  render: (args) => html`
    <cc-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
      icon=${args.icon ?? ''}
    ></cc-button>
  `,
};

export default meta;
type Story = StoryObj;

// ── Stories individuales ──────────────────────────────────────

export const Primary: Story = {
  name: 'Primary',
  args: { label: 'Acción principal', variant: ButtonVariant.Primary },
};

export const Secondary: Story = {
  name: 'Secondary',
  args: { label: 'Acción secundaria', variant: ButtonVariant.Secondary },
};

export const Outline: Story = {
  name: 'Outline',
  args: { label: 'Acción outline', variant: ButtonVariant.Outline },
};

export const Ghost: Story = {
  name: 'Ghost',
  args: { label: 'Acción ghost', variant: ButtonVariant.Ghost },
};

export const Small: Story = {
  name: 'Small',
  args: { label: 'Pequeño', size: ButtonSize.Small },
};

export const Large: Story = {
  name: 'Large',
  args: { label: 'Grande', size: ButtonSize.Large },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { label: 'Deshabilitado', disabled: true },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: { label: 'Ancho completo', fullWidth: true },
  decorators: [
    (story) => html`<div style="width: 320px; padding: 1rem; border: 1px dashed #ccc;">${story()}</div>`,
  ],
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: { label: 'Descargar', icon: '↓' },
};

// ── Story de showcase: todas las variantes ────────────────────

export const AllVariants: Story = {
  name: '⚡ Todas las variantes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Vista rápida de todas las combinaciones de variante × tamaño.',
      },
    },
  },
  render: () => html`
    <style>
      .showcase {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem;
        font-family: sans-serif;
      }
      .showcase__group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .showcase__label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin-bottom: 0.25rem;
      }
      .showcase__row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .showcase__separator {
        border: none;
        border-top: 1px solid #e5e7eb;
      }
    </style>

    <div class="showcase">

      <!-- Variantes × tamaños -->
      <div class="showcase__group">
        <p class="showcase__label">Variantes × Tamaños</p>
        ${[ButtonVariant.Primary, ButtonVariant.Secondary, ButtonVariant.Outline, ButtonVariant.Ghost].map(
          (variant) => html`
            <div class="showcase__row">
              ${[ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large].map(
                (size) => html`
                  <cc-button
                    label="${variant} / ${size}"
                    variant="${variant}"
                    size="${size}"
                  ></cc-button>
                `
              )}
            </div>
          `
        )}
      </div>

      <hr class="showcase__separator" />

      <!-- Estados -->
      <div class="showcase__group">
        <p class="showcase__label">Estados</p>
        <div class="showcase__row">
          <cc-button label="Normal"       variant="primary"></cc-button>
          <cc-button label="Deshabilitado" variant="primary" disabled></cc-button>
          <cc-button label="Con icono"    variant="primary" icon="★"></cc-button>
          <cc-button label="Full width"   variant="outline" full-width
            style="width: 200px;"
          ></cc-button>
        </div>
      </div>

    </div>
  `,
};
