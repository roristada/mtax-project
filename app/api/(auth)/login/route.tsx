// pages/api/login.js

import { NextResponse, NextRequest } from 'next/server';
import pool from '@/utils/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken'


export async function POST(req: NextRequest) {
    const secretKey = 'roris123'
    try {
        const { email, password } = await req.json();
        const connection = await pool.getConnection();
        const [result] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (!result || result.length === 0) {
            return NextResponse.json({ error: "Email or password not found" }, { status: 401 }); // 401 Unauthorized status code for failed login
        }

        const user = result[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 }); // 401 Unauthorized status code for failed login
        }

        const payload = {
            id: user.user_ID,
            email: user.email,
            role: user.role,
          }

          const token = jwt.sign(payload, secretKey, { expiresIn: '1hr' })

        const response = NextResponse.json({ message: 'Login successful', user, token });
        response.cookies.set('token', token);
        
        return response;
        
    } catch (error) {
        console.error('Error during login:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
