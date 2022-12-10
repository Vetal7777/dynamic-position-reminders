import styles from './bones.module.css'
import List from "../list/list";

export default function Bones({status,first,last}:{status: 'top' | 'bottom',first?: boolean,last?: boolean}){
    return (
        <>
            {(status === 'top') && (
                <>
                    <span
                        className={`${styles.line} ${styles.horizontal} ${first ? styles.first : ''} ${last ? styles.last : ''}`}
                    />
                    <span
                        className={`${styles.line} ${styles.vertical}`}
                    />
                </>
            )}
            {(status === 'bottom') && (
                <>
                    <span
                        className={`${styles.line} ${styles.vertical}`}
                    />
                </>
            )}
        </>
    )
}