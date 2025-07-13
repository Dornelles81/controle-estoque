'use client'

import './globals.css'
import { ProjetosProvider } from '../contexts/ProjetosContext'
import { useState, useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ProjetosProvider>
          <div className="min-h-screen bg-secondary">
            <header className="bg-primary shadow-xl border-b border-primary">
              <div className="container">
                <nav className="nav">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">📦</div>
                    <h1 className="text-xl font-bold text-primary">
                      Controle de Estoque
                    </h1>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
                    <a href="/" className="nav-link">
                      <span className="text-lg">🏠</span>
                      Dashboard
                    </a>
                    <a href="/projetos" className="nav-link">
                      <span className="text-lg">📋</span>
                      Projetos
                    </a>
                    <a href="/aprovacoes" className="nav-link">
                      <span className="text-lg">✅</span>
                      Aprovações
                    </a>
                    <a href="/relatorios" className="nav-link">
                      <span className="text-lg">📊</span>
                      Relatórios
                    </a>
                    
                    <button
                      onClick={toggleTheme}
                      className="nav-link"
                      title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                    >
                      <span className="text-lg">
                        {theme === 'light' ? '🌙' : '☀️'}
                      </span>
                      {theme === 'light' ? 'Escuro' : 'Claro'}
                    </button>
                  </div>
                </nav>
              </div>
            </header>
            
            <main className="container py-6">
              {children}
            </main>
            
            <footer className="bg-primary border-t border-primary mt-12">
              <div className="container py-6 text-center text-secondary">
                <p>© 2024 Sistema de Controle de Estoque - Desenvolvido com ❤️</p>
              </div>
            </footer>
          </div>
        </ProjetosProvider>
      </body>
    </html>
  )
}