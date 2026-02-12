import { NextResponse } from 'next/server';

/**
 * API Response utilities for consistent response formatting
 */

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
};

/**
 * Send success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message: message || 'Request successful',
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Send error response
 */
export function errorResponse(
  error: string | Error,
  status: number = 400,
  message?: string
): NextResponse<ApiResponse> {
  const errorMessage = error instanceof Error ? error.message : error;
  
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      message: message || 'An error occurred',
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Send validation error response
 */
export function validationErrorResponse(
  errors: Array<{ field: string; message: string }>
): NextResponse<
  ApiResponse & { errors: Array<{ field: string; message: string }> }
> {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      errors,
      timestamp: new Date().toISOString(),
    },
    { status: 422 }
  );
}

/**
 * Send unauthorized response
 */
export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Unauthorized',
      message: 'You do not have permission to access this resource',
      timestamp: new Date().toISOString(),
    },
    { status: 401 }
  );
}

/**
 * Send not found response
 */
export function notFoundResponse(resource: string = 'Resource'): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
      message: `The requested ${resource.toLowerCase()} could not be found`,
      timestamp: new Date().toISOString(),
    },
    { status: 404 }
  );
}

/**
 * Send conflict response
 */
export function conflictResponse(message: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Conflict',
      message,
      timestamp: new Date().toISOString(),
    },
    { status: 409 }
  );
}

/**
 * Send server error response
 */
export function serverErrorResponse(
  error: Error | unknown = 'Internal server error'
): NextResponse<ApiResponse> {
  const message = error instanceof Error ? error.message : String(error);
  
  console.error('[API Error]', message);

  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? message : 'An internal error occurred',
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  );
}
