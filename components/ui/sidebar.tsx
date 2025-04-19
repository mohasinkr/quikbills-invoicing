"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import { ChevronLeft, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import LogoutConfirmationDialog from "@/components/common/logout-confirmation-dialog";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "group flex h-screen flex-col border-r bg-card",
        "transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-[90px]" : "w-[250px]"
      )}
    >
      <div className="flex h-[60px] items-center justify-between border-b px-4">
        {/* logo */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Wallet className="h-6 w-6 flex-shrink-0 text-primary" />
          <span
            className={cn(
              "whitespace-nowrap font-semibold transition-[transform,opacity] duration-200",
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

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="flex flex-col space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link href={item.href} key={item.href} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "h-12 w-full justify-start rounded-md text-base",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                <span
                  className={cn(
                    "transition-[transform,opacity] duration-200",
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
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <LogoutConfirmationDialog
          trigger={
            <Button
              variant="ghost"
              className={cn(
                "h-12 w-full justify-start rounded-md text-base",
                "transition-[transform,opacity] duration-200"
              )}
            >
              <LogOut className="h-6 w-6 flex-shrink-0 text-red-500" />
              <span
                className={cn(
                  "transition-[transform,opacity] duration-200",
                  "whitespace-nowrap pl-3 text-red-500",
                  isCollapsed
                    ? "translate-x-12 transform opacity-0"
                    : "translate-x-0 transform opacity-100"
                )}
              >
                Logout
              </span>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
