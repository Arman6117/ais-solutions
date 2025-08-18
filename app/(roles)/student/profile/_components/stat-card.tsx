// components/profile/StatCard.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


type StatCardProps = {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    color: 'blue' | 'emerald' | 'orange' | 'purple';
}
const StatCard = ({ icon, value, label, color }:StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100',
    emerald: 'bg-emerald-100',
    orange: 'bg-orange-100',
    purple: 'bg-purple-100',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
  };

  return (
    <Card className="shadow-sm border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className={`${colorClasses[color]} p-4 w-16 h-16`}>
            <AvatarFallback className={`${colorClasses[color]} ${iconColorClasses[color]}`}>
              {icon}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
            <div className="text-muted-foreground text-sm font-medium">
              {label}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;