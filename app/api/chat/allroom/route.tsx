import pool from "@/utils/db";
export async function GET(req: Request) {

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT * FROM chatroom ",);
    connection.release();
  
  
    return new Response(JSON.stringify({ success: true  ,result}));
  }