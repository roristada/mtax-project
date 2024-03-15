// pages/api/dashboard/getDataEmp/getDataincome/[employeeId].ts
import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { use } from "react";

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
  month:string,
  year:string,
  deduction_leave:string,
  deduction_late:string,
  deduction_early_leave:string,
  deduction_absence:string,
  deduction_1:string,
  deduction_2:string,
  deduction_3:string,
  deduction_4:string,
  deduction_5:string,
  deduction_6:string,
  deduction_7:string,
  deduction_8:string,
  deduction_9:string,
  deduction_10:string
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

const incomeData = async (employeeId: string, userId: string) => {
  try {
    const connection = await pool.getConnection();
    const incomeQuery =
      "SELECT salary,month,year, ot_1, ot_2, ot_3, ot_4, income_1, income_2, income_3, income_4, income_5, income_6, income_7, income_8, income_9, income_10, net_income FROM income WHERE employee_id = ? AND user_id = ?";
    const [rows] = await connection.query<income[]>(incomeQuery, [
      employeeId,
      userId,
    ]);
    connection.release();

    // Sum the OT and income fields
    const incomeResult = rows.map((row) => {
      // Convert string to number and sum OT fields
      const ot = [row.ot_1, row.ot_2, row.ot_3, row.ot_4].reduce(
        (sum, value) => sum + parseFloat(value || "0"),
        0
      );

      // Convert string to number and sum income fields
      const commission = Object.keys(row)
        .filter((key) => key.startsWith("income_"))
        .reduce((sum, key) => sum + parseFloat(row[key] || "0"), 0);

      // Return a new object with the calculated ot and commission
      return {
        ...row,
        ot: ot.toFixed(2), // Keeping two decimal places for currency format
        commission: commission.toFixed(2), // Keeping two decimal places for currency format
      };
    });

    return incomeResult;
  } catch (error) {
    console.error("Database operation failed:", error);
    throw error; // It's important to throw the error to be handled by the caller.
  }
};

const taxData = async (employeeId: string, userId: string) => {
  try {
    const connection = await pool.getConnection();
    const taxQuery =
      "SELECT month,year,employee_tax,company_tax,employee_social_security,company_social_security,provident_fund  FROM tax WHERE employee_id = ? AND user_id = ?";
    const [rows] = await connection.query<tax[]>(taxQuery, [
      employeeId,
      userId,
    ]);
    connection.release();

    return rows;
  } catch (error) {
    return NextResponse.json({ status: 500, message: "error" });
  }
};

const expensesData = async (employeeId: string, userId: string) => {
  try {
    const connection = await pool.getConnection();
    const expensesQuery =
      "SELECT month,year,deduction_leave,deduction_late,deduction_early_leave,deduction_absence,deduction_1,deduction_2,deduction_3,deduction_4,deduction_5,deduction_6,deduction_7,deduction_8,deduction_9,deduction_10  FROM expenses WHERE employee_id = ? AND user_id = ?";
    const [rows] = await connection.query<Expenses[]>(expensesQuery, [
      employeeId,
      userId,
    ]);
    connection.release();

    return rows;
  } catch (error) {
    return NextResponse.json({ status: 500, message: "error" });
  }
};

export async function GET(req: NextRequest, context: any) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("No token provided");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    //console.log("Cookies" , user)
    const employeeId = context.params.employeeId;
    const userId = await findIdemail(user.email);

    //console.log("userId" ,userId)
    if (typeof userId === "undefined") {
      throw new Error("User ID not found");
    }
    const income = await incomeData(employeeId as string, userId.toString());
    const tax = await taxData(employeeId as string, userId.toString());
    const expenses = await expensesData(employeeId as string, userId.toString());
    
    return new NextResponse(
      JSON.stringify({
        message: "Success",
        income: income,
        tax: tax,
        expenses: expenses,
      })
    );
  } catch (error) {
    console.error("Database operatsion failed:", error);

    return NextResponse.json({ status: 500, message: "error" });
  }
}
