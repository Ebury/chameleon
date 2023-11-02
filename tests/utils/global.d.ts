import { DOMWrapper, VueWrapper } from '@vue/test-utils';

export interface CVueWrapper<VM = unknown, T extends ComponentPublicInstance = VM & ComponentPublicInstance> extends VueWrapper<VM, T> {
  findByDataTest: (string) => CDomWrapper<T>
  findAllByDataTest: (string) => CDomWrapper<T>[]
  findComponentByDataTest: (string) => CVueWrapper<T>
  findAllComponentsByDataTest: (string) => CVueWrapper<T>[]
}

export interface CDomWrapper<NodeType extends Node> extends DOMWrapper<NodeType> {
  findByDataTest: (string) => CDomWrapper<NodeType>
  findAllByDataTest: (string) => CDomWrapper<NodeType>[]
  findComponentByDataTest: (string) => CVueWrapper<NodeType>
  findAllComponentsByDataTest: (string) => CVueWrapper<NodeType>[]
}
