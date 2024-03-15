// File: app/api/chat/room_create.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id } = body;

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO chatroom (user_id) VALUES (?)',
      [user_id]
    );

    const insertResult = result as ResultSetHeader;
    const roomId = insertResult.insertId;

    connection.release();

    return new NextResponse(JSON.stringify({ roomId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating the room:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
