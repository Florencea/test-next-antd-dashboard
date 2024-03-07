import { AntdRegistry } from "@ant-design/nextjs-registry";
import "tailwindcss/tailwind.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="__next">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
