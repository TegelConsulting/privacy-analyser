import OpenAI from 'openai';
import { ScanResult } from './scanner';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PrivacyIssue {
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  recommendation: string;
}

export interface PrivacyReport {
  summary: string;
  privacyConcerns: PrivacyIssue[];
  securityIssues: PrivacyIssue[];
  gdprCompliance: {
    compliant: boolean;
    issues: string[];
    recommendations: string[];
  };
  timestamp: string;
  url: string;
}

/**
 * Generates a privacy analysis report using OpenAI based on scanner results
 * @param scanResult - The result from the URL scanner
 * @returns Promise that resolves with structured privacy report
 */
export async function generateReport(
  scanResult: ScanResult
): Promise<PrivacyReport> {
  try {
    console.log('Starting report generation for:', scanResult.url);
    console.log('Scan timestamp:', scanResult.timestamp);

    // Prepare the prompt with scan data
    const prompt = `You are a privacy and security analyst. Analyze the following website scan results and respond ONLY with valid JSON in the exact format specified below.

Website URL: ${scanResult.url}
Scan Date: ${scanResult.timestamp}

COOKIES DETECTED (${scanResult.cookies.length}):
${JSON.stringify(scanResult.cookies, null, 2)}

SCRIPTS DETECTED (${scanResult.scripts.length}):
${JSON.stringify(scanResult.scripts, null, 2)}

FORMS DETECTED (${scanResult.forms.length}):
${JSON.stringify(scanResult.forms, null, 2)}

${scanResult.error ? `SCAN ERROR: ${scanResult.error}` : ''}

Respond with a JSON object in this EXACT format:
{
  "summary": "Brief overview of all findings (2-3 sentences)",
  "privacyConcerns": [
    {
      "issue": "Description of the privacy concern",
      "priority": "High" | "Medium" | "Low",
      "recommendation": "Specific actionable recommendation to address this issue"
    }
  ],
  "securityIssues": [
    {
      "issue": "Description of the security issue",
      "priority": "High" | "Medium" | "Low",
      "recommendation": "Specific actionable recommendation to fix this"
    }
  ],
  "gdprCompliance": {
    "compliant": true or false,
    "issues": ["List of GDPR compliance issues found"],
    "recommendations": ["List of specific GDPR compliance recommendations"]
  }
}

Important: Return ONLY the JSON object, no markdown formatting or additional text.`;

    console.log('📤 Sending request to OpenAI API...');

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert privacy and security analyst specializing in GDPR compliance, web security, and data protection best practices. Always respond with valid JSON only, no markdown or extra text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON response
    const parsedReport = JSON.parse(aiResponse);

    // Create the final report with additional metadata
    const report: PrivacyReport = {
      summary: parsedReport.summary || 'No summary provided',
      privacyConcerns: parsedReport.privacyConcerns || [],
      securityIssues: parsedReport.securityIssues || [],
      gdprCompliance: parsedReport.gdprCompliance || {
        compliant: false,
        issues: [],
        recommendations: [],
      },
      timestamp: new Date().toISOString(),
      url: scanResult.url,
    };

    // Log success and summary
    console.log('Report generated successfully!');
    console.log('─────────────────────────────────────────');
    console.log('REPORT SUMMARY:');
    console.log(report.summary);
    console.log(`\n Privacy Concerns: ${report.privacyConcerns.length}`);
    console.log(`Security Issues: ${report.securityIssues.length}`);
    console.log(
      `GDPR Compliant: ${report.gdprCompliance.compliant ? 'Yes' : 'No'}`
    );
    console.log('─────────────────────────────────────────');
    console.log('Token usage:', {
      prompt_tokens: completion.usage?.prompt_tokens,
      completion_tokens: completion.usage?.completion_tokens,
      total_tokens: completion.usage?.total_tokens,
    });

    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

/**
 * Generates a report for multiple scan results
 * @param scanResults - Array of scan results
 * @returns Promise that resolves with array of privacy reports
 */
export async function generateBatchReport(
  scanResults: ScanResult[]
): Promise<PrivacyReport[]> {
  console.log(`Generating batch report for ${scanResults.length} URLs`);

  const reports: PrivacyReport[] = [];

  for (let i = 0; i < scanResults.length; i++) {
    console.log(`\n[${i + 1}/${scanResults.length}] Processing...`);
    const report = await generateReport(scanResults[i]);
    reports.push(report);
  }

  console.log('\n Batch report generation completed!');
  return reports;
}
