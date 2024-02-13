import { AlertType as ToasterMessageType } from '../ec-alert/types';

export { ToasterMessageType };

export interface ToasterMessage {
  readonly id: number,
  title: string,
  type: ToasterMessageType,
  subtitle?: string,
}

export interface ToasterProps {
  messages?: ToasterMessage[],
}
