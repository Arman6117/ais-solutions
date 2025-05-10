import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import Link from "next/link";


type NoteCard = {
    note: {
        id: string;
        [key: string]: any; // Adjust this type based on your note structure
    };
    columns: {
        id: string;
        header: string;
        accessor: (note: any) => React.ReactNode; // Adjust this type based on your note structure
    }[];
    selectedIds: string[];
    handleToggleSelect: (id: string) => void;
    handleDeleteSelected: (ids: string[]) => void;
}
const NoteCard = ({
    note,
    columns,
    selectedIds,
    handleToggleSelect,
    handleDeleteSelected,
  }:NoteCard) => (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="flex justify-between items-center mb-2">
        <Checkbox
          checked={selectedIds.includes(note.id)}
          onCheckedChange={() => handleToggleSelect(note.id)}
          className="mr-2"
        />
        <Button
          className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-destructive hover:text-white"
          variant="outline"
          onClick={() => handleDeleteSelected([note.id])}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <Link href={`/notes/${note.id}?mode=view`} className="block">
        {columns.map((col) => (
          <div key={col.id} className="py-1 border-b last:border-b-0">
            <div className="font-medium text-sm text-gray-500">{col.header}</div>
            <div>{col.accessor(note)}</div>
          </div>
        ))}
      </Link>
    </div>
  );
export default NoteCard;  