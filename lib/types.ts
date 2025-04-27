export type Column<T> = {
    id:string,
    header:string,
    accessor:(item:T)=>React.ReactNode
}

export type FilterOption = {
    label:string,
    value:string
}
