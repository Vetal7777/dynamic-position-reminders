import styles from './item-button.module.css'
import {MdModeEditOutline} from "react-icons/md";
import {BsCheckLg} from "react-icons/bs";

export default function ItemButton({status,onClick}:{onClick:() => void,status: 'delete' | 'create' | 'edit' | 'cancel' | 'edit-start'}){
    const deleteStatus = status === 'delete';
    const editStartStatus = status === 'edit-start';
    const editStatus = status === 'edit';
    const createStatus = status === 'create';
    const cancelStatus = status === 'cancel';

    return (
        <>
            <button
                className={`${styles.container} ${deleteStatus ? styles.delete : ''} ${cancelStatus ? styles.cancel : ''} ${editStatus ? styles.edit : ''}`}
                onClick={onClick}
            >
                {editStartStatus && (
                  <MdModeEditOutline
                    fill={'#fff'}
                  />
                )}
                {editStatus && (
                    <BsCheckLg
                        fill={'#fff'}
                    />
                )}
                {(createStatus || deleteStatus || cancelStatus) && (
                    <>
                        <span className={styles.line}/>
                        <span className={styles.line}/>
                    </>
                )}
            </button>
        </>
    )
}