import './globals.css'

import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="dark" suppressHydrationWarning>
      <body className={firaCode.className}>{children}</body>
    </html>
  )
}
