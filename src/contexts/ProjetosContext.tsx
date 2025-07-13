'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Produto {
  id: number
  nome: string
  categoria: string
  quantidade: number
  preco: number
  descricao: string
}

interface ItemProjeto {
  produtoId: number
  quantidade: number
  observacoes?: string
}

interface Projeto {
  id: number
  nome: string
  descricao: string
  itens: ItemProjeto[]
  status: 'rascunho' | 'pendente' | 'aprovado' | 'rejeitado'
  dataCriacao: string
  dataEnvio?: string
  dataAprovacao?: string
  observacoesAprovacao?: string
}

interface ProjetosContextType {
  projetos: Projeto[]
  produtos: Produto[]
  criarProjeto: (projeto: Omit<Projeto, 'id' | 'dataCriacao'>) => void
  editarProjeto: (id: number, projeto: Partial<Projeto>) => void
  excluirProjeto: (id: number) => void
  enviarParaAprovacao: (id: number) => void
  aprovarProjeto: (id: number, observacoes?: string) => void
  rejeitarProjeto: (id: number, observacoes: string) => void
  adicionarProduto: (produto: Omit<Produto, 'id'>) => void
  editarProduto: (id: number, produto: Partial<Produto>) => void
  excluirProduto: (id: number) => void
}

const ProjetosContext = createContext<ProjetosContextType | undefined>(undefined)

const produtosIniciais: Produto[] = [
  { id: 1, nome: 'Notebook Dell', categoria: 'Eletrônicos', quantidade: 10, preco: 2500.00, descricao: 'Notebook Dell Inspiron 15' },
  { id: 2, nome: 'Mouse Logitech', categoria: 'Periféricos', quantidade: 25, preco: 89.90, descricao: 'Mouse óptico sem fio' },
  { id: 3, nome: 'Teclado Mecânico', categoria: 'Periféricos', quantidade: 15, preco: 299.90, descricao: 'Teclado mecânico RGB' },
  { id: 4, nome: 'Monitor 24"', categoria: 'Eletrônicos', quantidade: 8, preco: 899.90, descricao: 'Monitor LED 24 polegadas' },
  { id: 5, nome: 'Cabo HDMI', categoria: 'Cabos', quantidade: 50, preco: 29.90, descricao: 'Cabo HDMI 2.0 - 2m' }
]

export function ProjetosProvider({ children }: { children: ReactNode }) {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais)

  const criarProjeto = (novoProjeto: Omit<Projeto, 'id' | 'dataCriacao'>) => {
    const projeto: Projeto = {
      ...novoProjeto,
      id: Date.now(),
      dataCriacao: new Date().toISOString()
    }
    setProjetos(prev => [...prev, projeto])
  }

  const editarProjeto = (id: number, dadosAtualizados: Partial<Projeto>) => {
    setProjetos(prev => prev.map(p => p.id === id ? { ...p, ...dadosAtualizados } : p))
  }

  const excluirProjeto = (id: number) => {
    setProjetos(prev => prev.filter(p => p.id !== id))
  }

  const enviarParaAprovacao = (id: number) => {
    setProjetos(prev => prev.map(p => 
      p.id === id 
        ? { ...p, status: 'pendente' as const, dataEnvio: new Date().toISOString() }
        : p
    ))
  }

  const aprovarProjeto = (id: number, observacoes?: string) => {
    setProjetos(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            status: 'aprovado' as const, 
            dataAprovacao: new Date().toISOString(),
            observacoesAprovacao: observacoes 
          }
        : p
    ))
  }

  const rejeitarProjeto = (id: number, observacoes: string) => {
    setProjetos(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            status: 'rejeitado' as const, 
            dataAprovacao: new Date().toISOString(),
            observacoesAprovacao: observacoes 
          }
        : p
    ))
  }

  const adicionarProduto = (novoProduto: Omit<Produto, 'id'>) => {
    const produto: Produto = {
      ...novoProduto,
      id: Date.now()
    }
    setProdutos(prev => [...prev, produto])
  }

  const editarProduto = (id: number, dadosAtualizados: Partial<Produto>) => {
    setProdutos(prev => prev.map(p => p.id === id ? { ...p, ...dadosAtualizados } : p))
  }

  const excluirProduto = (id: number) => {
    setProdutos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProjetosContext.Provider value={{
      projetos,
      produtos,
      criarProjeto,
      editarProjeto,
      excluirProjeto,
      enviarParaAprovacao,
      aprovarProjeto,
      rejeitarProjeto,
      adicionarProduto,
      editarProduto,
      excluirProduto
    }}>
      {children}
    </ProjetosContext.Provider>
  )
}

export function useProjetos() {
  const context = useContext(ProjetosContext)
  if (context === undefined) {
    throw new Error('useProjetos deve ser usado dentro de um ProjetosProvider')
  }
  return context
}