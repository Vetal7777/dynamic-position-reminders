import styles from './item-button.module.css'
import {MdModeEditOutline} from "react-icons/md";

export default function ItemButton({status,onClick}:{onClick:() => void,status: 'delete' | 'create' | 'edit'}){
    const deleteStatus = status === 'delete';
    const editStatus = status === 'edit';
    const createStatus = status === 'create';

    return (
        <>
            <button
                className={`${styles.container} ${deleteStatus ? styles.delete : ''}`}
                onClick={onClick}
            >
                {editStatus && (
                  <MdModeEditOutline
                    fill={'#fff'}
                  />
                )}
                {(createStatus || deleteStatus) && (
                    <>
                        <span className={styles.line}/>
                        <span className={styles.line}/>
                    </>
                )}
            </button>
        </>
    )
}