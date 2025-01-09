"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import {
    ChevronLeft,
    Wallet
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "group flex h-screen flex-col border-r bg-card",
        "transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-[90px]" : "w-[250px]"
      )}
    >
      <div className="flex h-[60px] gap-2 items-center border-b px-4">
        {/* logo */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Wallet className="h-6 w-6 flex-shrink-0 text-primary" />
          <span
            className={cn(
              "font-semibold transition-[transform,opacity] duration-200 whitespace-nowrap",
              isCollapsed
                ? "-translate-x-8 transform opacity-0"
                : "translate-x-0 transform opacity-100"
            )}
          >
            quikBills Invoicing
          </span>
        </div>

        {/* sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "transition-transform duration-300",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 space-y-2">
        {/* <div className="space-y-2 py-4"> */}
          {SIDEBAR_ITEMS.map((item) => (
            <Link href={item.href} key={item.href}>
              <Button variant="ghost" className="text-base h-12 w-full justify-start">
                <item.icon className="flex-shrink-0 w-6 h-6" />
                <span
                  className={cn(
                    "font-semibold transition-[transform,opacity] duration-200",
                    "whitespace-nowrap pl-3",
                    isCollapsed
                      ? "translate-x-12 transform opacity-0"
                      : "translate-x-0 transform opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        {/* </div> */}
      </ScrollArea>

      {/* <div className="border-t p-4">
        <Button
          className={cn(
            "h-10 w-full",
            "transition-[transform,opacity] duration-200",
            "whitespace-nowrap",
            isCollapsed ? "px-0 translate-x-12 transform opacity-0" : "justify-start px-4"
          )}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          <span
            className={cn(
              "transition-[transform,opacity] duration-200",
              "absolute left-[36px] whitespace-nowrap",
              isCollapsed
                ? "translate-x-12 transform opacity-0"
                : "translate-x-0 transform opacity-100"
            )}
          >
            New Invoice
          </span>
          <LogoutButton />
        </Button>
      </div> */}
    </div>
  );
};

export default Sidebar;
