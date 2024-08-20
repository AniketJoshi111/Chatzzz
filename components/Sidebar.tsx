import React from "react";
import { User, USERS } from "@/db/dummy";
import { ScrollArea } from "./ui/scroll-area";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogOut, Pointer } from "lucide-react";
import useSound from "use-sound";
import { usePreferences } from "@/store/usePreferences";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSelectedUser } from "@/store/useSelectedUser";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
interface Sidebarprops {
  isCollapsed: boolean;
  users:User[];
}
const Sidebar = ({ isCollapsed , users}: Sidebarprops) => {
  const [playClickSound] = useSound("/sounds/mouse-click.mp3");
  const { soundEnabled } = usePreferences();
  const {setSelectedUser , selectedUser} = useSelectedUser();

  const {user} = useKindeBrowserClient();

  return (
    <div className="group relative flex flex-col h-full p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background">
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
          </div>
        </div>
      )}

      <ScrollArea className="gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {users.map((user, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      soundEnabled && playClickSound() ;
                      setSelectedUser(user);
                    }}
                  >
                    <Avatar className="my-1 flex jusitfy-center items-center">
                      <AvatarImage
                        src={user.image || "/user-placeholder.png"}
                        alt="User image"
                        className="border-2 border-white rounded-full w-10 h-10"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="" sr-only>
                      {user.name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={index}
              variant={"grey"}
              size={"xl"}
              className={cn(
                "w-full justify-start gap-4 my-1",
                selectedUser?.email == user.email &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink"
              )}
              onClick={() => {
                soundEnabled && playClickSound();
                setSelectedUser(user);
              }}
            >
              <Avatar className="my-1 flex justify-center items-center">
                <AvatarImage
                  src={user.image || "/user-placeholder.png"}
                  alt="User image"
                  className="border-2 border-white rounded-full w-10 h-10"
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
              </div>
            </Button>
          )
        )}
      </ScrollArea>

      {/*logout seciton */}
      <div className="mt-auto">
        <div className="flex justify-between items-center gap-2 md:px-6 py-2">
          {!isCollapsed && (
            <div className="hidden md:flex gap-2 items-center">
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={user?.picture || "/user-placeholder.png"}
                  alt="User image"
                  referrerPolicy="no-referrer"   // img from google accounts it cannot render sometimes 
                  className="border-2 border-white rounded-full w-10 h-10"
                />
              </Avatar>
              <p className="font-bold">{user?.given_name} {user?.family_name}</p>
            </div>
          )}
          <div
            className="flex"
            onClick={() => {
              soundEnabled && playClickSound();
            }}
          >
            <LogoutLink>
              <LogOut size={22} cursor={"pointer"} />
            </LogoutLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
