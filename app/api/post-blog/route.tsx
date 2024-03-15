import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import pool from '@/utils/db';
import { RowDataPacket } from "mysql2";

const InsertPost = async (header:any, detail:any, staff:any, imagePath:any) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO blog (header, detail, staff, image) VALUES (?,?,?,?)',
      [header, detail, staff, imagePath])
    connection.release();
    
    return { message: "OK", data: { header, detail, staff, imagePath } };
  } catch (error) {
    console.error("Error InsertPost :", error);
    throw new Error("Database operation failed");
  }
}

export async function POST(req:NextRequest) {
  try {
    const formData = await req.formData();
    const header = formData.get("header");
    const detail = formData.get("detail");
    const staff = formData.get("staff");
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      throw new Error("File is missing or invalid");
    }

    const dirPath = path.join("public", "img_upload");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const fileName = file instanceof File ? file.name : "unknown";
    const filePath = path.join(dirPath, fileName);
    const fileBuffer = await file.arrayBuffer();

    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Now, call the InsertPost function to insert the blog post data into the database
    const insertResult = await InsertPost(header, detail, staff, filePath);
    
    return new NextResponse(JSON.stringify(insertResult), { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
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

  export async function DELETE(req: NextRequest) {
    try {
      const { id } = await req.json();
      if (!id) return NextResponse.json({ message: "Require ID" });
  
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "DELETE FROM blog WHERE id_blog = ?",
        [id]
      );
      connection.release();
  
      if ((rows as RowDataPacket).affectedRows > 0) {
        return NextResponse.json({
          message: "Blog successfully deleted.",
        });
      } else {
        return new NextResponse("Blog not found", { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }