import pool from "@/utils/db";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(req: Request) {
  const { text, roomId , username } = await req.json();
  console.log(text , roomId ,username)

  await pusherServer.trigger(roomId, "incoming-message", { text, user: username });

  const connection = await pool.getConnection();
  const [result] = await connection.execute(
    "INSERT INTO message (content, chatRoomId,user_msg) VALUES (?, ?, ?)",
    [text, roomId ,username]
  );
  connection.release();


  return new Response(JSON.stringify({ success: true }));
}
