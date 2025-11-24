'use server';

/**
 * Server Actions for scanning and report generation
 * These can be called from client components safely
 * Usage example :  const result = await scanAndGenerateReport(url);
if (result.success) {
  // Save to database
  await saveReport(result.report);
  
  // Display specific data
  console.log(result.report.privacyConcerns);
}
 */

import { getScanner, closeScanner } from '@/lib/scanner';
import { generateReport } from '@/lib/generateReport';
import type { ScanResult } from '@/lib/scanner';

export async function scanAndGenerateReport(url: string) {
  try {
    // Validate URL
    try {
      new URL(url);
    } catch {
      return {
        success: false,
        error: 'Invalid URL format',
      };
    }

    console.log('Server Action: Scanning', url);

    // Scan the URL
    const scanner = await getScanner();
    const result = await scanner.scanURL(url);

    // Generate AI report and get structured data
    const report = await generateReport(result);

    // Clean up
    await closeScanner();

    return {
      success: true,
      data: {
        url: result.url,
        timestamp: result.timestamp,
        cookiesCount: result.cookies.length,
        scriptsCount: result.scripts.length,
        formsCount: result.forms.length,
        error: result.error,
      },
      report, // Include the structured AI report
    };
  } catch (error) {
    console.error('Server Action error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function scanMultipleUrls(urls: string[]) {
  const results = [];

  for (const url of urls) {
    const result = await scanAndGenerateReport(url);
    results.push(result);
  }

  return results;
}

/**
 * Just scan without generating AI report
 */
export async function scanUrl(url: string): Promise<{
  success: boolean;
  data?: ScanResult;
  error?: string;
}> {
  try {
    const scanner = await getScanner();
    const result = await scanner.scanURL(url);
    await closeScanner();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
