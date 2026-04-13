import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './cc-card';

// ── Meta ──────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Atoms/Card',
  component: 'cc-card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**cc-card** es un átomo de contenido que soporta imagen, badge, heading, descripción y acción.

Soporta tres variantes visuales y theming dual-brand (BEO / EBF).

### Uso básico

\`\`\`html
<cc-card
  heading="Mi tarjeta"
  description="Descripción de la tarjeta."
  variant="default"
  action-label="Ver más"
></cc-card>
\`\`\`

### Eventos

| Evento | Detalle |
|---|---|
| \`cc-card:action\` | \`{ heading: string }\` |
        `,
      },
    },
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Título principal',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Texto descriptivo',
      table: { category: 'Content' },
    },
    badge: {
      control: 'text',
      description: 'Etiqueta superior (opcional)',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'outlined'],
      description: 'Variante visual',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    imageUrl: {
      control: 'text',
      description: 'URL de imagen (opcional)',
      table: { category: 'Media' },
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text de la imagen',
      table: { category: 'Media' },
    },
    actionLabel: {
      control: 'text',
      description: 'Texto del botón de acción (opcional)',
      table: { category: 'Content' },
    },
  },
  args: {
    heading:     'Componente de tarjeta',
    description: 'Esta es la descripción de prueba del componente cc-card. Verifica que el deploy en Pantheon funcionó correctamente.',
    badge:       '',
    variant:     'default',
    imageUrl:    '',
    imageAlt:    '',
    actionLabel: 'Ver más',
  },
  render: (args) => html`
    <div style="max-width: 340px;">
      <cc-card
        heading=${args.heading}
        description=${args.description}
        badge=${args.badge ?? ''}
        variant=${args.variant}
        image-url=${args.imageUrl ?? ''}
        image-alt=${args.imageAlt ?? ''}
        action-label=${args.actionLabel ?? ''}
      ></cc-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

// ── Stories ───────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { variant: 'default' },
};

export const Primary: Story = {
  name: 'Primary',
  args: {
    variant:     'primary',
    badge:       'Destacado',
    heading:     'Tarjeta primaria',
    description: 'Variante con fondo de color primario de la marca BEO.',
  },
};

export const Outlined: Story = {
  name: 'Outlined',
  args: {
    variant:     'outlined',
    heading:     'Tarjeta outlined',
    description: 'Variante con borde de color primario, sin sombra.',
    actionLabel: 'Explorar',
  },
};

export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    badge:       'Nuevo',
    heading:     'Con etiqueta',
    description: 'La etiqueta aparece sobre el título para destacar contenido.',
  },
};

export const WithImage: Story = {
  name: 'With Image',
  args: {
    heading:     'Con imagen',
    description: 'La imagen ocupa la parte superior de la tarjeta.',
    badge:       'Imagen',
    imageUrl:    'https://placehold.co/340x180/004B87/ffffff?text=cc-card',
    imageAlt:    'Imagen de prueba',
    actionLabel: 'Ver detalle',
  },
};

export const NoAction: Story = {
  name: 'Sin acción',
  args: {
    heading:     'Solo contenido',
    description: 'Esta tarjeta no tiene botón de acción.',
    actionLabel: '',
  },
};

// ── Showcase: todas las variantes ─────────────────────────────

export const AllVariants: Story = {
  name: '⚡ Todas las variantes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Vista rápida de las tres variantes en paralelo.' },
    },
  },
  render: () => html`
    <style>
      .card-showcase {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        padding: 1.5rem;
        font-family: sans-serif;
      }
      .card-showcase > * {
        flex: 1;
        min-width: 260px;
        max-width: 320px;
      }
    </style>
    <div class="card-showcase">
      <cc-card
        variant="default"
        badge="Default"
        heading="Tarjeta default"
        description="Variante base con fondo blanco y sombra ligera. Ideal para la mayoría de los casos."
        action-label="Ver más"
      ></cc-card>

      <cc-card
        variant="primary"
        badge="Primary"
        heading="Tarjeta primary"
        description="Variante con fondo de color primario BEO. Útil para destacar contenido importante."
        action-label="Explorar"
      ></cc-card>

      <cc-card
        variant="outlined"
        badge="Outlined"
        heading="Tarjeta outlined"
        description="Variante con borde primario sin relleno. Para contenido secundario o complementario."
        action-label="Conocer más"
      ></cc-card>
    </div>
  `,
};
