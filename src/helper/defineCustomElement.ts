/**
 * Registers a custom element safely, guarding against double-registration
 * during Storybook HMR or module re-imports.
 *
 * @param tag  - The custom element tag name (e.g. 'cc-button')
 * @param ctor - The LitElement class constructor
 */
export function defineCustomElement(
  tag: string,
  ctor: CustomElementConstructor
): void {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}
