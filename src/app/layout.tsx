import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Controle de Estoque',
  description: 'Sistema moderno de gerenciamento e controle de estoque',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2196f3" />
      </head>
      <body style={{ 
        margin: 0, 
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {children}
      </body>
    </html>
  )
}