import { useEffect, useRef } from 'react';


interface VideoRoomProps {
   roomId: string
}

const VideoRoom = ({ roomId }: VideoRoomProps) => {

   const appId = process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID!;
   const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET!;
   const zpRef = useRef<any>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const startChat = async () => {
         const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
         const userId = crypto.randomUUID();
         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(Number(appId), serverSecret, roomId, userId, "stranger");
         const zp = ZegoUIKitPrebuilt.create(kitToken);
         zpRef.current = zp;
         zpRef.current.joinRoom({
            container: containerRef.current,
            scenario: {mode: ZegoUIKitPrebuilt.OneONoneCall},
            showPreJoinView: false,
            showTextChat: true,
            maxUsers: 2
         })
      };
      startChat();

      return () => {
         try {
           zpRef.current.leaveRoom();
           zpRef.current.destroy();
         } catch (error) {
            zpRef.current = null;
         }
      }
   },[roomId])

  return (
    <div ref={containerRef} className='w-full h-[80vh] ' />
  );
}

export default VideoRoom;
