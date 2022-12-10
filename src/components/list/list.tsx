import styles from './list.module.css'
import Item from "../item/item";
import {ItemI} from "../../models/initialState";

export default function List({list}:{list:ItemI[]}){
    return (
        <>
            <div className={styles.container}>
                {list.map((item,index) => (
                    <Item
                        item={item}
                        key={index}
                        first={!index}
                        last={(index + 1) === list.length}
                        onlyOne={list.length === 1}
                    />
                ))}
            </div>
        </>
    )
}