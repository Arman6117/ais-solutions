// lib/types/note.type.ts
export interface NoteTableSessionType {
    _id?: string;
    name: string;
    date: string;
    time: string;
    instructor?: string;
    module: string;
    chapter: string[];
  }
  
  export interface VideoLinksType {
    label: string;
    link: string;
  }
  
  export interface FilesType {
    label: string;
    link: string;
  }
  
  export interface NoteTableType {
    _id?: string;
    module: string;
    chapter: string;
    topics: string[]; // NEW: Array of topics
    session: NoteTableSessionType | null;
    createdAt?: string;
    videoLinks?: VideoLinksType[];
    files?: FilesType[];
  }
  