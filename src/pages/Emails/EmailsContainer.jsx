import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inbox, Send, File, Trash2, Mail, Search, Users2, AlertCircle, MessagesSquare, ShoppingCart, Archive } from 'lucide-react'

const Nav = ({ isCollapsed, links }) => {
   return (
      <div className={`flex flex-col gap-4 py-2 ${isCollapsed ? 'items-center' : ''}`}>
         {links.map((link, index) => (
            <Button key={index} variant={link.variant} size={isCollapsed ? "icon" : "sm"} className={isCollapsed ? "w-10 h-10" : "justify-start w-full"}>
               <link.icon className={isCollapsed ? "h-4 w-4" : "mr-2 h-4 w-4"} />
               {!isCollapsed && link.title}
               {!isCollapsed && link.label && (
                  <span className="ml-auto text-xs font-semibold">{link.label}</span>
               )}
            </Button>
         ))}
      </div>
   );
};

const MailList = ({ items, setSelectedMail }) => {
   return (
      <ScrollArea className="h-[70vh] pb-16 overflow-y-auto">
         {items.map((mail, index) => (
            <div onClick={() => setSelectedMail(mail)} key={index} className="flex items-center p-4 cursor-pointer hover:bg--100">
               <div className="flex-1">
                  <h4 className="text-sm font-semibold">{mail.subject}</h4>
                  <p className="text-sm text-gray-500">{mail.preview}</p>
               </div>
               <span className="text-xs text-gray-400">{mail.date}</span>
            </div>
         ))}
      </ScrollArea>
   );
};

const MailDisplay = ({ mail }) => {
   if (!mail) return <div className="p-4">Select an email to view</div>;

   return (
      <div className="p-4">
         <h2 className="text-2xl font-bold mb-2">{mail.subject}</h2>
         <p className="text-sm text-gray-500 mb-4">From: {mail.from}</p>
         <div className="prose max-w-none">
            {mail.content}
         </div>
      </div>
   );
};

const EmailsContainer = () => {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [selectedMail, setSelectedMail] = useState(null);

   const accounts = [
      { label: "Personal", email: "m@example.com" },
      { label: "Work", email: "m@company.com" },
   ];

   const mails = [
      { id: 1, subject: "Weekly Report", from: "boss@company.com", preview: "Here's this week's progress report...", date: "10:30 AM", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc." },
      { id: 2, subject: "Team Meeting", from: "hr@company.com", preview: "Reminder: Team meeting at 2 PM today...", date: "9:15 AM", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { id: 3, subject: "New Project Proposal", from: "client@example.com", preview: "I've attached the new project proposal for your review...", date: "Yesterday", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { id: 3, subject: "New Project Proposal", from: "client@example.com", preview: "I've attached the new project proposal for your review...", date: "Yesterday", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { id: 3, subject: "New Project Proposal", from: "client@example.com", preview: "I've attached the new project proposal for your review...", date: "Yesterday", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
   ];

   const navLinks = [
      { title: "Inbox", label: "128", icon: Inbox, variant: "default" },
      { title: "Sent", label: "", icon: Send, variant: "ghost" },
      { title: "Trash", label: "", icon: Trash2, variant: "ghost" },
   ];
   return (
      <TooltipProvider delayDuration={0}>
         <ResizablePanelGroup direction="horizontal" className="h-full max-h-[85vh] items-stretch">
            <ResizablePanel defaultSize={20} collapsible={true} minSize={15} maxSize={20} onCollapse={() => setIsCollapsed(true)} onExpand={() => setIsCollapsed(false)}>
               <div className="flex h-[52px] items-center justify-center">
                  <Button variant="ghost" className="w-full justify-start">
                     <Mail className="mr-2 h-4 w-4" />
                     {!isCollapsed && accounts[0].email}
                  </Button>
               </div>
               <Separator />
               <Nav isCollapsed={isCollapsed} links={navLinks} />

            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className='' defaultSize={30}>
               <Tabs defaultValue="all">
                  <div className="flex items-center px-4 py-2">
                     <h1 className="text-xl font-bold">Inbox</h1>
                     <TabsList className="ml-auto">
                        <TabsTrigger value="all">All mail</TabsTrigger>

                     </TabsList>
                  </div>
                  <Separator />
                  <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                     <form>
                        <div className="relative">
                           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Search" className="pl-8" />
                        </div>
                     </form>
                  </div>
                  <TabsContent value="all" className="m-0">
                     <MailList setSelectedMail={setSelectedMail} items={mails} />
                  </TabsContent>

               </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
               <MailDisplay mail={selectedMail || mails[0]} />
            </ResizablePanel>
         </ResizablePanelGroup>
      </TooltipProvider>
   );
};

export default EmailsContainer;

