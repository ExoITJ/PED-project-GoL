import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const selectGameSettingsState = (state: RootState) => state.gameSettings;

export const selectGameSettingsMode = createSelector([selectGameSettingsState], ({ mode }) => mode);
export const selectGameSettingsFieldSize = createSelector([selectGameSettingsState], ({ fieldSize }) => fieldSize);
export const selectGameSettingsSpeed = createSelector([selectGameSettingsState], ({ speed }) => speed);
