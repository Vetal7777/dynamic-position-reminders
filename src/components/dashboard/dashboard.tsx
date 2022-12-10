import styles from './dashboard.module.css'
import List from "../list/list";
import {useAppSelector} from "../../hooks/redux";
import {useState} from "react";
import {PositionI} from "../../models/initialState";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function Dashboard(){
    const dispatch = useDispatch();

    const list = useAppSelector(({list}) => [{
        title: 'Categories',
        id: 0,
        children: [...list]
    }]);
    const scale = useAppSelector(({size}) => size)
    const position = useAppSelector(({position}) => position);
    const [initialPosition,setInitialPosition] = useState<PositionI | null>(null);
    const [move,setMove] = useState<boolean>(false);

    function onStartMove(mousePosition:PositionI) {
        !initialPosition && setInitialPosition(mousePosition);
        setMove(true);
    }
    function onMove(mousePosition:PositionI){
        if((initialPosition !== null) && move){
            dispatch(appSlice.actions.setPosition(
                {
                    x: mousePosition.x - initialPosition.x,
                    y: mousePosition.y - initialPosition.y
                }
            ))
        }
    }
    function onEndMove(){
        setMove(false)
    }

    return (
        <>
            <div
                className={styles.container}
                onMouseLeave={() => move && onEndMove()}
                onMouseUp={onEndMove}
            >
                <div
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px,${position.y}px)`,
                    }}
                    className={styles.content}
                    onMouseDown={({nativeEvent}) => onStartMove({x:nativeEvent.x,y:nativeEvent.y})}
                    onMouseMove={({nativeEvent}) => onMove({x:nativeEvent.x,y:nativeEvent.y})}
                >
                    <List list={list}/>
                </div>
            </div>
        </>
    )
}