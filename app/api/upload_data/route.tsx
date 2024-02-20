import fs from "fs";
import { NextResponse } from "next/server";
import Papa from "papaparse"; // Import PapaParse library

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        // Access form fields using formData.get()
        const company = formData.get("company") as string;
        const month = formData.get("month") as string;
        const year = formData.get("year") as string;
        const staffname = formData.get("staffname") as string;
        const data_type = formData.get("data_type") as string;
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            throw new Error('File is missing or invalid');
        }

        // Save file to local storage
        const fileBuffer = await file.arrayBuffer();
        const fileName = (file instanceof File) ? file.name : 'unknown'; // Get the file name
        const filePath = `public/file_upload/${fileName}`; // Specify the path where you want to save the file
        fs.writeFileSync(filePath, Buffer.from(fileBuffer));

        console.log("File saved to:", filePath);

        // Read the CSV file and parse it to JSON asynchronously using PapaParse
        const csvData = fs.readFileSync(filePath, 'utf-8');
        const jsonData = Papa.parse(csvData, {
            header: true, // Treat the first row as header
            dynamicTyping: true, // Automatically convert numbers and booleans
            skipEmptyLines: true // Skip empty lines
        }).data;

        console.log("JSON data:", jsonData);

        console.log("Submitted data:", { company, month, year, staffname, data_type, fileName });
        
        return NextResponse.json({ message: "OK", data: { company, month, year, staffname, data_type, fileName, jsonData } });
    } catch (error) {
        console.error("Error handling request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
