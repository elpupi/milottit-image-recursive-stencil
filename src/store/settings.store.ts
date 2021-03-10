import { createStore } from "@stencil/store";

export interface SettingsState {
    width: number;
    nbRecursion: number;
}

export const settingsStore = createStore<SettingsState>({
    width: undefined as number,
    nbRecursion: 5
});
