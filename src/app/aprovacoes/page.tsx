'use client'
import { useState } from 'react'

export default function Aprovacoes() {
  const [projetos, setProjetos] = useState([
    { id: 1, nome: 'Projeto Alpha', status: 'pendente', solicitante: 'João Silva' },
    { id: 2, nome: 'Projeto Gamma', status: 'pendente', solicitante: 'Carlos Lima' }
  ])

  const aprovarProjeto = (id: number) => {
    setProjetos(projetos.map(p => 
      p.id === id ? { ...p, status: 'aprovado' } : p
    ))
  }

  const rejeitarProjeto = (id: number) => {
    setProjetos(projetos.map(p => 
      p.id === id ? { ...p, status: 'rejeitado' } : p
    ))
  }

  const projetosPendentes = projetos.filter(p => p.status === 'pendente')

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Painel de Aprovações</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Projetos Pendentes</h2>
            <p className="text-gray-600">{projetosPendentes.length} projeto(s) aguardando aprovação</p>
          </div>
          <div className="p-6">
            {projetosPendentes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum projeto pendente</p>
            ) : (
              <div className="space-y-4">
                {projetosPendentes.map(projeto => (
                  <div key={projeto.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{projeto.nome}</h3>
                        <p className="text-gray-600">Solicitante: {projeto.solicitante}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => aprovarProjeto(projeto.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => rejeitarProjeto(projeto.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Rejeitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}