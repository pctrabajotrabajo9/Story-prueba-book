export interface CardProperties {
  /** Título principal de la tarjeta */
  heading: string;
  /** Texto descriptivo */
  description: string;
  /** Texto del badge/etiqueta superior (opcional) */
  badge?: string;
  /** Variante visual de la tarjeta */
  variant: 'default' | 'primary' | 'outlined';
  /** URL de imagen (opcional) */
  imageUrl?: string;
  /** Texto alternativo de la imagen */
  imageAlt?: string;
  /** Texto del botón de acción (opcional) */
  actionLabel?: string;
}
