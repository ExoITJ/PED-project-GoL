import { combineReducers } from "@reduxjs/toolkit";
import { gameSettingsReducer } from "../features/game-settings/game-settings-slice";

export const rootReducer = combineReducers({
    gameSettings: gameSettingsReducer,
});
