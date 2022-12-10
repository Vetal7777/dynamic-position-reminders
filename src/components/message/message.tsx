import styles from './message.module.css'

export default function Message({onClick}:{onClick:(type:'Category' | 'Service' | null) => void}){
    return (
        <>
            <div className={styles.container}>
                <span
                    className={styles.title}
                    children={'What do you want to create?'}
                />
                <div className={styles.control}>
                    <button
                        className={styles.button}
                        children={'Category'}
                        onClick={() => onClick('Category')}
                    />
                    <button
                        className={styles.button}
                        children={'Service'}
                        onClick={() => onClick('Service')}
                    />
                </div>
            </div>
        </>
    )
}