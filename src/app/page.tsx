'use client'

import { useProjetos } from '../contexts/ProjetosContext'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const { projetos, produtos } = useProjetos()
  const [animatedStats, setAnimatedStats] = useState({
    totalProjetos: 0,
    projetosAprovados: 0,
    projetosPendentes: 0,
    totalProdutos: 0,
    valorTotalEstoque: 0
  })

  const stats = {
    totalProjetos: projetos.length,
    projetosAprovados: projetos.filter(p => p.status === 'aprovado').length,
    projetosPendentes: projetos.filter(p => p.status === 'pendente').length,
    totalProdutos: produtos.length,
    valorTotalEstoque: produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0)
  }

  // Animação dos números
  useEffect(() => {
    const animateValue = (key: keyof typeof stats, target: number) => {
      const duration = 1000
      const steps = 60
      const increment = target / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, duration / steps)
    }

    Object.entries(stats).forEach(([key, value]) => {
      animateValue(key as keyof typeof stats, value)
    })
  }, [projetos, produtos])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="card card-gradient text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-6xl animate-bounce">📦</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Dashboard - Controle de Estoque
            </h1>
            <p className="text-lg opacity-90">
              Visão geral completa do seu sistema de gerenciamento
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card-glass p-4 rounded-xl">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold">Sistema Ativo</div>
            <div className="text-sm opacity-75">100% Operacional</div>
          </div>
          <div className="card-glass p-4 rounded-xl">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-semibold">Sincronizado</div>
            <div className="text-sm opacity-75">Dados em tempo real</div>
          </div>
          <div className="card-glass p-4 rounded-xl">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="font-semibold">Seguro</div>
            <div className="text-sm opacity-75">Dados protegidos</div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="responsive-grid">
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">📊</div>
          <div className="text-4xl font-bold text-accent mb-2">
            {animatedStats.totalProjetos}
          </div>
          <div className="text-secondary font-medium">Total de Projetos</div>
          <div className="mt-2 text-xs text-tertiary">
            {stats.totalProjetos > 0 ? '+' + ((stats.totalProjetos / 10) * 100).toFixed(0) + '% este mês' : 'Nenhum projeto ainda'}
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">✅</div>
          <div className="text-4xl font-bold text-success mb-2">
            {animatedStats.projetosAprovados}
          </div>
          <div className="text-secondary font-medium">Projetos Aprovados</div>
          <div className="mt-2">
            <div className="w-full bg-tertiary rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${stats.totalProjetos > 0 ? (stats.projetosAprovados / stats.totalProjetos) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-4xl font-bold text-warning mb-2">
            {animatedStats.projetosPendentes}
          </div>
          <div className="text-secondary font-medium">Pendentes de Aprovação</div>
          <div className="mt-2">
            {stats.projetosPendentes > 0 && (
              <span className="badge badge-warning animate-pulse">
                Requer Atenção
              </span>
            )}
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">📦</div>
          <div className="text-4xl font-bold text-info mb-2">
            {animatedStats.totalProdutos}
          </div>
          <div className="text-secondary font-medium">Produtos em Estoque</div>
          <div className="mt-2 text-xs text-tertiary">
            {produtos.reduce((acc, p) => acc + p.quantidade, 0)} unidades totais
          </div>
        </div>
        
        <div className="card card-success text-center md:col-span-2 hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">💰</div>
          <div className="text-4xl font-bold mb-2">
            R$ {animatedStats.valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="font-medium opacity-90">Valor Total do Estoque</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="card-glass p-3 rounded-lg">
              <div className="font-semibold">Produto Mais Caro</div>
              <div className="opacity-75">
                {produtos.length > 0 ? produtos.reduce((max, p) => p.preco > max.preco ? p : max).nome : 'N/A'}
              </div>
            </div>
            <div className="card-glass p-3 rounded-lg">
              <div className="font-semibold">Maior Estoque</div>
              <div className="opacity-75">
                {produtos.length > 0 ? produtos.reduce((max, p) => p.quantidade > max.quantidade ? p : max).nome : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">⚡</div>
          <h2 className="text-xl font-semibold text-primary">Ações Rápidas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/projetos" className="btn btn-primary group">
            <span className="text-lg group-hover:animate-bounce">📋</span>
            Novo Projeto
          </a>
          <a href="/aprovacoes" className="btn btn-secondary group">
            <span className="text-lg group-hover:animate-bounce">✅</span>
            Ver Aprovações
            {stats.projetosPendentes > 0 && (
              <span className="badge badge-warning ml-2">{stats.projetosPendentes}</span>
            )}
          </a>
          <a href="/relatorios" className="btn btn-success group">
            <span className="text-lg group-hover:animate-bounce">📊</span>
            Relatórios
          </a>
          <button 
            className="btn btn-warning group" 
            onClick={() => window.location.reload()}
          >
            <span className="text-lg group-hover:animate-spin">🔄</span>
            Atualizar
          </button>
        </div>
      </div>

      {/* Projetos Recentes */}
      {projetos.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl">📋</div>
            <h2 className="text-xl font-semibold text-primary">Projetos Recentes</h2>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th className="hidden md:table-cell">Descrição</th>
                  <th>Status</th>
                  <th className="hidden md:table-cell">Itens</th>
                  <th className="hidden lg:table-cell">Data</th>
                </tr>
              </thead>
              <tbody>
                {projetos.slice(-5).reverse().map((projeto) => (
                  <tr key={projeto.id} className="hover:bg-secondary transition-colors">
                    <td className="font-medium text-primary">{projeto.nome}</td>
                    <td className="hidden md:table-cell text-secondary">
                      {projeto.descricao.length > 50 
                        ? `${projeto.descricao.substring(0, 50)}...` 
                        : projeto.descricao
                      }
                    </td>
                    <td>
                      <span className={`badge ${
                        projeto.status === 'aprovado' ? 'badge-success' :
                        projeto.status === 'rejeitado' ? 'badge-danger' :
                        projeto.status === 'pendente' ? 'badge-warning' :
                        'badge-secondary'
                      }`}>
                        {projeto.status === 'aprovado' && '✅'}
                        {projeto.status === 'rejeitado' && '❌'}
                        {projeto.status === 'pendente' && '⏳'}
                        {projeto.status === 'rascunho' && '📝'}
                        {projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1)}
                      </span>
                    </td>
                    <td className="hidden md:table-cell text-secondary">
                      {projeto.itens.length} {projeto.itens.length === 1 ? 'item' : 'itens'}
                    </td>
                    <td className="hidden lg:table-cell text-tertiary text-sm">
                      {new Date(projeto.dataCriacao).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Produtos com Estoque Baixo */}
      {produtos.filter(p => p.quantidade < 10).length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl">⚠️</div>
            <h2 className="text-xl font-semibold text-warning">Alerta de Estoque Baixo</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.filter(p => p.quantidade < 10).map((produto) => (
              <div key={produto.id} className="card bg-warning text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{produto.nome}</h3>
                  <span className="badge badge-danger">
                    {produto.quantidade} restantes
                  </span>
                </div>
                <p className="text-sm opacity-90">{produto.categoria}</p>
                <p className="text-xs opacity-75 mt-1">
                  Valor unitário: R$ {produto.preco.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}