import "./globals.css";

export const metadata = {
  title: "Assigment Submission Portal",
  description: "Assigment Submission Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b-[1px] bg-slate-50 p-5 font-semibold">
          <h2>Assigment Submission Portal</h2>
        </header>
        {children}
      </body>
    </html>
  );
}
