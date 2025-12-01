import {
    Monitor,
    Wifi,
    Building,
    Smartphone,
    CreditCard,
    Banknote,
    Receipt,
  } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  
  export const BatchTypeIcon = ({ type }: { type: string }) => {
    const normalizedType = type.toLowerCase();
    const config = {
      online: {
        icon: Monitor,
        color: "bg-blue-100 text-blue-700",
        label: "Online",
      },
      hybrid: {
        icon: Wifi,
        color: "bg-purple-100 text-purple-700",
        label: "Hybrid",
      },
      offline: {
        icon: Building,
        color: "bg-green-100 text-green-700",
        label: "Offline",
      },
    };
  
    const { icon: Icon, color, label } =
      config[normalizedType as keyof typeof config] || config.offline;
    return (
      <Badge variant="secondary" className={`${color} font-medium`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    );
  };
  
  export const PaymentMethodIcon = ({ method }: { method: string }) => {
    const normalizedMethod = method.toLowerCase();
    let Icon = Receipt;
    let color = "text-gray-600";
  
    if (normalizedMethod.includes("upi")) {
      Icon = Smartphone;
      color = "text-orange-600";
    } else if (normalizedMethod.includes("card")) {
      Icon = CreditCard;
      color = "text-blue-600";
    } else if (normalizedMethod.includes("cash")) {
      Icon = Banknote;
      color = "text-green-600";
    }
  
    return <Icon className={`w-4 h-4 ${color}`} />;
  };
  