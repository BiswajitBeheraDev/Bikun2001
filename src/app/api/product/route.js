
import products from "../../../../prisma/data/product";

export async function GET() {
  return new Response(JSON.stringify(products), { status: 200 });
}
