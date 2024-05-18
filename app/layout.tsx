import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "FarmaSya",
  description: "La Farmacia Online de casa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className='py-12 lg:px-36 lg:py-36'>
          <div>
            <h1 className='flex w-full justify-center text-5xl md:text-[85px] lg:text-[85px] font-extrabold text-color-secondary pb-5'> FarmaSya </h1>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
