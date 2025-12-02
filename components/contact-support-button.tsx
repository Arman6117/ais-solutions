"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdContactSupport, MdEmail, MdPhone, MdAccessTime } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSupportDepartments } from "@/actions/admin/support/get-support-data";
import { Building2, Loader2 } from "lucide-react";
import { ICON_COMPONENTS } from "@/lib/utils";

// Define types for local state based on what we expect from the server
type SupportMember = {
  _id: string;
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
};

type Department = {
  _id: string;
  name: string;
  icon: string;
  color: string;
  members: SupportMember[];
};

const ContactSupportButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && departments.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        const result = await getSupportDepartments();
        if (result.success && result.data) {
          setDepartments(result.data); // Cast if types slightly mismatch strict checks
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [open, departments.length]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="fixed z-30 bottom-10 right-5 sm:right-16">
        <Button className=" h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
          <MdContactSupport className="size-full" />
          <span className="sr-only">Contact Support</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MdContactSupport className="w-6 h-6 text-primary" />
            Support Team
          </DialogTitle>
          <DialogDescription>
            Find the right person to help you with your query.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading support contacts...</p>
          </div>
        ) : departments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
            <Building2 className="h-10 w-10 opacity-20" />
            <p>No support teams found.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue={departments[0]?._id} className="h-full flex flex-col">
              <div className="px-6 py-2 bg-slate-50/50 border-b">
                <ScrollArea className="w-full" >
                  <TabsList className="bg-transparent p-0 h-auto gap-2 w-full justify-start">
                    {departments.map((dept) => {
                      const Icon = ICON_COMPONENTS[dept.icon] || Building2;
                      return (
                        <TabsTrigger
                          key={dept._id}
                          value={dept._id}
                          className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-4 py-2 h-auto gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {dept.name}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </ScrollArea>
              </div>

              {departments.map((dept) => (
                <TabsContent key={dept._id} value={dept._id} className="flex-1 p-0 m-0 overflow-hidden">
                  <ScrollArea className="h-full max-h-[50vh] p-6 pt-4">
                    {dept.members.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {dept.members.map((member) => (
                          <div
                            key={member._id}
                            className="flex flex-col p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate">{member.name}</h4>
                                <Badge variant="secondary" className="text-[10px] font-normal h-5 px-1.5 mt-0.5">
                                  {member.designation}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm text-muted-foreground mt-auto">
                              <a 
                                href={`mailto:${member.email}`}
                                className="flex items-center gap-2 hover:text-primary transition-colors p-1.5 -ml-1.5 rounded-md hover:bg-slate-50"
                              >
                                <div className="bg-blue-50 text-blue-600 p-1 rounded-full">
                                  <MdEmail className="w-3.5 h-3.5" />
                                </div>
                                <span className="truncate">{member.email}</span>
                              </a>
                              
                              <a 
                                href={`tel:${member.contact}`}
                                className="flex items-center gap-2 hover:text-primary transition-colors p-1.5 -ml-1.5 rounded-md hover:bg-slate-50"
                              >
                                <div className="bg-green-50 text-green-600 p-1 rounded-full">
                                  <MdPhone className="w-3.5 h-3.5" />
                                </div>
                                <span className="truncate">{member.contact}</span>
                              </a>

                              <div className="flex items-center gap-2 p-1.5 -ml-1.5">
                                <div className="bg-amber-50 text-amber-600 p-1 rounded-full">
                                  <MdAccessTime className="w-3.5 h-3.5" />
                                </div>
                                <span className="truncate">{member.availableTime}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                        <p className="text-sm">No support members in this team yet.</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportButton;
