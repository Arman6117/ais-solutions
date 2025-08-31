export interface NoteTableSessionType {
    _id?:string
    name:string,
    date:string,
    time:string,
    instructor?:string
    module:string
    chapter:string
}
export interface VideoLinksType {
    label:string,
    link:string
}
export interface FilesType {
    label:string,
    link:string
}
export interface NoteTableType {
    _id?:string,
    module: string,
    chapter: string,
    session: NoteTableSessionType | null,
    createdAt?:string,
    videoLinks?:VideoLinksType[],
    files?:FilesType[]
}