export const METROLINE_PROVIDE_KEY = Symbol('metroline');

export interface MetrolineProviderContext {
    activeItemId: string,
    lastItemId: string,
    isCompleted: boolean,
    register: (id: string) => void,
    unregister: (id: string) => void,
    goToNext: (id: string) => void,
    goTo: (id: string) => void,
    complete: () => void,
}
