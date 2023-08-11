export enum AlertType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum AlertEvent {
  UPDATE_OPEN = 'update:open',
  ACTION = 'action',
  CHANGE = 'change',
}

export interface AlertEvents {
  [AlertEvent.UPDATE_OPEN]: AlertProps['open']
  [AlertEvent.ACTION]: undefined
  [AlertEvent.CHANGE]: AlertProps['open']
}

export interface AlertProps {
  type: AlertType,
  title: string,
  subtitle?: string,
  dismissable?: boolean,
  buttonText?: string,
  open?: boolean,
  responsive?: boolean
}
