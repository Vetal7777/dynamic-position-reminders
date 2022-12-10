import styles from './position-control.module.css'
import {FaLocationArrow} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function PositionControl(){
    const dispatch = useDispatch()

    return (
        <>
            <button
                className={styles.container}
                children={<FaLocationArrow fill={'#e0e0e0'}/>}
                onClick={() => dispatch(appSlice.actions.setPosition({x:0,y:0}))}
            />
        </>
    )
}