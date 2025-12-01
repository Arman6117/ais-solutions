import { User, Mail, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InvoiceData } from "@/lib/types/invoice"; // Ensure this path is correct

export const StudentInfoCard = ({ student }: { student: InvoiceData["student"] }) => (
  <Card className="mb-6 shadow-sm">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <User className="w-5 h-5" />
        Student Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Full Name
          </Label>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-900">{student.name}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Email Address
          </Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{student.email}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Phone Number
          </Label>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{student.phone}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
