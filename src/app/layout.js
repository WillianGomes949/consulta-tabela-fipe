import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Consulta Tabela FIPE",
  description: "Consulte a tebala de veiculos da FIPE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
