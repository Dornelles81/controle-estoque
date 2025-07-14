'use client'
import { useState, useEffect } from 'react'

interface Projeto {
  id: string
  nome: string
  status: 'pendente' | 'aprovado' | 'rejeitado'
  solicitante: string
  dataCreacao: string
}

export default function Dashboard() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [stats, setStats] = useState({
    totalProjetos: 0,
    pendentesAprovacao: 0,
    aprovados: 0,
    rejeitados: 0
  })

  useEffect(() => {
    // Simular dados (substitua por API real)
    const projetosSimulados: Projeto[] = [
      {
        id: '1',
        nome: 'Projeto Alpha',
        status: 'pendente',
        solicitante: 'João Silva',
        dataCreacao: '2025-01-13'
      },
      {
        id: '2', 
        nome: 'Projeto Beta',
        status: 'aprovado',
        solicitante: 'Maria Santos',
        dataCreacao: '2025-01-12'
      },
      {
        id: '3',
        nome: 'Projeto Gamma',
        status: 'rejeitado',
        solicitante: 'Carlos Lima',
        dataCreacao: '2025-01-11'
      }
    ]
    
    setProjetos(projetosSimulados)
    
    // Calcular estatísticas
    setStats({
      totalProjetos: projetosSimulados.length,
      pendentesAprovacao: projetosSimulados.filter(p => p.status === 'pendente').length,
      aprovados: projetosSimulados.filter(p => p.status === 'aprovado').length,
      rejeitados: projetosSimulados.filter(p => p.status === 'rejeitado').length
    })
  }, [])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard - Controle de Estoque</h1>
        
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total de Projetos</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProjetos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendentesAprovacao}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Aprovados</h3>
            <p className="text-3xl font-bold text-green-600">{stats.aprovados}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Rejeitados</h3>
            <p className="text-3xl font-bold text-red-600">{stats.rejeitados}</p>
          </div>
        </div>

        {/* Lista de Projetos Recentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Projetos Recentes</h2>
          </div>
          <div className="p-6">
            {projetos.length === 0 ? (
              <p className="text-gray-500">Nenhum projeto encontrado</p>
            ) : (
              <div className="space-y-4">
                {projetos.map(projeto => (
                  <div key={projeto.id} className="flex justify-between items-center p-4 border rounded">
                    <div>
                      <h3 className="font-semibold">{projeto.nome}</h3>
                      <p className="text-sm text-gray-600">Solicitante: {projeto.solicitante}</p>
                      <p className="text-sm text-gray-600">Data: {projeto.dataCreacao}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      projeto.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      projeto.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1)}
                    </span>
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