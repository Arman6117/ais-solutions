import { IndianRupee } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { InvoiceData } from "@/lib/types/invoice";

export const FeeSummaryCard = ({ summary }: { summary: InvoiceData["summary"] }) => {
  return (
    <Card className="mb-6 bg-slate-950 text-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <IndianRupee className="w-5 h-5" />
          Overall Fee Summary
        </CardTitle>
        <CardDescription className="text-slate-400">
          Complete financial overview across all enrolled courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">
              Payment Progress
            </Label>
            <span className="text-sm text-slate-300">
              {summary.paymentProgress}%
            </span>
          </div>
          <Progress
            value={parseFloat(summary.paymentProgress)}
            className="h-2 bg-slate-800 [&>div]:bg-white"
          />
        </div>

        <div className="flex gap-6 items-center justify-between pt-2">
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Total Fees
            </Label>
            <div className="text-2xl font-bold">
              ₹{summary.totalFees.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Amount Paid
            </Label>
            <div className="text-2xl font-bold text-green-400">
              ₹{summary.amountPaid.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Outstanding
            </Label>
            <div className="text-2xl font-bold text-orange-400">
              ₹{summary.remainingFees.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
