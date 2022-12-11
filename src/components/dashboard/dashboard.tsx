import styles from './dashboard.module.css'
import List from "../list/list";
import {useAppSelector} from "../../hooks/redux";
import {useEffect, useRef, useState} from "react";
import {ItemI, PositionI} from "../../models/initialState";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";
import Message from "../message/message";
import ArrowControlPosition from "../arrow-control-position/arrow-control-position";

export default function Dashboard(){
    const dispatch = useDispatch();

    const list:ItemI[] = useAppSelector(({list}) => [{
        type: 'Category',
        title: 'Categories',
        id: 0,
        children: [...list]
    }]);
    const newItem = useAppSelector(({newItem}) => newItem);
    const showMessage = !!newItem;
    const createMode = useAppSelector(({createMode}) => createMode);
    const editMode = useAppSelector(({editMode}) => !!editMode);
    const scale = useAppSelector(({size}) => size);
    const editPosition = useAppSelector(({position}) => position);
    const [initialPosition,setInitialPosition] = useState<PositionI | null>(null);
    const [move,setMove] = useState<boolean>(false);

    function onStartMove(mousePosition:PositionI) {
        if(!editMode && !createMode){
            !initialPosition && setInitialPosition(mousePosition);
            setMove(true);
        }
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

    return (
        <>
            <div
                className={styles.container}
                onMouseLeave={() => move && setMove(false)}
                onMouseUp={() => setMove(false)}
                onMouseMove={({nativeEvent}) => onMove({x:nativeEvent.x,y:nativeEvent.y})}

            >
                <ArrowControlPosition
                    type={'top'}
                />
                <ArrowControlPosition
                    type={'bottom'}
                />
                <ArrowControlPosition
                    type={'left'}
                />
                <ArrowControlPosition
                    type={'right'}
                />
                {showMessage && (
                    <Message onClick={(type) => dispatch(appSlice.actions.createItem({...newItem,type: type}))}/>
                )}
                <div
                    style={{
                        transform: `scale(${scale}) translate(${editPosition.x/scale}px,${editPosition.y/scale}px)`,
                    }}
                    className={styles.content}
                    onMouseDown={({nativeEvent}) => !showMessage && onStartMove({x:nativeEvent.x,y:nativeEvent.y})}
                >
                    <List list={list}/>
                </div>
            </div>
        </>
    )
}