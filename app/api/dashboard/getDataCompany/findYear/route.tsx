import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import pool from "@/utils/db";

interface UserRecord extends RowDataPacket {
  id: number;
}

interface income extends RowDataPacket {
  salary: string;
  month: string;
  year: string;
  ot_1: string;
  ot_2: string;
  ot_3: string;
  ot_4: string;
  income_1: string;
  income_2: string;
  income_3: string;
  income_4: string;
  income_5: string;
  income_6: string;
  income_7: string;
  income_8: string;
  income_9: string;
  income_10: string;
  net_income: string;
}

interface tax extends RowDataPacket {
  month: string;
  year: string;
  employee_tax: string;
  company_tax: string;
  employee_social_security: string;
  company_social_security: string;
  provident_fund: string;
}

interface Expenses extends RowDataPacket {
  month: string;
  year: string;
  deduction_leave: string;
  deduction_late: string;
  deduction_early_leave: string;
  deduction_absence: string;
  deduction_1: string;
  deduction_2: string;
  deduction_3: string;
  deduction_4: string;
  deduction_5: string;
  deduction_6: string;
  deduction_7: string;
  deduction_8: string;
  deduction_9: string;
  deduction_10: string;
}



const findYear = async (userId: string) => {
  try {
    const connection = await pool.getConnection();
    const yearQuery =
      "SELECT DISTINCT year FROM income WHERE user_id = ? ORDER BY year DESC";
    const [yearsResult] = await connection.query<RowDataPacket[]>(yearQuery, [
      userId,
    ]);

    connection.release();

   
    const years = yearsResult.map((yearObj) => yearObj.year);
    return years;
  } catch (err) {
    console.error("Error finding years", err);
    throw err;
  }
};

const findIdemail = async (email: string) => {
  try {
    const connection = await pool.getConnection();
    const userEmailQuery = "SELECT id FROM users WHERE email = ?";
    const [userResult] = await connection.query<UserRecord[]>(userEmailQuery, [
      email,
    ]);

    if (userResult.length > 0) {
      const userId = userResult[0].id;
      return userId;
    }
  } catch (err) {
    console.log("Cant find ID", err);
  }
};


export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    const userId = await findIdemail(decoded.email);

    if (!userId) {
      throw new Error("User ID not found");
    }

    const years = await findYear(userId.toString());
    

    return new NextResponse(
      JSON.stringify({ status: 200, message: "Success", years: years })
    );
  } catch (error) {
    console.error("Operation failed:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
