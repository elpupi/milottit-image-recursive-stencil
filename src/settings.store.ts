import { createStore } from "@stencil/store";

export interface SettingsStore {
    width: number;
}

export const store = createStore<SettingsStore>({
    width: undefined as number,
    // nbRecursions: 5
});
