import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    DEFAULT_XAXIS,
    DEFAULT_YAXIS,
    GAME_FIELD_SIZE_INFO,
    GameFieldSize,
    GameModes,
    GameSpeeds,
} from "./game-settings-types";
import { calculateNewNet } from "../lifes/lifes.utils";

type GameSettingsState = {
    gameNet: boolean[][];
    mode: GameModes;
    fieldSize: GameFieldSize;
    speed: GameSpeeds;
    generation: number;
};

export const GAME_SETTINGS_INITIAL_STATE: GameSettingsState = {
    gameNet: calculateNewNet(DEFAULT_XAXIS, DEFAULT_YAXIS),
    mode: GameModes.Pause,
    fieldSize: GameFieldSize.Small,
    speed: GameSpeeds.OneX,
    generation: 0,
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
            const xAxis = GAME_FIELD_SIZE_INFO[payload].x;
            const yAxis = GAME_FIELD_SIZE_INFO[payload].y;
            state.gameNet = calculateNewNet(xAxis, yAxis);
        },
        changeGameSpeed: (state, { payload }: PayloadAction<GameSpeeds>) => {
            state.speed = payload;
        },
        increaseGameGeneration: (state, { payload }: PayloadAction<number>) => {
            if (!payload) {
                state.generation = payload;
                return;
            }
            state.generation += payload;
        },
        changeGameNet: (state, { payload }: PayloadAction<boolean[][]>) => {
            state.gameNet = payload;
        },
    },
});

export const {
    resetGameSettings,
    changeGameMode,
    changeGameFieldSize,
    changeGameSpeed,
    increaseGameGeneration,
    changeGameNet,
} = gameSettingsSlice.actions;
export const gameSettingsReducer = gameSettingsSlice.reducer;
