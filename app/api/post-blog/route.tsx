import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { header, detail, staff, image} = await req.json();
    const data = { header, detail, staff, image};

    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO blog (header, detail, staff, image) VALUES (?,?,?,?)',
    [header, detail, staff, image])
    connection.release();
    
    return NextResponse.json({message: "OK" , data})
  } catch (error) {
    console.error("Error Appointment :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function GET() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM blog");
      connection.release();
    
  
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }