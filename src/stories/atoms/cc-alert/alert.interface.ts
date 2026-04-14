export interface AlertProperties {
  /** Mensaje principal de la alerta */
  message: string;
  /** Título opcional */
  title?: string;
  /** Tipo de alerta — define color e icono */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Muestra botón para cerrar la alerta */
  dismissible: boolean;
}
