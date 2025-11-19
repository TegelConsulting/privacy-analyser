import { chromium, Browser, Page } from 'playwright';

export interface CookieInfo {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

export interface ScriptInfo {
  src: string | null;
  type: string | null;
  async: boolean;
  defer: boolean;
  inline: boolean;
  content?: string;
}

export interface FormInfo {
  action: string | null;
  method: string;
  id: string | null;
  name: string | null;
  fields: FormField[];
}

export interface FormField {
  type: string;
  name: string | null;
  id: string | null;
  required: boolean;
  placeholder: string | null;
}

export interface ScanResult {
  url: string;
  timestamp: string;
  cookies: CookieInfo[];
  scripts: ScriptInfo[];
  forms: FormInfo[];
  error?: string;
}

export class URLScanner {
  private browser: Browser | null = null;

  async init() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scanURL(url: string): Promise<ScanResult> {
    await this.init();

    const result: ScanResult = {
      url,
      timestamp: new Date().toISOString(),
      cookies: [],
      scripts: [],
      forms: [],
    };

    let page: Page | null = null;

    try {
      const context = await this.browser!.newContext({
        acceptDownloads: false,
        javaScriptEnabled: true,
      });

      page = await context.newPage();

      // Navigate to the URL with a reasonable timeout
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Wait a bit for any dynamic content to load
      await page.waitForTimeout(2000);

      // Collect cookies
      const cookies = await context.cookies();
      result.cookies = cookies.map((cookie) => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite as 'Strict' | 'Lax' | 'None',
      }));

      // Collect scripts
      result.scripts = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script'));
        return scripts.map((script) => {
          const isInline = !script.src;
          return {
            src: script.src || null,
            type: script.type || null,
            async: script.async,
            defer: script.defer,
            inline: isInline,
            content: isInline
              ? script.textContent?.substring(0, 500)
              : undefined,
          };
        });
      });

      // Collect forms
      result.forms = await page.evaluate(() => {
        const forms = Array.from(document.querySelectorAll('form'));
        return forms.map((form) => {
          const fields = Array.from(
            form.querySelectorAll('input, textarea, select')
          ).map((field) => {
            const inputField = field as
              | HTMLInputElement
              | HTMLTextAreaElement
              | HTMLSelectElement;
            return {
              type: inputField.type || 'text',
              name: inputField.name || null,
              id: inputField.id || null,
              required: 'required' in inputField ? inputField.required : false,
              placeholder:
                'placeholder' in inputField
                  ? inputField.placeholder || null
                  : null,
            };
          });

          return {
            action: form.action || null,
            method: form.method || 'get',
            id: form.id || null,
            name: form.getAttribute('name') || null,
            fields,
          };
        });
      });

      await context.close();
    } catch (error) {
      result.error =
        error instanceof Error ? error.message : 'Unknown error occurred';
    } finally {
      if (page) {
        await page.close().catch(() => {});
      }
    }

    return result;
  }
}

// Singleton instance for reuse
let scannerInstance: URLScanner | null = null;

export async function getScanner(): Promise<URLScanner> {
  if (!scannerInstance) {
    scannerInstance = new URLScanner();
    await scannerInstance.init();
  }
  return scannerInstance;
}

export async function closeScanner() {
  if (scannerInstance) {
    await scannerInstance.close();
    scannerInstance = null;
  }
}
