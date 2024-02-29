"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'typeface-poppins';
import { AuthProvider } from "@/components/contexts/AuthContext";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarProvider } from "@/components/contexts/SidebarContext";
import { ProductProvider } from "@/components/contexts/ProductContext";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
          <SidebarProvider>
          <ToastContainer/>
          {children}
          </SidebarProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
