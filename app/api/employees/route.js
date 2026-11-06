import prisma from "@/lib/prisma";
import zod from "zod";

const employeeSchema = zod.object({
  name: zod.string().min(2).max(100),
  email: zod.string().email(),
  department: zod.string().min(2).max(100),
  salary: zod.number().positive(),
});

// Get :fetch all employees

export async function GET(){
    const getemployees=await prisma.employee.findmany();

return Response.json(getemployees);
}


//Post:to add a new employee

export async function POST(request) {

  const body = await request.json();

  const result = employeeSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { message: "Invalid employee data" },
      { status: 400 }
    );
  }

  const pemployee = await prisma.employee.create({
    data: result.data,
  });

  return Response.json(pemployee, { status: 201 });
}



//DELETE:to remove an employee
export async function DELETE(request) {

  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return Response.json(
      { message: "Invalid employee ID" },
      { status: 400 }
    );
  }

  const employee = await prisma.employee.delete({
    where: { id },
  });

  return Response.json({
    message: "Employee deleted successfully",
  });
}



//safeParse() checks whether the incoming employee data follows the validation rules defined in employeeSchema.