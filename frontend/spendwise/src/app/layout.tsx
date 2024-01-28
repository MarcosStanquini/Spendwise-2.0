export const metadata = {
  title: 'SpendWise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className="antialiased">{children}</body>
    </html>
  )
}
