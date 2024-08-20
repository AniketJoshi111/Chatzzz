import MessageList from "./MessageList"
import ChatTopbar from "./ChatTopbar"
import ChatBottomBar from "./ChatBottomBar"
import { useEffect } from "react"
import { useSelectedUser } from "@/store/useSelectedUser"
const MessageContainer = () =>{
    const {setSelectedUser} = useSelectedUser();
    useEffect(() => {

        const handleEscape = (e:KeyboardEvent)=>{
            if(e.key == "Escape") setSelectedUser(null);
        };

        document.addEventListener("keydown",handleEscape)
        return () => {
            document.removeEventListener("keydown",handleEscape);
        };
    }, [setSelectedUser]);
    return(
        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopbar />
            <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
                <MessageList/>
                <ChatBottomBar/>
            </div>
        </div>
    )
}
export default MessageContainer