export interface InitialState{
    list: [] | ItemI[],
    size: number
    sizeVariables: number[],
    position : PositionI
    editMode: number | null | string,
    createMode: null | number | string
}

export interface ItemI{
    type: 'Category' | 'Service'
    id:number | string,
    title: string,
    children: ItemI[] | []
}
export interface PositionI {
    x: number,
    y: number,
}