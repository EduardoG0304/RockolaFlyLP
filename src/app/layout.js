// app/layout.js
import './globals.css';

export const metadata = {
  title: "RockolaFly",
  description: "Generated by create Petrosistemas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}