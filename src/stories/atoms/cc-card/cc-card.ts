import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { CardProperties } from '@interfaces/card.interface';
import { defineCustomElement } from '@helper/defineCustomElement';
import componentStyles from './cc-card.lit';

/**
 * Tarjeta de contenido con soporte para imagen, badge y acción.
 *
 * @element cc-card
 *
 * @fires cc-card:action - Fired cuando el usuario hace clic en el botón de acción
 */
export class CcCard extends LitElement implements CardProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String })
  heading: string = 'Título de la tarjeta';

  @property({ type: String })
  description: string = 'Descripción de ejemplo para la tarjeta.';

  @property({ type: String })
  badge?: string;

  @property({ type: String })
  variant: 'default' | 'primary' | 'outlined' = 'default';

  @property({ type: String, attribute: 'image-url' })
  imageUrl?: string;

  @property({ type: String, attribute: 'image-alt' })
  imageAlt?: string;

  @property({ type: String, attribute: 'action-label' })
  actionLabel?: string;

  // ── Private helpers ──────────────────────────────────────────

  private getClasses(): Record<string, boolean> {
    return {
      'card': true,
      [`card--variant-${this.variant}`]: Boolean(this.variant),
    };
  }

  private handleAction(): void {
    this.dispatchEvent(
      new CustomEvent('cc-card:action', {
        bubbles:  true,
        composed: true,
        detail:   { heading: this.heading },
      })
    );
  }

  // ── Render ────────────────────────────────────────────────────

  private renderImage(): TemplateResult | typeof html {
    if (!this.imageUrl) return html``;
    return html`
      <div class="card__image-wrapper" part="image-wrapper">
        <img
          class="card__image"
          src=${this.imageUrl}
          alt=${ifDefined(this.imageAlt)}
          part="image"
        />
      </div>
    `;
  }

  private renderBadge(): TemplateResult | typeof html {
    if (!this.badge) return html``;
    return html`<span class="card__badge" part="badge">${this.badge}</span>`;
  }

  private renderAction(): TemplateResult | typeof html {
    if (!this.actionLabel) return html``;
    return html`
      <div class="card__action" part="action">
        <button
          class="card__action-btn"
          part="action-btn"
          @click=${this.handleAction}
        >
          ${this.actionLabel}
        </button>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <article class=${classMap(this.getClasses())} part="card">
        ${this.renderImage()}
        <div class="card__body" part="body">
          ${this.renderBadge()}
          <h3 class="card__heading" part="heading">${this.heading}</h3>
          <p class="card__description" part="description">${this.description}</p>
          ${this.renderAction()}
        </div>
      </article>
    `;
  }
}

defineCustomElement('cc-card', CcCard);
