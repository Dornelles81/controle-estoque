'use client'
import { useState } from 'react'

export default function Projetos() {
  const [projetos, setProjetos] = useState([
    { id: 1, nome: 'Projeto Alpha', status: 'pendente', solicitante: 'João Silva' },
    { id: 2, nome: 'Projeto Beta', status: 'aprovado', solicitante: 'Maria Santos' }
  ])
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestão de Projetos</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Projetos Cadastrados</h2>
          <div className="space-y-4">
            {projetos.map(projeto => (
              <div key={projeto.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">{projeto.nome}</h3>
                  <p className="text-sm text-gray-600">Solicitante: {projeto.solicitante}</p>
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
        </div>
      </div>
    </div>
  )
}