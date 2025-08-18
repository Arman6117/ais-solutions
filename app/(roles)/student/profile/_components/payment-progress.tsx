// components/profile/PaymentProgress.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

type PaymentProgressProps = {
    totalFees:number,
    paidFees:number
}
const PaymentProgress = ({ totalFees, paidFees }:PaymentProgressProps) => {
  const paymentProgress = totalFees > 0 ? (paidFees / totalFees) * 100 : 0;

  return (
    <Card className="shadow-sm border-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Avatar className="bg-purple-100 p-3 w-12 h-12">
            <AvatarFallback className="bg-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </AvatarFallback>
          </Avatar>
          Payment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium">
            Overall Payment Completion
          </span>
          <span className="text-2xl font-bold">
            {Math.round(paymentProgress)}%
          </span>
        </div>
        <Progress value={paymentProgress} className="h-4" />
      </CardContent>
    </Card>
  );
};

export default PaymentProgress;