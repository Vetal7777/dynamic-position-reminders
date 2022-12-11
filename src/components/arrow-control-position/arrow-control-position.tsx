import styles from './arrow-control-position.module.css'
import {IoIosArrowUp} from "react-icons/io";
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function ArrowControlPosition({type}:{type: 'top' | 'bottom' | 'left' | 'right'}){
    const dispatch = useDispatch();

    const typeClass = `${type === 'top' ? styles.top : ''}${type === 'bottom' ? styles.bottom : ''}${type === 'left' ? styles.left : ''}${type === 'right' ? styles.right : ''}`;
    const position = useAppSelector(({position}) => position);

    function setPosition(){
        switch (true) {
            case type === 'top':
                dispatch(appSlice.actions.setPosition({...position,y: position.y - 10}))
            break;
            case type === 'bottom':
                dispatch(appSlice.actions.setPosition({...position,y: position.y + 10}))
            break;
            case type === 'left':
                dispatch(appSlice.actions.setPosition({...position,x: position.x - 10}))
            break;
            case type === 'right':
                dispatch(appSlice.actions.setPosition({...position,x: position.x + 10}))
            break;
        }
    }
    return (
        <>
            <button
                children={<IoIosArrowUp fill={'white'}/>}
                className={`${styles.container} ${typeClass}`}
                onClick={setPosition}
            />
        </>
    )
}