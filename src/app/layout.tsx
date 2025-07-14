import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema de Controle de Estoque',
  description: 'Sistema completo para gerenciamento de estoque e projetos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <script src="https://cdn.tailwindcss.com"></script>
        {children}
      </body>
    </html>
  );
}