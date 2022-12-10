import styles from './item.module.css'
import {ItemI} from "../../models/initialState";
import ItemButton from "../item-button/item-button";
import List from "../list/list";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducers/appSlice";
import {useAppSelector} from "../../hooks/redux";
import Bones from "../bones/bones";
import {useEffect, useState} from "react";

export default function Item({item,first,last,onlyOne}:{item:ItemI,first:boolean,last:boolean,onlyOne:boolean}){
    const dispatch = useDispatch()

    const list = useAppSelector(({list}) => list);
    const editMode = useAppSelector(({editMode}) => editMode === item.id);
    const alpha = !item.id;
    const [editValue,setEditValue] = useState<string>('')

    function getUpdatedList(list:ItemI[],id:number | string,status: 'delete' | 'edit'):ItemI[]{
        return list.reduce((acc,item) => {
            const remove = (status === 'delete') && (item.id !== id);
            const edit = status === 'edit'
            switch (true){
                case remove:
                    const data = {...item,children: getUpdatedList(item.children, id,'delete')}
                    acc.push(data as never)
                break;
                case edit:
                    if(item.id !== id){
                        const data = {...item,children: getUpdatedList(item.children,id,'edit')};
                        acc.push(data as never)
                    }else {
                        const data = {...item,title: editValue};
                        acc.push(data as never)
                    }
                break;
            }
            return acc;
        },[])
    }
    function onEdit(){
        dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'edit')));
        dispatch(appSlice.actions.setEditMode(null));
    }

    useEffect(() => {
        if(editMode){
            setEditValue(item.title);
        }
    },[editMode])

    return (
        <div
            className={styles.container}
        >
            {!alpha && !onlyOne && (
                <Bones status={'top'} first={first} last={last}/>
            )}
            <div className={styles.item}>
                {!editMode && (
                    <span
                        children={item.title}
                        className={styles.content}
                    />
                )}
                {editMode && (
                    <input
                        value={editValue}
                        className={styles.content}
                        placeholder={'Category name'}
                        onChange={({target}) => setEditValue(target.value)}
                    />
                )}
                <div className={styles.control}>
                    {editMode && (
                        <>
                            <ItemButton
                                onClick={() => dispatch(appSlice.actions.setEditMode(null))}
                                status={'cancel'}
                            />
                            <ItemButton
                                onClick={() => onEdit()}
                                status={'edit'}
                            />
                        </>
                    )}
                    {!editMode && (
                        <ItemButton
                            status={'create'}
                            onClick={() => console.log(item.id)}
                        />
                    )}
                    {(!alpha && !editMode) && (
                        <>
                            <ItemButton
                                onClick={() => dispatch(appSlice.actions.setEditMode(item.id))}
                                status={'edit-start'}
                            />
                            <ItemButton
                                status={'delete'}
                                onClick={() => dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'delete')))}
                            />
                        </>
                    )}
                </div>
            </div>
            {!!item.children.length && (
                <>
                    <Bones status={'bottom'}/>
                    <List list={item.children}/>
                </>
            )}
        </div>
    )
}