import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

type Files = {
    name: string;
    size: string;
  };
type FileDownloadProps  ={
  file:Files
}
const FileDownload = ({ file }:FileDownloadProps) => {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-500" />
          <div>
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-gray-500">{file.size}</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    );
  };

  export default FileDownload