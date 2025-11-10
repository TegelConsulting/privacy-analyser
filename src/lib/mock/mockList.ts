import { ScanResult } from "../types/ScanResult";


export const mockScans: ScanResult[] = [
  {
    id: "id1",
    url: "https://exempel.se",
    timestamp: new Date().toISOString(),
    cookies: [
      {
        name: "sid",
        value: "abc123",
        domain: ".exempel.se",
        path: "/",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
      {
        name: "analytics",
        value: "GA1.2.123456.7890",
        domain: ".exempel.se",
        path: "/",
        expires: Date.now() + 100 * 60 * 60 * 24 * 365,
        httpOnly: false,
        secure: true,
        sameSite: "None",
      },
    ],
    scripts: [
      { src: "/assets/app.js", type: "module", async: false, defer: true, inline: false },
      { src: "https://cdn.example.com/lib.js", type: "text/javascript", async: true, defer: false, inline: false },
      { src: null, type: null, async: false, defer: false, inline: true, content: "console.log('inline');" },
    ],
    forms: [
      {
        action: "/login",
        method: "POST",
        id: "loginForm",
        name: "login",
        fields: [
          { type: "email", name: "email", id: "email", required: true, placeholder: "din@mail.se" },
          { type: "password", name: "password", id: "password", required: true, placeholder: null },
          { type: "submit", name: null, id: null, required: false, placeholder: null },
        ],
      },
    ],
    stats: {
      gdpr: 67,
      w3c: 90,
      accessibility: 34,
    },
  },
  {
    id: "id2",
    url: "https://butik.se",
    timestamp: new Date(Date.now() - 3600_000).toISOString(),
    cookies: [
      { name: "cart", value: "%5B%5D", domain: ".butik.se", path: "/", expires: Date.now() + 86400_000, httpOnly: false, secure: true, sameSite: "Strict" },
      { name: "session", value: "s-999", domain: ".butik.se", path: "/", expires: Date.now() + 86_400_000 * 14, httpOnly: true, secure: true, sameSite: "Lax" },
      { name: "ab", value: "A", domain: ".butik.se", path: "/", expires: Date.now() + 86_400_000 * 30, httpOnly: false, secure: false, sameSite: "Lax" },
    ],
    scripts: [
      { src: "/static/shop.js", type: "text/javascript", async: false, defer: true, inline: false },
      { src: "https://analytics.cool/track.js", type: "text/javascript", async: true, defer: false, inline: false },
    ],
    forms: [
      {
        action: "/checkout",
        method: "POST",
        id: null,
        name: "checkout",
        fields: [
          { type: "text", name: "address", id: null, required: true, placeholder: "Gata 1" },
          { type: "text", name: "zip", id: null, required: true, placeholder: "12345" },
          { type: "submit", name: null, id: null, required: false, placeholder: null },
        ],
      },
      {
        action: "/newsletter",
        method: "POST",
        id: "nl",
        name: "newsletter",
        fields: [
          { type: "email", name: "email", id: "nl-email", required: true, placeholder: null },
        ],
      },
    ],
    stats: {
      gdpr: 45,
      w3c: 80,
      accessibility: 4,
    },

  },
  {
    id: "id3",
    url: "https://blogg.se",
    timestamp: new Date(Date.now() - 24 * 3600_000).toISOString(),
    cookies: [
      { name: "theme", value: "dark", domain: ".blogg.se", path: "/", expires: Date.now() + 86_400_000 * 90, httpOnly: false, secure: true, sameSite: "Strict" },
    ],
    scripts: [
      { src: null, type: null, async: false, defer: false, inline: true, content: "/* banner */" },
    ],
    forms: [],
    stats: {
      gdpr: 7,
      w3c: 20,
      accessibility: 40,
    },

  },
];
