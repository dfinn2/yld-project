import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { businessName, businessAddress, email, product, productNameOrTrademark, skus, manufacturerNameChinese, manufacturerNameEnglish } = req.body;

    try {
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
            <h1>Non-Disclosure, Non-Use, and Non-Circumvention Agreement</h1>
            <p>This document is prepared for <strong>${businessName}</strong> at <strong>${businessAddress}</strong>.</p>
            <p>Product: ${product}</p>
            <p>Product Name or Trademark: ${productNameOrTrademark}</p>
            <p>SKUs: ${skus}</p>
            <p>Manufacturer Name (English): ${manufacturerNameEnglish}</p>
            <p>Manufacturer Name (Chinese): ${manufacturerNameChinese}</p>
          </body>
        </html>
      `;

      await page.setContent(content);
      const pdf = await page.pdf({ format: 'A4' });

      await browser.close();

      // Send the PDF to the user's email if provided
      if (email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your NNN Document',
          text: 'Please find attached your NNN Document.',
          attachments: [
            {
              filename: 'document.pdf',
              content: pdf,
              contentType: 'application/pdf',
            },
          ],
        };

        await transporter.sendMail(mailOptions);
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
      res.send(pdf);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}