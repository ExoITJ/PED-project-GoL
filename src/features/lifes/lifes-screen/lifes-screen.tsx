import { FC, useEffect, useRef, MouseEventHandler, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
    selectGameFiledXAxis,
    selectGameFiledYAxis,
    selectGameGeneration,
    selectGameNet,
    selectGameSettingsSpeed,
} from "../../game-settings/game-settings-selectors";
import { GameFieldSize, GameModes } from "../../game-settings/game-settings-types";
import cloneDeep from "lodash/cloneDeep";
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
    const xAxis = useAppSelector(selectGameFiledXAxis);
    const yAxis = useAppSelector(selectGameFiledYAxis);
    const speed = useAppSelector(selectGameSettingsSpeed);
    const generation = useAppSelector(selectGameGeneration);
    const intervalRef = useRef<number>();

    useEffect(() => {
        return () => {
            dispatch(resetGameSettings());
            clearInterval(intervalRef.current);
        };
    }, []);

    const gameLogic = () => {
        const newNet = cloneDeep(gameNet);

        for (let i = 0; i < xAxis; i++) {
            for (let j = 0; j < yAxis; j++) {
                let count = 0;
                if (i > 0) if (newNet[i - 1][j]) count++;
                if (i > 0 && j > 0) if (newNet[i - 1][j - 1]) count++;
                if (i > 0 && j < yAxis - 1) if (newNet[i - 1][j + 1]) count++;
                if (j < yAxis - 1) if (newNet[i][j + 1]) count++;
                if (j > 0) if (newNet[i][j - 1]) count++;
                if (i < xAxis - 1) if (newNet[i + 1][j]) count++;
                if (i < xAxis - 1 && j > 0) if (newNet[i + 1][j - 1]) count++;
                if (i < xAxis - 1 && yAxis - 1) if (newNet[i + 1][j + 1]) count++;
                if (newNet[i][j] && (count < 2 || count > 3)) newNet[i][j] = false;
                if (!newNet[i][j] && count === 3) newNet[i][j] = true;
            }
        }

        dispatch(changeGameNet(newNet));
        dispatch(increaseGameGeneration(1));
    };

    const handleStart = () => {
        dispatch(changeGameMode(GameModes.Start));
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(gameLogic, speed);
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
