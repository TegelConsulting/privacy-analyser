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
    const prompt = `Du är en integritets- och säkerhetsanalytiker. Analysera följande webbplatsskanningsresultat och svara ENDAST med giltig JSON i exakt det format som specificeras nedan. Svara på SVENSKA.

Webbplats-URL: ${scanResult.url}
Skanning datum: ${scanResult.timestamp}

COOKIES UPPTÄCKTA (${scanResult.cookies.length}):
${JSON.stringify(scanResult.cookies, null, 2)}

SKRIPT UPPTÄCKTA (${scanResult.scripts.length}):
${JSON.stringify(scanResult.scripts, null, 2)}

FORMULÄR UPPTÄCKTA (${scanResult.forms.length}):
${JSON.stringify(scanResult.forms, null, 2)}

${scanResult.error ? `SKANNINGSFEL: ${scanResult.error}` : ''}

Svara med ett JSON-objekt i detta EXAKTA format (på svenska):
{
  "summary": "Kort översikt av alla fynd (2-3 meningar på svenska)",
  "privacyConcerns": [
    {
      "issue": "Beskrivning av integritetsproblemet på svenska",
      "priority": "High" | "Medium" | "Low",
      "recommendation": "Specifik åtgärdbar rekommendation för att åtgärda detta problem på svenska"
    }
  ],
  "securityIssues": [
    {
      "issue": "Beskrivning av säkerhetsproblemet på svenska",
      "priority": "High" | "Medium" | "Low",
      "recommendation": "Specifik åtgärdbar rekommendation för att åtgärda detta på svenska"
    }
  ],
  "gdprCompliance": {
    "compliant": true eller false,
    "issues": ["Lista över GDPR-efterlevnadsproblem som hittats på svenska"],
    "recommendations": ["Lista över specifika GDPR-efterlevnadsrekommendationer på svenska"]
  }
}

Viktigt: Returnera ENDAST JSON-objektet på SVENSKA, ingen markdown-formatering eller ytterligare text.`;

    console.log('📤 Sending request to OpenAI API...');

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Du är en expert på integritets- och säkerhetsanalys med specialisering på GDPR-efterlevnad, webbsäkerhet och bästa praxis för dataskydd. Svara alltid på SVENSKA med endast giltig JSON, ingen markdown eller extra text.',
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
