
import products from '@/app/lib/product';

export async function GET() {
  return new Response(JSON.stringify(products), { status: 200 });
}
