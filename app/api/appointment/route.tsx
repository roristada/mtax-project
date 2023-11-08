import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import nodemailer from "nodemailer";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  
  try {
    const {
      email,
      name,
      time_app,
      date_app,
      note_app,
      staff,
      status,
      time_end,
      recapt_token,
    } = await req.json();

    const isRecaptchaValid = await verifyRecaptchaToken(recapt_token);
    if (!isRecaptchaValid) {
      console.log("Invalid reCAPTCHA token")
      return new NextResponse("Invalid reCAPTCHA token", { status: 400 });
    }

    const connection = await pool.getConnection();
    const [checkRecords] = await connection.execute(
      "SELECT * FROM appointment WHERE time_app=? AND date_app=? AND staff=? AND time_end=?",
      [time_app, date_app, staff, time_end]
    );

    if ((checkRecords as RowDataPacket).length > 0) {
      connection.release();
      return new NextResponse("Duplicate appointment record found", {
        status: 400,
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO appointment (email,name, time_app, date_app, note_app, staff, status_app, time_end) VALUES (?,?,?,?,?,?,?,?)",
      [email, name, time_app, date_app, note_app, staff, status, time_end]
    );
    connection.release();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tadaroris@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: "tadaroris@gmail.com",
      to: email,
      subject: "Appointment Confirmation",
      text: `Dear ${name},\n\nYour appointment has been successfully scheduled for ${date_app} at ${time_app}.`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "Appointment successfully scheduled. Confirmation email sent.",
    });
  } catch (error) {
    console.error("Error Appointment :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM appointment");
    connection.release();
    //const db = await query();
    //const [rows, fields] = await db.query('SELECT * FROM users');
    //db.release(); // Release the connection back to the pool when done

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
      "DELETE FROM appointment WHERE id_appointment = ?",
      [id]
    );
    connection.release();

    if ((rows as RowDataPacket).affectedRows > 0) {
      return NextResponse.json({
        message: "Appointment successfully deleted.",
      });
    } else {
      return new NextResponse("Appointment not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status_app } = await req.json();
    if (!id) return NextResponse.json({ message: "Require ID" });

    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "UPDATE appointment SET status_app = ? WHERE id_appointment = ? ",
      [status_app, id]
    );
    connection.release();

    if ((rows as RowDataPacket).affectedRows > 0) {
      return NextResponse.json({
        message: "Update Status Succesful.",
      });
    } else {
      return new NextResponse("Appointment not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success;
  
}
