import { FC } from "react";
import { useAppSelector } from "../../app/store";
import { selectGameFiledYAxis, selectGameNet } from "../../features/game-settings/game-settings-selectors";
import clsx from "clsx";
import s from "./game-net.module.scss";

const GameNet: FC = () => {
    const gameNet = useAppSelector(selectGameNet);
    const yAxis = useAppSelector(selectGameFiledYAxis);
    const width = yAxis * 14;

    return (
        <div className={s.gameNet} style={{ width }}>
            {gameNet.map((rowArr, rowIdx, arr) =>
                rowArr.map((_, colIdx) => {
                    const id = `${rowIdx}_${colIdx}`;
                    return <div key={id} className={clsx(s.life, arr[rowIdx][colIdx] ? s.alive : s.died)} id={id} />;
                })
            )}
        </div>
    );
};

export default GameNet;
