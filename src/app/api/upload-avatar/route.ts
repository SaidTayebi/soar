import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = "user.png";
    const filepath = path.join(process.cwd(), "public/avatars", filename);

    // Save the file
    await writeFile(filepath, buffer);

    return NextResponse.json({
      avatarPath: `/avatars/${filename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
