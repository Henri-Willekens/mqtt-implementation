import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/configuration', 'config.json');

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
    return NextResponse.json({ message: 'File successfully updated' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  };
};
export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();
    const currentConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedConfig = { ...currentConfig, ...updates };

    fs.writeFileSync(filePath, JSON.stringify(updatedConfig, null, 2), 'utf8');

    return NextResponse.json({ message: 'Configuration updated successfully', updatedConfig });
  } catch (error) {
    console.error('Failed to update configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 },
    );
  }
}
