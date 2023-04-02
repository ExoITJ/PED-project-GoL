export enum GameModes {
    Start = "start",
    Pause = "pause",
    Reset = "reset",
}

export enum GameSpeeds {
    OneX = 1500,
    FiveX = 1000,
    TenX = 500,
}

export enum GameFieldSize {
    Small = "sm",
    Medium = "md",
    Large = "lg",
}

export const DEFAULT_XAXIS = 15;
export const DEFAULT_YAXIS = 15;

export const GAME_FIELD_SIZE_INFO = Object.freeze({
    [GameFieldSize.Small]: { x: DEFAULT_XAXIS, y: DEFAULT_YAXIS },
    [GameFieldSize.Medium]: { x: 30, y: 30 },
    [GameFieldSize.Large]: { x: 45, y: 45 },
});
