import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { AlertProperties } from '@interfaces/alert.interface';
import { defineCustomElement } from '@helper/defineCustomElement';
import componentStyles from './cc-alert.lit';

const ICONS: Record<string, string> = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  error:   '✕',
};

/**
 * Componente de alerta con 4 tipos y opción de cierre.
 *
 * @element cc-alert
 *
 * @fires cc-alert:dismiss - Fired cuando el usuario cierra la alerta
 */
export class CcAlert extends LitElement implements AlertProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String })
  message: string = 'Este es un mensaje de alerta.';

  @property({ type: String })
  title?: string;

  @property({ type: String })
  type: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: Boolean })
  dismissible: boolean = false;

  @state()
  private _dismissed: boolean = false;

  // ── Helpers ───────────────────────────────────────────────────

  private getClasses(): Record<string, boolean> {
    return {
      'alert': true,
      [`alert--type-${this.type}`]: true,
    };
  }

  private handleDismiss(): void {
    this._dismissed = true;
    this.dispatchEvent(
      new CustomEvent('cc-alert:dismiss', {
        bubbles:  true,
        composed: true,
        detail:   { type: this.type },
      })
    );
  }

  // ── Render ────────────────────────────────────────────────────

  render(): TemplateResult {
    if (this._dismissed) return html``;

    return html`
      <div class=${classMap(this.getClasses())} role="alert" part="alert">

        <span class="alert__icon" part="icon" aria-hidden="true">
          ${ICONS[this.type]}
        </span>

        <div class="alert__content" part="content">
          ${this.title
            ? html`<p class="alert__title" part="title">${this.title}</p>`
            : ''}
          <p class="alert__message" part="message">${this.message}</p>
        </div>

        ${this.dismissible ? html`
          <button
            class="alert__close"
            part="close"
            aria-label="Cerrar alerta"
            @click=${this.handleDismiss}
          >✕</button>
        ` : ''}

      </div>
    `;
  }
}

defineCustomElement('cc-alert', CcAlert);
