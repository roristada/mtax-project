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

const sumEachIncomeByMonthAndYear = async (userId: string, year: string ,empId:string) => {
  try {
    const connection = await pool.getConnection();
    const incomeSumQuery = `
      SELECT 
        month,
        SUM(CAST(salary AS DECIMAL(10,2))) AS salary,
        SUM(CAST(income_1 AS DECIMAL(10,2))) AS sum_income_1,
        SUM(CAST(income_2 AS DECIMAL(10,2))) AS sum_income_2,
        SUM(CAST(income_3 AS DECIMAL(10,2))) AS sum_income_3,
        SUM(CAST(income_4 AS DECIMAL(10,2))) AS sum_income_4,
        SUM(CAST(income_5 AS DECIMAL(10,2))) AS sum_income_5,
        SUM(CAST(income_6 AS DECIMAL(10,2))) AS sum_income_6,
        SUM(CAST(income_7 AS DECIMAL(10,2))) AS sum_income_7,
        SUM(CAST(income_8 AS DECIMAL(10,2))) AS sum_income_8,
        SUM(CAST(income_9 AS DECIMAL(10,2))) AS sum_income_9,
        SUM(CAST(income_10 AS DECIMAL(10,2))) AS sum_income_10
      FROM income
      WHERE user_id = ? AND year = ? AND employee_id =?
      GROUP BY month
      ORDER BY CAST(month AS UNSIGNED);
    `;
    const [results] = await connection.query(incomeSumQuery, [userId, year ,empId]);
    connection.release();
    return results;
  } catch (error) {
    console.error("Error calculating sum of each income by month:", error);
    throw error;
  }
};

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const url = new URL(req.url);

  const empId = url.searchParams.get("employeeId");
  const year = url.searchParams.get("selectedYear");
  
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    const userId = await findIdemail(decoded.email);
    console.log(empId,year)

    if (!userId) {
      throw new Error("User ID not found");
    }

    if (!year) {
      throw new Error("Year not specified");
    }

    const sumIncomeEmp = await sumEachIncomeByMonthAndYear(userId.toString(), year ,empId as string)

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Success",
        sumIncomeEmp:sumIncomeEmp
      })
    );
  } catch (error) {
    console.error("Operation failed:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
