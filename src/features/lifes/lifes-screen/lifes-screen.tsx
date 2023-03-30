import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
    selectGameSettingsFieldSize,
    selectGameSettingsMode,
    selectGameSettingsSpeed,
} from "../../game-settings/game-settings-selectors";
import { GameModes } from "../../game-settings/game-settings-types";
import { calculateGrid } from "../lifes.utils";
import cloneDeep from "lodash/cloneDeep";
import { changeGameMode, resetGameSettings } from "../../game-settings/game-settings-slice";
import { Button, Col, Row, Space } from "antd";

const LifesScreen: FC = () => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectGameSettingsMode);
    const fieldSize = useAppSelector(selectGameSettingsFieldSize);
    const speed = useAppSelector(selectGameSettingsSpeed);

    const [xAxis, setXAxis] = useState(20);
    const [yAxis, setYAxis] = useState(20);
    const [grid, setGrid] = useState<boolean[][]>([]);
    const [generation, setGeneration] = useState(0);
    const intervalRef = useRef<number>();

    useEffect(() => {
        const newGrid = calculateGrid(xAxis, yAxis);
        setGrid(newGrid);
    }, [xAxis, yAxis]);

    useEffect(() => {
        if (mode === GameModes.Start) {
            intervalRef.current = window.setInterval(logicOfLife, speed);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [grid, speed, mode]);

    useEffect(() => {
        return () => {
            dispatch(resetGameSettings());
        };
    }, []);

    const handleStart = () => {
        dispatch(changeGameMode(GameModes.Start));
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(logicOfLife, speed);
    };

    const handleStop = () => {
        dispatch(changeGameMode(GameModes.Pause));
        clearInterval(intervalRef.current);
    };

    const handleReset = () => {
        const newGrid = calculateGrid(xAxis, yAxis);
        dispatch(changeGameMode(GameModes.Reset));
        setGeneration(0);
        setGrid(newGrid);
        clearInterval(intervalRef.current);
    };

    const handleRandom = () => {
        const newGrid = grid.map((rowArr) => rowArr.map(() => Math.floor(Math.random() * 4) === 1));
        setGrid(newGrid);
    };

    const logicOfLife = () => {
        const gridClone = grid;
        const newGrid = cloneDeep(grid);

        for (let i = 0; i < xAxis; i++) {
            for (let j = 0; j < yAxis; j++) {
                let count = 0;
                if (i > 0) if (gridClone[i - 1][j]) count++;
                if (i > 0 && j > 0) if (gridClone[i - 1][j - 1]) count++;
                if (i > 0 && j < yAxis - 1) if (gridClone[i - 1][j + 1]) count++;
                if (j < yAxis - 1) if (gridClone[i][j + 1]) count++;
                if (j > 0) if (gridClone[i][j - 1]) count++;
                if (i < xAxis - 1) if (gridClone[i + 1][j]) count++;
                if (i < xAxis - 1 && j > 0) if (gridClone[i + 1][j - 1]) count++;
                if (i < xAxis - 1 && yAxis - 1) if (gridClone[i + 1][j + 1]) count++;
                if (gridClone[i][j] && (count < 2 || count > 3)) newGrid[i][j] = false;
                if (!gridClone[i][j] && count === 3) newGrid[i][j] = true;
            }
        }

        setGrid(newGrid);
        setGeneration((prev) => prev + 1);
    };

    return (
        <Row gutter={[16, 24]}>
            <Col span={24} className="gutter-row" style={{ display: "flex", justifyContent: "center" }}>
                <Space>
                    <Space.Compact direction="horizontal">
                        <Button type="dashed" size="large">
                            Старт
                        </Button>
                        <Button type="dashed" size="large">
                            Пауза
                        </Button>
                        <Button type="dashed" size="large">
                            Автозаполнение
                        </Button>
                        <Button type="dashed" size="large">
                            Сброс
                        </Button>
                    </Space.Compact>
                </Space>
            </Col>
            <Col span={24} className="gutter-row" style={{ display: "flex", justifyContent: "center" }}>
                <Space>Что-то тут</Space>
            </Col>
        </Row>
    );
};

export default LifesScreen;
