import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    // Order DB me save karna
   const order = await prisma.order.create({
  data: {
    name: body.name,
    address: body.address,
    phone: body.phone,
    productId: String(body.productId),
    quantity: parseInt(body.quantity),
    paymentMethod: body.paymentMethod,
    status: "pending",
  },
});

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("❌ Order error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
