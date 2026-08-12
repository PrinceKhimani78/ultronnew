import { NextResponse } from 'next/server';

import { getCurrentAdmin } from '@/lib/admin/auth';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthenticated or unauthorized.' },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return NextResponse.json(
      { success: false, message: 'Server error verifying authorization.' },
      { status: 500 },
    );
  }
}
