import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameFieldSize, GameModes, GameSpeeds } from "./game-settings-types";

type GameSettingsState = {
    mode: GameModes;
    fieldSize: GameFieldSize;
    speed: GameSpeeds;
};

export const GAME_SETTINGS_INITIAL_STATE: GameSettingsState = {
    mode: GameModes.Pause,
    fieldSize: GameFieldSize.Small,
    speed: GameSpeeds.OneX,
};

const gameSettingsSlice = createSlice({
    name: "gameSettings",
    initialState: GAME_SETTINGS_INITIAL_STATE,
    reducers: {
        resetGameSettings: () => GAME_SETTINGS_INITIAL_STATE,
        changeGameMode: (state, { payload }: PayloadAction<GameModes>) => {
            state.mode = payload;
        },
        changeGameFieldSize: (state, { payload }: PayloadAction<GameFieldSize>) => {
            state.fieldSize = payload;
        },
        changeGameSpeed: (state, { payload }: PayloadAction<GameSpeeds>) => {
            state.speed = payload;
        },
    },
});

export const { resetGameSettings, changeGameMode, changeGameFieldSize, changeGameSpeed } = gameSettingsSlice.actions;
export const gameSettingsReducer = gameSettingsSlice.reducer;
