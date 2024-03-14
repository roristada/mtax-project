import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";


export async function GET(req: NextRequest , context:any) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`SELECT * FROM blog WHERE id_blog = ${context.params.id}`);
      connection.release();
      console.log(context.params.id);
      
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }