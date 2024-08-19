"use client";
import React, { useEffect } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "../Sidebar";
import MessageContainer from "./MessageContainer";

interface ChatLayoutprops {
  defaultLayout: number[] | undefined;
}

// when first time user visits the chat page the default dimensions are 320px and 480px

function ChatLayout({ defaultLayout = [320, 480] }: ChatLayoutprops) {
  const [isMobile, setisMobile] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenwidth = () => {
      setisMobile(window.innerWidth <= 760);
    };

    checkScreenwidth();

    window.addEventListener("resize", checkScreenwidth);
    return () => {
      window.removeEventListener("resize", checkScreenwidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch bg-background rounded-lg"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={8}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setisCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=true`;
        }}
        onExpand={() => {
          setisCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=false`;
        }}
        className={cn(
          isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        { /* <div className="flex justify-center items-center h-full w-full px-10">
            <div className="flex flex-col justify-center items-center gap-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full md:w-2/3 lg:w-1/2"
              />
              <p className="text-muted-foreground text-center">
                Click on a chat to view the messages
              </p>
            </div>
          </div>*/}
          <MessageContainer/>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ChatLayout;
