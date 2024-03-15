import pool from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest ,context:any ) {
  const  roomId  = context.params.roomId; // Access the roomId from req.query, not context.params
  const data = JSON.parse(roomId);
  console.log("Room ID:", data);
  

  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM message WHERE chatRoomId = ?', [roomId]);
    return NextResponse.json({message:"success" , rows ,data})
  } catch (error) {

    return NextResponse.json({status:500, message: 'Server error', error });
  } 
}
