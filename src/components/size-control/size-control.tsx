import styles from './size-control.module.css'
import ButtonControlSize from "../button-control-size/button-control-size";
import SelectSize from "../select-size/select-size";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function SizeControl(){
    const dispatch = useDispatch()

    return (
        <>
            <div className={styles.container}>
                <ButtonControlSize
                    status={"minus"}
                    onClick={(message) => dispatch(appSlice.actions.setSize(message))}
                />
                <SelectSize/>
                <ButtonControlSize
                    status={"plus"}
                    onClick={(message) => dispatch(appSlice.actions.setSize(message))}
                />
            </div>
        </>
    )
}