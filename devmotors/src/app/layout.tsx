import type { Metadata } from "next";
import "./globals.scss";
import { Header } from '../components/header'

export const metadata: Metadata = {
  title: "DevMotors - Sua oficina especializada!",
  description: "Oficina de carros em São Paulo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        
        <p style={{ textAlign: "center", marginTop: 54, marginBottom: 24 }}>
                Todos direitos reservados @{`${new Date().getFullYear()}`}
            </p>
      </body>
    </html>
  );
}
