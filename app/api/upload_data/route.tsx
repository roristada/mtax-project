import fs from "fs";
import { NextResponse } from "next/server";
import Papa from "papaparse"; // Import PapaParse library
import pool from "@/utils/db";
import path from "path";
const columnMap = {
  รหัสพนักงาน: "employee_id",
  รหัสบัตรรูด: "card_id",
  คำนำหน้าไทย: "thai_title",
  ชื่อภาษาไทย: "thai_name",
  นามสกุลภาษาไทย: "thai_surname",
  คำนำหน้าอังกฤษ: "english_title",
  ชื่อภาษาอังกฤษ: "english_name",
  นามสกุลภาษาอังกฤษ: "english_surname",
  เพศ: "gender",
  ฝ่าย: "division",
  แผนก: "department",
  ตำแหน่ง: "position",
  //"ระดับ": "level", // This appears twice, you may need to differentiate them
  สถานที่ทำงาน: "workplace",
  เขตการทำงาน: "work_area",
  สถานะทำงาน: "work_status",
  สถานะภาพครอบครัว: "marital_status",
  วันเริ่มงาน: "start_date",
  วันทดลองาน: "probation_end_date",
  วันบรรจุ: "employment_date",
  วันที่ออก: "resignation_date",
  "ทำงาน/ออก": "work_resignation_status",
  "รายวัน/รายเดือน": "wage_type",
  ระดับ: "level_again", // Needs clarification as "level" is listed twice
  เลขที่บัตรประชาชน: "national_id",
  วันที่หมดอายุ: "national_id_expiry",
  เลขที่บัตรผู้เสียภาษี: "tax_id",
  เลขที่บัตรประกันสังคม: "social_security_id",
  เลขที่บัตรกองทุนสำรองเลี้ยงชีพ: "provident_fund_id",
  "รพ.": "hospital",
  รูป: "photo",
  เงินเดือนปัจจุบัน: "current_salary",
  รหัสบริษัท: "company_id",
  งวด: "installment",
  เดือน: "month",
  เงินเดือน: "salary",
  "โอที 1": "ot_1",
  "โอที 2": "ot_2",
  "โอที 3": "ot_3",
  "โอที 4": "ot_4",
  ค่ากะ: "shift_differential",
  ค่าอาหาร: "meal_allowance",
  "รายได้ 1": "income_1",
  "รายได้ 2": "income_2",
  "รายได้ 3": "income_3",
  "รายได้ 4": "income_4",
  "รายได้ 5": "income_5",
  "รายได้ 6": "income_6",
  "รายได้ 7": "income_7",
  "รายได้ 8": "income_8",
  "รายได้ 9": "income_9",
  "รายได้ 10": "income_10",
  ภาษีพนักงานจ่าย: "employee_tax",
  ภาษีบริษัทจ่ายให้: "company_tax",
  "ปกส พนักงาน": "employee_social_security",
  "ปกส บริษัท จ่าย": "company_social_security",
  กองทุนสำรอง: "provident_fund",
  หักเงินลา: "deduction_leave",
  หักเงินมาสาย: "deduction_late",
  หักเงินออกก่อน: "deduction_early_leave",
  หักเงินขาดงาน: "deduction_absence",
  "รายหัก 1": "deduction_1",
  "รายหัก 2": "deduction_2",
  "รายหัก 3": "deduction_3",
  "รายหัก 4": "deduction_4",
  "รายหัก 5": "deduction_5",
  "รายหัก 6": "deduction_6",
  "รายหัก 7": "deduction_7",
  "รายหัก 8": "deduction_8",
  "รายหัก 9": "deduction_9",
  "รายหัก 10": "deduction_10",
  รายได้สุทธิ: "net_income",
};

const colEmpolyee = {
  รหัสพนักงาน: "employee_id",
  รหัสบัตรรูด: "card_id",
  คำนำหน้าไทย: "thai_title",
  ชื่อภาษาไทย: "thai_name",
  นามสกุลภาษาไทย: "thai_surname",
  คำนำหน้าอังกฤษ: "english_title",
  ชื่อภาษาอังกฤษ: "english_name",
  นามสกุลภาษาอังกฤษ: "english_surname",
  เพศ: "gender",
  ฝ่าย: "division",
  แผนก: "department",
  ตำแหน่ง: "position",
  สถานที่ทำงาน: "workplace",
  เขตการทำงาน: "work_area",
  สถานะทำงาน: "work_status",
  สถานะภาพครอบครัว: "marital_status",
  วันเริ่มงาน: "start_date",
  วันทดลองาน: "probation_end_date",
  วันบรรจุ: "employment_date",
  วันที่ออก: "resignation_date",
  "ทำงาน/ออก": "work_resignation_status",
  "รายวัน/รายเดือน": "wage_type",
  ระดับ: "level", // Needs clarification as "level" is listed twice
  เลขที่บัตรประชาชน: "national_id",
  วันที่หมดอายุ: "national_id_expiry",
  เลขที่บัตรผู้เสียภาษี: "tax_id",
  เลขที่บัตรประกันสังคม: "social_security_id",
  เลขที่บัตรกองทุนสำรองเลี้ยงชีพ: "provident_fund_id",
  "รพ.": "hospital",
  รูป: "photo",
  เงินเดือนปัจจุบัน: "current_salary",
  //รหัสบริษัท: "company_id",
  id: "user_id",
};

const colIncome = {
  งวด: "installment",
  เดือน: "month",
  เงินเดือน: "salary",
  "โอที 1": "ot_1",
  "โอที 2": "ot_2",
  "โอที 3": "ot_3",
  "โอที 4": "ot_4",
  ค่ากะ: "shift_differential",
  ค่าอาหาร: "meal_allowance",
  "รายได้ 1": "income_1",
  "รายได้ 2": "income_2",
  "รายได้ 3": "income_3",
  "รายได้ 4": "income_4",
  "รายได้ 5": "income_5",
  "รายได้ 6": "income_6",
  "รายได้ 7": "income_7",
  "รายได้ 8": "income_8",
  "รายได้ 9": "income_9",
  "รายได้ 10": "income_10",
  รายได้สุทธิ: "net_income",
  year: "year",
  id: "user_id",
  รหัสพนักงาน: "employee_id",
};
const colTax = {
  ภาษีพนักงานจ่าย: "employee_tax",
  ภาษีบริษัทจ่ายให้: "company_tax",
  "ปกส พนักงาน": "employee_social_security",
  "ปกส บริษัท จ่าย": "company_social_security",
  กองทุนสำรอง: "provident_fund",
  id: "user_id",
  รหัสพนักงาน: "employee_id",
  เดือน: "month",
  year: "year",
};

const colExpenses = {
  หักเงินลา: "deduction_leave",
  หักเงินมาสาย: "deduction_late",
  หักเงินออกก่อน: "deduction_early_leave",
  หักเงินขาดงาน: "deduction_absence",
  "รายหัก 1": "deduction_1",
  "รายหัก 2": "deduction_2",
  "รายหัก 3": "deduction_3",
  "รายหัก 4": "deduction_4",
  "รายหัก 5": "deduction_5",
  "รายหัก 6": "deduction_6",
  "รายหัก 7": "deduction_7",
  "รายหัก 8": "deduction_8",
  "รายหัก 9": "deduction_9",
  "รายหัก 10": "deduction_10",
  id: "user_id",
  รหัสพนักงาน: "employee_id",
  เดือน: "month",
  year: "year",
};

async function parseCSV(filePath: any) {
  const csvData = fs.readFileSync(filePath, "utf-8");
  return Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;
}

async function processAndInsertData(parsedData: any, id: any, year: any) {
  const connection = await pool.getConnection();

  // Iterate over each row in the parsed CSV data
  for (const row of parsedData) {
    let tableName;
    let columnMapping;

    // Check if row belongs to 'employee'
    if ("รหัสพนักงาน" in row && "ชื่อภาษาไทย" in row) {
      tableName = "employee";
      columnMapping = colEmpolyee;
    }
    // Check if row belongs to 'income'
    // If no table name could be determined, log and skip this row
    if (!tableName) {
      console.error("Table name could not be determined for row:", row);
      continue;
    }

    // Map the CSV row to the table columns
    const mappedRow = mapRowToTableColumns(
      row,
      columnMapping,
      id,
      year,
      tableName
    );

    // Insert the mapped row into the determined table
    try {
      const sql = `INSERT INTO ${tableName} SET ?`;
      await connection.query(sql, mappedRow);
      console.log(`Inserted into ${tableName} completed`);
    } catch (error) {
      console.error(`Failed to insert row into ${tableName}:`, error);
    }
  }

  await connection.release();
}

async function processAndInsertData2(parsedData: any, id: any, year: any) {
  const connection = await pool.getConnection();

  // Iterate over each row in the parsed CSV data
  for (const row of parsedData) {
    let tableName;
    let columnMapping;

    // Check if row belongs to 'income'
    if ("เงินเดือน" in row || "โอที 1" in row || "รายได้สุทธิ" in row) {
      tableName = "income";
      columnMapping = colIncome;
    }
    // Add conditions for 'tax' and 'expenses'
    else if ("ภาษีพนักงานจ่าย" in row || "ภาษีบริษัทจ่ายให้" in row) {
      tableName = "tax";
      columnMapping = colTax;
    } else if ("หักเงินลา" in row || "รายหัก 1" in row) {
      tableName = "expenses";
      columnMapping = colExpenses;
    }

    // If no table name could be determined, log and skip this row
    if (!tableName) {
      console.error("Table name could not be determined for row:", row);
      continue;
    }

    // Map the CSV row to the table columns
    const mappedRow = mapRowToTableColumns(
      row,
      columnMapping,
      id,
      year,
      tableName
    );

    // Insert the mapped row into the determined table
    try {
      const sql = `INSERT INTO ${tableName} SET ?`;
      await connection.query(sql, mappedRow);
      console.log(`Inserted into ${tableName} completed`);
    } catch (error) {
      console.error(`Failed to insert row into ${tableName}:`, error);
    }
  }

  await connection.release();
}

async function processAndInsertData3(parsedData: any, id: any, year: any) {
  const connection = await pool.getConnection();

  // Iterate over each row in the parsed CSV data
  for (const row of parsedData) {
    let tableName;
    let columnMapping;

    if ("ภาษีพนักงานจ่าย" in row || "ภาษีบริษัทจ่ายให้" in row) {
      tableName = "tax";
      columnMapping = colTax;
    }

    // If no table name could be determined, log and skip this row
    if (!tableName) {
      console.error("Table name could not be determined for row:", row);
      continue;
    }

    // Map the CSV row to the table columns
    const mappedRow = mapRowToTableColumns(
      row,
      columnMapping,
      id,
      year,
      tableName
    );

    // Insert the mapped row into the determined table
    try {
      const sql = `INSERT INTO ${tableName} SET ?`;
      await connection.query(sql, mappedRow);
      console.log(`Inserted into ${tableName} completed`);
    } catch (error) {
      console.error(`Failed to insert row into ${tableName}:`, error);
    }
  }

  await connection.release();
}

async function processAndInsertData4(parsedData: any, id: any, year: any) {
  const connection = await pool.getConnection();

  // Iterate over each row in the parsed CSV data
  for (const row of parsedData) {
    let tableName;
    let columnMapping;

    // Check if row belongs to 'income'

    if ("หักเงินลา" in row || "รายหัก 1" in row) {
      tableName = "expenses";
      columnMapping = colExpenses;
    }

    // If no table name could be determined, log and skip this row
    if (!tableName) {
      console.error("Table name could not be determined for row:", row);
      continue;
    }

    // Map the CSV row to the table columns
    const mappedRow = mapRowToTableColumns(
      row,
      columnMapping,
      id,
      year,
      tableName
    );

    // Insert the mapped row into the determined table
    try {
      const sql = `INSERT INTO ${tableName} SET ?`;
      await connection.query(sql, mappedRow);
      console.log(`Inserted into ${tableName} completed`);
    } catch (error) {
      console.error(`Failed to insert row into ${tableName}:`, error);
    }
  }

  await connection.release();
}
// Utility function to map a row to the table columns based on provided mapping

// Utility function to map a row to the table columns based on provided mapping
function mapRowToTableColumns(
  row: { [key: string]: any },
  columnMapping: any,
  userId: any,
  year: any,
  tableName: any
) {
  const mappedRow: { [key: string]: any } = {};
  for (const key in columnMapping) {
    if (columnMapping.hasOwnProperty(key)) {
      const newKey = columnMapping[key];
      mappedRow[newKey] = row[key];
    }
  }
  // Add user_id to every mappedRow
  mappedRow["user_id"] = userId;

  // Add year to the mappedRow only if the table is not 'employee'
  if (tableName !== "employee") {
    mappedRow["year"] = year;
  }

  return mappedRow;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Access form fields using formData.get()
    console.log(formData);
    const id = formData.get("id") as string;
    //const company = formData.get("company") as string;
    const year = formData.get("year") as string;
    const date_upload = formData.get("date_upload") as string;
    const staffname = formData.get("staffname") as string;
    const data_type = formData.get("data_type") as string;
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      throw new Error("File is missing or invalid");
    }

    // Save file to local storage
    // const fileBuffer = await file.arrayBuffer();
    // const fileName = file instanceof File ? file.name : "unknown"; // Get the file name
    // const filePath = `public/file_upload/${fileName}`; // Specify the path where you want to save the file
    // fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    const dateFolder = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Construct the path for the new directory
    const dirPath = path.join("public", "file_upload", dateFolder);

    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // recursive: true allows creating nested directories
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = file instanceof File ? file.name : "unknown"; // Get the file name

    // Update the filePath to include the date directory
    const filePath = path.join(dirPath, fileName);

    // Save the file to the directory
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    console.log("File saved to:", filePath);

    // Read the CSV file and parse it to JSON asynchronously using PapaParse
    const parsedData = await parseCSV(filePath);

    console.log("JSON data:", parsedData);

    //----------------------------------------------------------------------------------------------------//
    await processAndInsertData(parsedData, id, year)
      .then(() => {
        console.log("Data processing and insertion completed.");
      })
      .catch((error) => {
        console.error("Failed to process and insert data:", error);
      });

    await processAndInsertData2(parsedData, id, year)
      .then(() => {
        console.log("Data processing and insertion completed.");
      })
      .catch((error) => {
        console.error("Failed to process and insert data:", error);
      });

    await processAndInsertData3(parsedData, id, year)
      .then(() => {
        console.log("Data processing and insertion completed.");
      })
      .catch((error) => {
        console.error("Failed to process and insert data:", error);
      });

    await processAndInsertData4(parsedData, id, year)
      .then(() => {
        console.log("Data processing and insertion completed.");
      })
      .catch((error) => {
        console.error("Failed to process and insert data:", error);
      });

    // const jsonData = parsedData.map((row: any) => {
    //   const mappedRow: { [key: string]: unknown } = {};
    //   mappedRow['user_id'] = id;
    //   Object.keys(row).forEach((key: string) => {
    //     // Use the appropriate column map based on the data_type
    //     let columnName;
    //     switch (data_type) {
    //       case "Employee":
    //         columnName = colEmpolyee[key as keyof typeof colEmpolyee];
    //         break;
    //       case "Income":
    //         columnName = colIncome[key as keyof typeof colIncome];
    //         break;
    //       case "Tax":
    //         columnName = colTax[key as keyof typeof colTax];
    //         break;
    //       case "Expenses":
    //         columnName = colExpenses[key as keyof typeof colExpenses];
    //         break;
    //       default:
    //         console.warn(`Unsupported data type: ${data_type}`);
    //         return;
    //     }

    //     if (!columnName) {
    //       console.warn(`No mapping found for header: ${key}`);
    //     } else {
    //       mappedRow[columnName] = row[key];
    //     }
    //   });
    //   return mappedRow;
    // });

    // // Determine the table name based on data_type
    // let tableName;
    // switch (data_type) {
    //   case "Employee":
    //     tableName = "Employee";
    //     break;
    //   case "Income":
    //     tableName = "Income";
    //     break;
    //   case "Tax":
    //     tableName = "Tax";
    //     break;
    //   default:
    //     throw new Error(`Unsupported data type: ${data_type}`);
    // }

    // const connection = await pool.getConnection();
    // jsonData.forEach(async (row) => {
    //   const sql = `INSERT INTO ${tableName} SET ?`;
    //   try {
    //     const [results] = await connection.query(sql, row);
    //     console.log(results);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    // connection.end();

    console.log("Submitted data:", {
      id,
      //company,
      date_upload,
      staffname,
      data_type,
      fileName,
    });

    return NextResponse.json({
      message: "OK",
      data: { id, date_upload, staffname, data_type, fileName },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
