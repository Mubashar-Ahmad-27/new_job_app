import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: { title: body.title, description: body.description, salary: body.salary, city: body.city },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await req.json();
//         const id = req.nextUrl.pathname.split("/").pop();


//     if (!id) {
//       return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
//     }

//     const updatedJob = await prisma.job.update({
//       where: { id },
//       data: {
//         title: body.title,
//         description: body.description,
//         salary: body.salary,
//         city: body.city,
//       },
//     });

//     return NextResponse.json(updatedJob);
//   } catch (error) {
//     console.error("Error updating job:", error);
//     return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//   const id = req.nextUrl.pathname.split("/").pop();

//     if (!id) {
//       return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
//     }

//     await prisma.job.delete({ where: { id } });
//     return NextResponse.json({ message: "Job deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
//   }
// }
