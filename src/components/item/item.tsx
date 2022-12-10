import styles from './item.module.css'
import {ItemI} from "../../models/initialState";
import ItemButton from "../item-button/item-button";
import List from "../list/list";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";
import {useAppSelector} from "../../hooks/redux";

export default function Item({item,first,last,onlyOne}:{item:ItemI,first:boolean,last:boolean,onlyOne:boolean}){
    const dispatch = useDispatch()
    const list = useAppSelector(({list}) => list);
    function getUpdatedList(list:ItemI[],id:number | string):ItemI[]{
        return list.reduce((acc,item) => {
            if(item.id !== id){
                const data = {...item,children: getUpdatedList(item.children, id)}
                acc.push(data as never)}
            return acc;
        },[])
    }

    return (
        <div
            className={styles.container}
        >
            {!!item.id && !onlyOne && (
                <>
                    <span
                        className={`${styles.line} ${styles.horizontal} ${first ? styles.first : ''} ${last ? styles.last : ''}`}
                    />
                    <span
                        className={`${styles.line} ${styles.vertical}`}
                    />
                </>
            )}
            <div className={styles.item}>
                <span
                    children={item.title}
                    className={styles.content}
                />
                <div className={styles.control}>
                    <ItemButton
                        status={'create'}
                        onClick={() => console.log(item.id)}
                    />
                    <ItemButton
                        onClick={() => console.log(item.id)}
                        status={'edit'}
                    />
                    <ItemButton
                        status={'delete'}
                        onClick={() => dispatch(appSlice.actions.removeItem(getUpdatedList(list,item.id)))}
                    />
                </div>
            </div>
            {!!item.children.length && (
                <>
                    <span
                        className={`${styles.line} ${styles.vertical}`}
                    />
                    <List list={item.children}/>
                </>
            )}
        </div>
    )
}