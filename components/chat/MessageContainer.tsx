import MessageList from "./MessageList"
import ChatTopbar from "./ChatTopbar"
import ChatBottomBar from "./ChatBottomBar"
const MessageContainer = () =>{
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