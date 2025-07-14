'use client'
import { useState, useEffect } from 'react'

export default function Relatorios() {
  const [dados, setDados] = useState({
    totalProjetos: 3,
    projetosAprovados: 1,
    projetosRejeitados: 0,
    projetosPendentes: 2,
    taxaAprovacao: 33.3
  })

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Relatórios do Sistema</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total de Projetos</h3>
            <p className="text-3xl font-bold text-blue-600">{dados.totalProjetos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Aprovados</h3>
            <p className="text-3xl font-bold text-green-600">{dados.projetosAprovados}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">{dados.projetosPendentes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Taxa de Aprovação</h3>
            <p className="text-3xl font-bold text-purple-600">{dados.taxaAprovacao}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Relatório Detalhado</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Dados atualizados em tempo real do sistema de projetos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}