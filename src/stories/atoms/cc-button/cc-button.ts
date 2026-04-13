import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { property }                    from 'lit/decorators.js';
import { classMap }                    from 'lit/directives/class-map.js';
import type { ButtonProperties }       from '@interfaces/button.interface';
import { ButtonSize }                  from '@enums/button-size.enum';
import { ButtonVariant }               from '@enums/button-variant.enum';
import { defineCustomElement }         from '@helper/defineCustomElement';
import componentStyles                 from './cc-button.lit';

/**
 * A polymorphic button component with BEM modifiers and dual-brand support.
 *
 * @element cc-button
 *
 * @fires cc-button:click - Fired when the button is clicked (not disabled)
 */
export class CcButton extends LitElement implements ButtonProperties {
  static styles: CSSResultGroup = [componentStyles];

  /** Visible text label */
  @property({ type: String })
  label: string = 'Button';

  /** Visual style variant */
  @property({ type: String })
  variant: ButtonVariant | string = ButtonVariant.Primary;

  /** Button size */
  @property({ type: String })
  size: ButtonSize | string = ButtonSize.Medium;

  /** Disables the button */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /** Stretches button to fill its container */
  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth: boolean = false;

  /** Optional leading icon name (plain text, extend as needed) */
  @property({ type: String })
  icon?: string;

  // ── Private helpers ──────────────────────────────────────────

  private getClasses(): Record<string, boolean> {
    return {
      'button': true,
      [`button--variant-${this.variant}`]: Boolean(this.variant),
      [`button--size-${this.size}`]:       Boolean(this.size),
      'button--full-width':                this.fullWidth,
      'button--disabled':                  this.disabled,
    };
  }

  private handleClick(): void {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('cc-button:click', {
        bubbles:  true,
        composed: true,
        detail:   { label: this.label, variant: this.variant },
      })
    );
  }

  // ── Render ────────────────────────────────────────────────────

  render(): TemplateResult {
    return html`
      <button
        class=${classMap(this.getClasses())}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="button"
      >
        ${this.icon ? html`<span class="button__icon" part="icon">${this.icon}</span>` : ''}
        <span class="button__label" part="label">${this.label}</span>
      </button>
    `;
  }
}

defineCustomElement('cc-button', CcButton);
