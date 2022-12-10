import styles from './button-control-size.module.css'

export default function ButtonControlSize({status,onClick}: {status: 'plus' | 'minus',onClick: (status:string) => void}){
    return (
        <>
            <button
                onClick={() => onClick(status)}
                className={styles.container}
            >
                <span className={styles.line}/>
                {status === 'plus' &&(<span className={styles.line}/>)}
            </button>
        </>
    )
}