import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  const { fullName, company, documentTitle, email } = await req.json();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Noto Serif', serif;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          p {
            font-size: 16px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${documentTitle}</h1>
        <p>This document is prepared for <strong>${fullName}</strong> at <strong>${company}</strong>.</p>
        <p>We will reach out to you at ${email} once the document is ready.</p>
      </body>
    </html>
  `;

  await page.setContent(content);
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();

  const response = new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
    },
  });

  return response;
}