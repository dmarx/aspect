// web/src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Button variant="ghost" className="mr-2" onClick={() => setShowSidebar(!showSidebar)}>
              <Command className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <Input 
              type="search"
              placeholder="Search notes..." 
              className="w-[200px] sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="container flex gap-6 pb-8 pt-6">
        {/* Sidebar */}
        <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
          <SheetContent side="left" className="w-[300px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Browse through your digital garden
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              {/* Note List Component will go here */}
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
