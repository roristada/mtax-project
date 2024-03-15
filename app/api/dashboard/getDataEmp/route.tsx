import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/utils/db";
import { RowDataPacket } from "mysql2";

interface UserRecord extends RowDataPacket {
  id: number;
}

interface CountRecord extends RowDataPacket {
  employeeCount: number;
}

const allEmp = async (email: string) => {
  try {
    const connection = await pool.getConnection();
    const userEmailQuery = "SELECT id FROM users WHERE email = ?";
    const [userResult] = await connection.query<UserRecord[]>(userEmailQuery, [
      email,
    ]);

    if (userResult.length > 0) {
      const userId = userResult[0].id;

      const employeeQuery = "SELECT employee_id,gender,thai_title,thai_name,thai_surname,card_id  FROM employee WHERE user_id = ?";
      const [employeeResult] = await connection.query<UserRecord[]>(employeeQuery, [userId]);
      
      connection.release();

      return employeeResult ;
    }
  } catch (err) {
    console.error("Database operation failed:", err);
  }
};
const findCountEmp = async (email: string) => {
  try {
    const connection = await pool.getConnection();
    const userEmailQuery = "SELECT id FROM users WHERE email = ?";
    const [userResult] = await connection.query<UserRecord[]>(userEmailQuery, [
      email,
    ]);

    if (userResult.length > 0) {
      const userId = userResult[0].id;

      // Query to get the count of employees for the user
      const employeeCountQuery =
        "SELECT COUNT(*) AS employeeCount FROM employee WHERE user_id = ?";
      const [countResult] = await connection.query<CountRecord[]>(
        employeeCountQuery,
        [userId]
      );

      const employeeCount = countResult[0].employeeCount;
      connection.release();

      return employeeCount;
    }
  } catch (err) {
    console.error("Database operation failed:", err);
  }
};

const findCountContract = async (email: string ,employeeCount: number) => {
  try {
    const connection = await pool.getConnection();
    const userEmailQuery = "SELECT id FROM users WHERE email = ?";
    const [userResult] = await connection.query<UserRecord[]>(userEmailQuery, [
      email,
    ]);
    

    if (userResult.length > 0) {
      const userId = userResult[0].id;

      // Query to get the count of monthly wage-type employees for the user
      const employeeMonthlyContractQuery =
        "SELECT COUNT(*) AS employeeMonthlyContractCount FROM employee WHERE user_id = ? AND wage_type = 'M'";
      const [monthlyCountResult] = await connection.query<CountRecord[]>(
        employeeMonthlyContractQuery,
        [userId]
      );

      // Query to get the count of weekly wage-type employees for the user
      const employeeWeeklyContractQuery =
        "SELECT COUNT(*) AS employeeWeeklyContractCount FROM employee WHERE user_id = ? AND wage_type = 'W'";
      const [weeklyCountResult] = await connection.query<CountRecord[]>(
        employeeWeeklyContractQuery,
        [userId]
      );

      const employeeDayContractQuery =
        "SELECT COUNT(*) AS employeeDayContractCount FROM employee WHERE user_id = ? AND wage_type = 'D'";
      const [dayCountResult] = await connection.query<CountRecord[]>(
        employeeDayContractQuery,
        [userId]
      );

      const employeeMonthlyContractCount = monthlyCountResult[0].employeeMonthlyContractCount;
      const employeeWeeklyContractCount = weeklyCountResult[0].employeeWeeklyContractCount;
      const employeeDayContractCount = dayCountResult[0].employeeDayContractCount;

      connection.release();
      if(employeeMonthlyContractCount === 0 && employeeWeeklyContractCount === 0){
        return {
          monthly: employeeCount,
          weekly: 0,
          day:0
        }
      }

      return {
        monthly: employeeMonthlyContractCount,
        weekly: employeeWeeklyContractCount,
        day:employeeDayContractCount
      };
    }
  } catch (err) {
    console.error("Database operation failed:", err);
    throw err; // Rethrowing the error is important for the calling function to know that an error occurred.
  }
};
const findCountGender = async (email: string) => {
  try {
    const connection = await pool.getConnection();
    const userEmailQuery = "SELECT id FROM users WHERE email = ?";
    const [userResult] = await connection.query<UserRecord[]>(userEmailQuery, [
      email,
    ]);

    if (userResult.length > 0) {
      const userId = userResult[0].id;

      // Query to get the count of employees for the user
      const employeeMQuery =
        "SELECT COUNT(*) AS employeeGender FROM employee WHERE user_id = ? AND gender = 'M'";
      const [genderMCountResult] = await connection.query<CountRecord[]>(
        employeeMQuery,
        [userId]
      );

      // Query to get the count of weekly wage-type employees for the user
      const employeeFQuery =
      "SELECT COUNT(*) AS employeeGender FROM employee WHERE user_id = ? AND gender = 'F'";
      const [genderFCountResult] = await connection.query<CountRecord[]>(
        employeeFQuery,
        [userId]
      );
      connection.release();

      return {
        genderM:genderMCountResult,
        genderF:genderFCountResult
      };
    }
  } catch (err) {
    console.error("Database operation failed:", err);
  }
};


export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as any;

    if (user.role === "user") {
      let employeeCount = await findCountEmp(user.email);
      if (employeeCount === undefined) {
        employeeCount = 0;
      }
      const contractCounts = await findCountContract(user.email, employeeCount);
      const genderCounts = await findCountGender(user.email);
      const allEmployee = await allEmp(user.email);

      return new NextResponse(
        JSON.stringify({
          message: "Success",
          role: user.role,
          employeeCount: employeeCount,
          contractCounts: contractCounts,
          genderCounts: genderCounts,
          allEmployee: allEmployee,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ message: "Role invalid" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error:", error);

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
