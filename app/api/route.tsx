// api/users.js
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

export async function GET() {
  
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release();
    //const db = await query();
    //const [rows, fields] = await db.query('SELECT * FROM users');
    //db.release(); // Release the connection back to the pool when done
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

