import styles from './header.module.css'
import SizeControl from "../size-control/size-control";

export default function Header(){
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 children={'Services'}/>
                    <span className={styles.logo} children={'0'}/>
                </div>
                <div className={styles.control}>
                    <SizeControl/>
                </div>
            </div>
        </>
    )
}