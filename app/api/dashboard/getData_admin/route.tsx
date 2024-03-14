import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/utils/db";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as any;

    // Check if the user role is 'admin'
    if (user.role === "admin") {
      const connection = await pool.getConnection();
      
      // Count How many Company in Database
      const [count] = await connection.query("SELECT COUNT(*) AS userCount FROM users WHERE role = 'user' ") as any;
      connection.release();
      const userCount = count[0].userCount;
      //------------------------------------------------------------------------

      const [company] = await connection.query("SELECT id,company_name, email, telephone, address FROM users WHERE role = 'user'") as any;  

      return new NextResponse(JSON.stringify({ message: "Success", role: user.role, userCount: userCount , company: company }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // If user is not an admin, return a Forbidden response
      return new NextResponse(JSON.stringify({ message: "Forbidden: User does not have access" }), {
        status: 403, // 403 Forbidden status
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
