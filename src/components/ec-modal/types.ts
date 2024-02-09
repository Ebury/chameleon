import type { NumericRange } from '../../../global';
import type { ButtonCategory } from '../ec-btn/types';

export interface ModalButtonsLegacyProps<TValue> {
  positive?: TValue
  negative?: TValue
}

export interface ModalButtonProps {
  isDisabled?: boolean
}

export interface ModalProps {
  show?: boolean
  isClosable?: boolean
  large?: boolean
  // TODO: remove the prop below and use it as part
  // of the positiveButtonProps/negativeButtonProps
  isLoading?: ModalButtonsLegacyProps<boolean>,
  zIndex?: NumericRange<201, 249>,
  // TODO: remove the prop below and use it as part
  // of the positiveButtonProps/negativeButtonProps
  category?: ModalButtonsLegacyProps<ButtonCategory>,
  positiveButtonProps?: ModalButtonProps,
  negativeButtonProps?: ModalButtonProps,
}
