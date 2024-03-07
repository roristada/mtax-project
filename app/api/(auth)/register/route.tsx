import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  try {
    const { email, password, company_name, telephone, address, role } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    const [checkUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if ((checkUser as RowDataPacket).length > 0) {
      // Email already exists
      connection.release();
      return new NextResponse('The email address `[email]` is already in use.', { status: 400 });
    }


    const [result] = await connection.execute(
      'INSERT INTO users (email,password,company_name,telephone,address,role) VALUES (?,?,?,?,?,?)',
      [email, hashPassword, company_name, telephone, address, role]
    );

    // Release the connection after using it
    connection.release();

    return  NextResponse.json({ message: 'User registered successfully'});
  } catch (error) {
    console.error('Error registering user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
