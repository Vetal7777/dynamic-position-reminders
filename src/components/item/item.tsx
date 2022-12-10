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
    const createMode = useAppSelector(({createMode}) => createMode === item.id);
    const alpha = !item.id;
    const [Value,setValue] = useState<string>('')

    function getUpdatedList(list:ItemI[],id:number | string,status: 'delete' | 'edit' | 'create'):ItemI[]{
        return list.reduce((acc,item) => {
            const remove = (status === 'delete') && (item.id !== id);
            const edit = status === 'edit'
            const create = status === 'create';
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
                        const data = {...item,title: Value};
                        acc.push(data as never)
                    }
                break;
                case create:
                    const newItem = {
                        title: '',
                        id: Math.round(Math.random() * 10000000),
                        type: 'Category',
                        children: []
                    };
                    if(item.id !== id){
                        const data = {...item,children: getUpdatedList(item.children,id,'create')};
                        acc.push(data as never)
                    }
                    else {
                        const data = {...item,children: [
                            ...item.children,newItem]};
                        acc.push(data as never)
                    }
                break;
            }
            return acc;
        },[])
    }
    function onEdit(){
        dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'edit')));
        switch (true){
            case editMode:
                dispatch(appSlice.actions.setEditMode(null));
            break;
            case createMode:
                dispatch(appSlice.actions.setCreateMode(null));
            break;
        }
    }
    function onCreate(){
        const newItem = {
            title: '',
            id: Math.round(Math.random() * 10000000),
            type: '',
            children: []
        };
        switch (true){
            case alpha:
                dispatch(appSlice.actions.setList([...list,{...newItem,type: 'Category'}]))
                dispatch(appSlice.actions.setCreateMode(newItem.id));
            break;
        }
    }
    function onCancel(){
        switch (true){
            case editMode:
                dispatch(appSlice.actions.setEditMode(null))
            break;
            case createMode:
                dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'delete')))
            break;
        }
    }

    useEffect(() => {
        if(editMode){
            setValue(item.title);
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
                {(!editMode && !createMode) && (
                    <span
                        children={item.title}
                        className={styles.content}
                    />
                )}
                {(editMode || createMode) && (
                    <input
                        autoFocus
                        value={Value}
                        className={styles.content}
                        placeholder={'Category name'}
                        onChange={({target}) => setValue(target.value)}
                    />
                )}
                <div className={styles.control}>
                    {(editMode || createMode) && (
                        <>
                            <ItemButton
                                onClick={onCancel}
                                status={'cancel'}
                            />
                            <ItemButton
                                onClick={onEdit}
                                status={'edit'}
                            />
                        </>
                    )}
                    {(!editMode && !createMode) && (
                        <ItemButton
                            status={'create'}
                            onClick={onCreate}
                        />
                    )}
                    {(!alpha && !editMode && !createMode) && (
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