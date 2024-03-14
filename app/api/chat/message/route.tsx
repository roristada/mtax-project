import pool from '@/utils/db';
import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { text, roomId } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)
  const connection = await pool.getConnection();

  const [result] = await connection.execute(
    'INSERT INTO message (content , chatRoomId) VALUES (?,?)',
    [text, roomId]
  );

    connection.release()

  return new Response(JSON.stringify({ success: true }))
}