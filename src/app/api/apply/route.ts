import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/libs/prisma"; 

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (fileBuffer: Buffer, fileType: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "job-portal/resumes" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    if (!file) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const cloudinaryResult: any = await uploadToCloudinary(buffer, file.type);

    const application = await prisma.application.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        coverLetter: formData.get("coverLetter") as string,
        resumeUrl: cloudinaryResult.secure_url,
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {createdAt: "desc"}
    });
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); 
    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching applications:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    alert("Failed to fetch applications. Check the console for details.");
  }
  
}
