import { createSelector } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../../app/store";
import { GAME_FIELD_SIZE_INFO } from "./game-settings-types";

const selectGameSettingsState = (state: RootState) => state.gameSettings;

export const selectGameSettingsMode = createSelector([selectGameSettingsState], ({ mode }) => mode);
export const selectGameSettingsFieldSize = createSelector([selectGameSettingsState], ({ fieldSize }) => fieldSize);
export const selectGameFiledXAxis = createSelector(
    [selectGameSettingsFieldSize],
    (fieldSize) => GAME_FIELD_SIZE_INFO[fieldSize].x
);
export const selectGameFiledYAxis = createSelector(
    [selectGameSettingsFieldSize],
    (fieldSize) => GAME_FIELD_SIZE_INFO[fieldSize].y
);
export const selectGameSettingsSpeed = createSelector([selectGameSettingsState], ({ speed }) => speed);
export const selectGameNet = createSelector([selectGameSettingsState], ({ gameNet }) => gameNet);
export const selectGameGeneration = createSelector([selectGameSettingsState], ({ generation }) => generation);
