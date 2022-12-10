export interface InitialState{
    list: [] | ItemI[],
    size: number
    sizeVariables: number[],
    position : PositionI
}

export interface ItemI{
    id:number | string,
    title: string,
    children: ItemI[] | []
}
export interface PositionI {
    x: number,
    y: number,
}