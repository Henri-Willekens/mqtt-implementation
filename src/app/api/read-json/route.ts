import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This function generates the file path dynamically based on the passed filename
const getFilePath = (fileName: string) => {
  return path.join(process.cwd(), 'src/app/configuration', fileName);
};

export async function GET(request: NextRequest) {
  // Extract the 'file' query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file') || 'example.config.json'; // default to example.config.json if not provided

  try {
    const filePath = getFilePath(fileName); // Generate the file path
    const data = fs.readFileSync(filePath, 'utf8'); // Read the file content

    return NextResponse.json(JSON.parse(data)); // Return the parsed JSON content
  } catch (error) {
    return NextResponse.json({ error: `Failed to read file: ${error.message}` }, { status: 500 });
  }
}

