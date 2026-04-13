import type { ButtonSize }    from '@enums/button-size.enum';
import type { ButtonVariant } from '@enums/button-variant.enum';

export interface ButtonProperties {
  /** Visible text inside the button */
  label: string;
  /** Visual variant — maps to BEM modifiers */
  variant: ButtonVariant | string;
  /** Size of the button */
  size: ButtonSize | string;
  /** Disables interaction */
  disabled: boolean;
  /** Full-width stretches to parent container */
  fullWidth: boolean;
  /** Optional icon name (leading) */
  icon?: string;
}
