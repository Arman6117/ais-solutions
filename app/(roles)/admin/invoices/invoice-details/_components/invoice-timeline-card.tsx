import { Receipt, CalendarDays } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormattedPayment } from "@/lib/types/invoice";
import { PaymentMethodIcon } from "./invoice-icons";

export const InvoiceTimelineCard = ({ history }: { history: FormattedPayment[] }) => (
  <Card className="mb-6 shadow-sm">
    <CardHeader className="pb-4 border-b">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Receipt className="w-5 h-5" />
        Payment History
      </CardTitle>
      <CardDescription>
        Complete timeline of all invoice payments and transactions
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-6">
        {history.length > 0 ? (
          history.map((payment, index) => (
            <div key={index} className="relative pl-6 last:pb-0">
              {index !== history.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-slate-200"></div>
              )}

              <div className="flex items-start gap-4">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>

                <div className="flex-1 bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="font-bold text-xl text-slate-900">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 px-2 py-1 rounded">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(payment.paymentDate).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-slate-800">
                      {payment.courseName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Modules: </span>
                      {Array.isArray(payment.modules)
                        ? payment.modules.join(", ")
                        : payment.modules}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <Badge
                      variant="outline"
                      className="capitalize gap-1 pl-1 pr-2"
                    >
                      <PaymentMethodIcon method={payment.mode} />
                      {payment.mode}
                    </Badge>
                    {payment.notes && (
                      <div className="text-xs text-muted-foreground italic">
                        {payment.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No payment history found.
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
