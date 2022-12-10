import {useState} from "react";
import styles from './select-size.module.css'
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";

export default function SelectSize(){
    const dispatch = useDispatch()

    const size = useAppSelector(({size}) => size);
    const [showVariables,setShowVariables] = useState<boolean>(false)
    const sizeVariables = useAppSelector(({sizeVariables}) => sizeVariables);
    function setProperty(variable:number){
        dispatch(appSlice.actions.setSize(variable));
        setShowVariables(false)
    }
    return (
        <>
            <div className={styles.container}>
                <span
                    children={size * 100 + ' %'}
                    className={styles.select}
                    onClick={() => setShowVariables(!showVariables)}
                />
                {showVariables && (
                    <div className={styles.variables}>
                        {
                            sizeVariables
                                .map((variable,index) => (
                                    <span
                                        onClick={() => setProperty(variable)}
                                        key={index}
                                        className={styles.option}
                                        children={variable * 100 + ' %'}
                                    />
                                ))
                        }
                    </div>
                )}
            </div>
        </>
    )
}