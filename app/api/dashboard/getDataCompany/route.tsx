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

const sumTaxForYear = async (userId: string, year: string) => {
  try {
    const connection = await pool.getConnection();
    const TaxSumQuery = `
      SELECT 
        SUM(CAST(employee_tax AS DECIMAL(10,2))) AS employee_tax,
        SUM(CAST(company_tax AS DECIMAL(10,2))) AS company_tax,
        SUM(CAST(employee_social_security AS DECIMAL(10,2))) AS employee_social_security,
        SUM(CAST(company_social_security AS DECIMAL(10,2))) AS company_social_security,
        SUM(CAST(provident_fund AS DECIMAL(10,2))) AS provident_fund
        
      FROM tax
      WHERE user_id = ? AND year = ?
    `;

    const [results] = await connection.query<RowDataPacket[]>(TaxSumQuery, [
      userId,
      year,
    ]);

    connection.release();

    // results should be a single object with each income type's total for the year
    return results.length > 0 ? results[0] : {};
  } catch (error) {
    console.error("Error calculating sum of each Expenses for the year:", error);
    throw error;
  }
};

const sumExpensesForYear = async (userId: string, year: string) => {
  try {
    const connection = await pool.getConnection();
    const expensesSumQuery = `
      SELECT 
        SUM(CAST(deduction_leave AS DECIMAL(10,2))) AS sum_deduction_leave,
        SUM(CAST(deduction_late AS DECIMAL(10,2))) AS sum_deduction_late,
        SUM(CAST(deduction_early_leave AS DECIMAL(10,2))) AS sum_deduction_early_leave,
        SUM(CAST(deduction_absence AS DECIMAL(10,2))) AS sum_deduction_absence,
        SUM(CAST(deduction_1 AS DECIMAL(10,2))) AS sum_deduction_1,
        SUM(CAST(deduction_2 AS DECIMAL(10,2))) AS sum_deduction_2,
        SUM(CAST(deduction_3 AS DECIMAL(10,2))) AS sum_deduction_3,
        SUM(CAST(deduction_4 AS DECIMAL(10,2))) AS sum_deduction_4,
        SUM(CAST(deduction_5 AS DECIMAL(10,2))) AS sum_deduction_5,
        SUM(CAST(deduction_6 AS DECIMAL(10,2))) AS sum_deduction_6,
        SUM(CAST(deduction_7 AS DECIMAL(10,2))) AS sum_deduction_7,
        SUM(CAST(deduction_8 AS DECIMAL(10,2))) AS sum_deduction_8,
        SUM(CAST(deduction_9 AS DECIMAL(10,2))) AS sum_deduction_9,
        SUM(CAST(deduction_10 AS DECIMAL(10,2))) AS sum_deduction_10
      FROM expenses
      WHERE user_id = ? AND year = ?
    `;

    const [results] = await connection.query<RowDataPacket[]>(expensesSumQuery, [
      userId,
      year,
    ]);

    connection.release();

    // results should be a single object with each income type's total for the year
    return results.length > 0 ? results[0] : {};
  } catch (error) {
    console.error("Error calculating sum of each Expenses for the year:", error);
    throw error;
  }
};

const calculateTotalNetIncomeByMonthAndYear = async (userId: string, year: string) => {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT month, SUM(CAST(net_income AS DECIMAL(10,2))) as total_net_income
      FROM income
      WHERE user_id = ? AND year = ?
      GROUP BY month
      ORDER BY month ASC;
    `;
    const [results] = await connection.query(query, [userId, year]);
    connection.release();
    return results;
  } catch (error) {
    console.error("Error calculating total net income:", error);
    throw error;
  }
};

const sumEachIncomeByMonthAndYear = async (userId: string, year: string) => {
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
      WHERE user_id = ? AND year = ?
      GROUP BY month
      ORDER BY CAST(month AS UNSIGNED);
    `;
    const [results] = await connection.query(incomeSumQuery, [userId, year]);
    connection.release();
    return results;
  } catch (error) {
    console.error("Error calculating sum of each income by month:", error);
    throw error;
  }
};

const sumIncomeForYear = async (userId: string, year: string) => {
  try {
    const connection = await pool.getConnection();
    const incomeSumQuery = `
      SELECT 
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
        SUM(CAST(income_10 AS DECIMAL(10,2))) AS sum_income_10,

        SUM(CAST(income_10 AS DECIMAL(10,2))) AS sum_income_10
      FROM income
      WHERE user_id = ? AND year = ?
    `;

    const [results] = await connection.query<RowDataPacket[]>(incomeSumQuery, [
      userId,
      year,
    ]);

    connection.release();

    // results should be a single object with each income type's total for the year
    return results.length > 0 ? results[0] : {};
  } catch (error) {
    console.error("Error calculating sum of each income for the year:", error);
    throw error;
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

const totalCommissionByMonthAndYear = async (userId: string, year: string) => {
  try {
    const connection = await pool.getConnection();
    const commissionQuery = `
      SELECT 
        month,
        SUM(
          COALESCE(CAST(salary AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_1 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_2 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_3 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_4 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_5 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_6 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_7 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_8 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_9 AS DECIMAL(10,2)), 0) +
          COALESCE(CAST(income_10 AS DECIMAL(10,2)), 0)
        ) AS total_commission
      FROM income
      WHERE user_id = ? AND year = ?
      GROUP BY month
      ORDER BY CAST(month AS UNSIGNED); -- Assuming month is stored as a string
    `;
    const [results] = await connection.query(commissionQuery, [userId, year]);
    connection.release();
    return results;
  } catch (error) {
    console.error("Error calculating total commission:", error);
    throw error;
  }
};


const incomeData = async (employeeId: string, userId: string) => {
  try {
    const connection = await pool.getConnection();
    const incomeQuery = `
      SELECT 
        employee_id, 
        month, 
        SUM(CAST(income_1 AS DECIMAL(10,2))) + 
        SUM(CAST(income_2 AS DECIMAL(10,2))) +
        SUM(CAST(income_3 AS DECIMAL(10,2))) +
        SUM(CAST(income_4 AS DECIMAL(10,2))) +
        SUM(CAST(income_5 AS DECIMAL(10,2))) +
        SUM(CAST(income_6 AS DECIMAL(10,2))) +
        SUM(CAST(income_7 AS DECIMAL(10,2))) +
        SUM(CAST(income_8 AS DECIMAL(10,2))) +
        SUM(CAST(income_9 AS DECIMAL(10,2))) +
        SUM(CAST(income_10 AS DECIMAL(10,2))) AS total_commission
      FROM income
      WHERE employee_id = ? AND user_id = ?
      GROUP BY employee_id, month
      ORDER BY month ASC;
    `;
    const [rows] = await connection.query<RowDataPacket[]>(incomeQuery, [employeeId, userId]);
    connection.release();

    // Create a result object mapping each month to its total commission
    const commissionResult = rows.map((row) => {
      return {
        month: row.month,
        total_commission: row.total_commission.toFixed(2), // Keeping two decimal places for currency format
      };
    });

    return commissionResult;
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

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const url = new URL(req.url);
  const year = url.searchParams.get("year"); // Retrieve the year from the query string

  try {
    if (!token) {
      throw new Error("No token provided");
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    const userId = await findIdemail(decoded.email);

    if (!userId) {
      throw new Error("User ID not found");
    }
    
    if (!year) {
      throw new Error("Year not specified");
    }

    // Use the year in your functions that need it, for example:
    const totalNetIncome = await calculateTotalNetIncomeByMonthAndYear(userId.toString(), year);
    const totalComission = await totalCommissionByMonthAndYear(userId.toString(), year);
    const incomeBymonth = await sumEachIncomeByMonthAndYear(userId.toString(), year);
    const IncomeForYear = await sumIncomeForYear(userId.toString(), year);
    const ExpensesForyear = await sumExpensesForYear(userId.toString(), year)
    const TaxForyear = await sumTaxForYear(userId.toString(), year)
    

    return new NextResponse(JSON.stringify({
      status: 200,
      message: "Success",
      totalNetIncome: totalNetIncome,
      totalComission: totalComission,
      incomeBymonth: incomeBymonth,
      IncomeForYear: IncomeForYear,
      ExpensesForyear: ExpensesForyear,
      TaxForyear : TaxForyear
    }));
  } catch (error) {
    console.error("Operation failed:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}