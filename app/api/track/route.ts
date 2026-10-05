import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findOrderFixture } from '@/data/orders';

const trackRequestSchema = z.object({
  orderId: z.string().min(3, 'Please enter a valid Order ID (e.g. #EL-1001)'),
  contact: z.string().min(4, 'Please enter your phone number or email address'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = trackRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid tracking parameters' },
        { status: 400 }
      );
    }

    const { orderId, contact } = result.data;
    const fixture = findOrderFixture(orderId, contact);

    if (!fixture) {
      return NextResponse.json(
        {
          error:
            'Order not found. Please verify your Order ID (#EL-1001, #EL-1002, or #EL-1003 for demo) and matching mobile number.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: fixture }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while looking up the shipment' },
      { status: 500 }
    );
  }
}
