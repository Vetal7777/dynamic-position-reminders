export interface InitialState{
    list: [] | ItemI[],
    size: number
    sizeVariables: number[],
    position : PositionI
    editMode: number | null | string,
    createMode: null | number | string,
    newItem: null | NewItemI
}

export interface ItemI{
    type: 'Category' | 'Service' | null
    id:number | string,
    title: string,
    children: ItemI[] | []
}

export interface NewItemI extends ItemI{
    parent: string | number
}

export interface PositionI {
    x: number,
    y: number,
}