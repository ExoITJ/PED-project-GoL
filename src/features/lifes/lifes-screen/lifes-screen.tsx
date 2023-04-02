import { FC, useEffect, useRef, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
    selectGameGeneration,
    selectGameNet,
    selectGameSettingsSpeed,
} from "../../game-settings/game-settings-selectors";
import { GameFieldSize, GameModes } from "../../game-settings/game-settings-types";
import {
    changeGameMode,
    increaseGameGeneration,
    changeGameNet,
    resetGameSettings,
    changeGameFieldSize,
} from "../../game-settings/game-settings-slice";
import { Button, Col, Row, Space } from "antd";
import GameNet from "../../../common/game-net/game-net";

const LifesScreen: FC = () => {
    const dispatch = useAppDispatch();

    const gameNet = useAppSelector(selectGameNet);
    const speed = useAppSelector(selectGameSettingsSpeed);
    const generation = useAppSelector(selectGameGeneration);
    const intervalRef = useRef<number>();

    useEffect(() => {
        return () => {
            dispatch(resetGameSettings());
            clearInterval(intervalRef.current);
        };
    }, []);

    const gameIsOn = () => {
        dispatch(changeGameMode(GameModes.Start));
        dispatch(increaseGameGeneration(1));
    };

    const handleStart = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(gameIsOn, speed);
    };

    const handleStop = () => {
        dispatch(changeGameMode(GameModes.Pause));
        clearInterval(intervalRef.current);
    };

    const handleReset = () => {
        dispatch(resetGameSettings());
        clearInterval(intervalRef.current);
    };

    const handleRandom = () => {
        const newNet = gameNet.map((rowArr) => rowArr.map(() => Math.floor(Math.random() * 4) === 1));
        dispatch(changeGameNet(newNet));
    };

    const handleChangeFieldSize: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
        const { name } = e.currentTarget;
        dispatch(changeGameFieldSize(name as GameFieldSize));
        clearInterval(intervalRef.current);
    };

    return (
        <Row gutter={[16, 24]}>
            <Col span={24} className="gutter-row" style={{ display: "flex", justifyContent: "center" }}>
                <Space>
                    <Space.Compact direction="horizontal">
                        <Button type="dashed" size="large" onClick={handleStart}>
                            Старт
                        </Button>
                        <Button type="dashed" size="large" onClick={handleStop}>
                            Пауза
                        </Button>
                        <Button type="dashed" size="large" onClick={handleRandom}>
                            Автозаполнение
                        </Button>
                        <Button type="dashed" size="large" onClick={handleReset}>
                            Сброс
                        </Button>
                        <Button name={GameFieldSize.Small} type="dashed" size="large" onClick={handleChangeFieldSize}>
                            Малое поле
                        </Button>
                        <Button name={GameFieldSize.Medium} type="dashed" size="large" onClick={handleChangeFieldSize}>
                            Среднее поле
                        </Button>
                        <Button name={GameFieldSize.Large} type="dashed" size="large" onClick={handleChangeFieldSize}>
                            Большое поле
                        </Button>
                    </Space.Compact>
                    Сгенерировано: {generation}
                </Space>
            </Col>
            <Col span={24} className="gutter-row" style={{ display: "flex", justifyContent: "center" }}>
                <Space>
                    <GameNet />
                </Space>
            </Col>
        </Row>
    );
};

export default LifesScreen;
