import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "data.json");

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf8");
    return NextResponse.json({ message: "File successfully updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to write file" },
      { status: 500 },
    );
  }
}
