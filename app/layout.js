export const metadata = {
  title: 'Hanzala Cutie',
  description: 'My Next.js site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
