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
    const newItem = useAppSelector(({newItem}) => newItem);
    const blockClick = !!newItem;
    const alpha = !item.id;
    const [Value,setValue] = useState<string>('')
    const [depth,setDepth] = useState<number | null>(null);

    function getDepth(list:ItemI[],id:number | string,depth:number):void{
        list.forEach(item => {
            const found = item.id === id;
            const haveChildren = !!item.children.length;
            switch (true) {
                case found:
                    setDepth(depth);
                break;
                case !id:
                    setDepth(0)
                break;
                case !found && haveChildren:
                    getDepth(item.children,id,(depth + 1) === 4 ? 1 : depth + 1);
                break;
            }
        })
    }
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
                    const createdItem = {...newItem};
                    delete createdItem.parent;
                    if(item.id !== id){
                        const data = {...item,children: getUpdatedList(item.children,id,'create')};
                        acc.push(data as never)
                    }else {
                        const data = {...item,children: [...item.children,createdItem]};
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
        const data:ItemI = {
            title: '',
            id: Math.round(Math.random() * 10000000),
            type: null,
            children: []
        };
        switch (true){
            case alpha:
                dispatch(appSlice.actions.setList([...list, {...data, type: 'Category'}]));
                dispatch(appSlice.actions.setCreateMode(data.id));
            break;
            case !!item.children.length:
                dispatch(appSlice.actions.createItem({...data,type: item.children[0].type,parent: item.id}))
                dispatch(appSlice.actions.setCreateMode(data.id));
            break;
            default:
                dispatch(appSlice.actions.createItem({...data,parent: item.id}))
        }
    }
    function onCancel(){
        switch (true){
            case editMode:
                dispatch(appSlice.actions.setEditMode(null))
            break;
            case createMode:
                dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'delete')))
                dispatch(appSlice.actions.setCreateMode(null))
            break;
        }
    }

    useEffect(() => {
        if(editMode){
            setValue(item.title);
        }
    },[editMode])
    useEffect(() => {
        if(newItem !== null && !!newItem.type){
            const id = newItem.id;
            dispatch(appSlice.actions.setList(getUpdatedList(list,newItem.parent,'create')))
            dispatch(appSlice.actions.setCreateMode(id));
            dispatch(appSlice.actions.createItem(null));
        }
    },[newItem])
    useEffect(() => {
        getDepth(list,item.id,1);
    },[])

    return (
        <>
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
                            className={`${styles.content} ${!depth ? styles.zero : 0} ${depth === 1 ? styles.first : ''} ${depth === 2 ? styles.second : ''} ${depth === 3 ? styles.third : ''}`}
                        />
                    )}
                    {(editMode || createMode) && (
                        <input
                            autoFocus
                            value={Value}
                            className={styles.input}
                            placeholder={`${item.type} name`}
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
                                    onClick={() => !!Value.trim() && onEdit()}
                                    status={'edit'}
                                />
                            </>
                        )}
                        {(!editMode && !createMode) && (
                            <ItemButton
                                status={'create'}
                                onClick={() => !blockClick && onCreate()}
                            />
                        )}
                        {(!alpha && !editMode && !createMode) && (
                            <>
                                <ItemButton
                                    onClick={() => !blockClick && dispatch(appSlice.actions.setEditMode(item.id))}
                                    status={'edit-start'}
                                />
                                <ItemButton
                                    status={'delete'}
                                    onClick={() => !blockClick && dispatch(appSlice.actions.setList(getUpdatedList(list,item.id,'delete')))}
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
        </>
    )
}