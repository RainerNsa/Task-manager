import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from '@/components/UI/Navbar'
import { AuthProvider } from '@/context/AuthProvider'
import { ToastProvider } from '@/components/ToastProvider';
import ClientWrapper from '@/components/ClientWrapper'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  // Move the hook inside a client component or create a wrapper component
  // since hooks can't be used directly in Server Components
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add this for the modal portal */}
        <div id="modal-root" />
        {/* Wrap your components with the provider */}
        <AuthProvider>
          <ToastProvider />
          <Navbar />
          <main className="min-h-[calc(100vh-64px)] bg-gray-50">
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
