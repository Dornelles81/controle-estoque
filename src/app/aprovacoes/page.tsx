'use client'

import { useProjetos } from '../../contexts/ProjetosContext'
import Link from 'next/link'
import { useState } from 'react'

export default function AprovacoesPage() {
  const { projetos, aprovarProjeto, rejeitarProjeto } = useProjetos()
  const [observacoes, setObservacoes] = useState<{[key: number]: string}>({})
  const [mostrarDetalhes, setMostrarDetalhes] = useState<{[key: number]: boolean}>({})

  const projetosPendentes = projetos.filter(projeto => projeto.status === 'pendente')

  const handleObservacaoChange = (projetoId: number, valor: string) => {
    setObservacoes(prev => ({
      ...prev,
      [projetoId]: valor
    }))
  }

  const handleAprovar = (projetoId: number) => {
    const obs = observacoes[projetoId] || ''
    aprovarProjeto(projetoId, obs)
    alert('Projeto aprovado com sucesso!')
  }

  const handleRejeitar = (projetoId: number) => {
    const obs = observacoes[projetoId]
    if (!obs || obs.trim() === '') {
      alert('Por favor, adicione uma observação para a rejeição.')
      return
    }
    rejeitarProjeto(projetoId, obs)
    alert('Projeto rejeitado.')
  }

  const toggleDetalhes = (projetoId: number) => {
    setMostrarDetalhes(prev => ({
      ...prev,
      [projetoId]: !prev[projetoId]
    }))
  }

  const calcularValorTotal = (itens: any[]) => {
    return itens.reduce((total, item) => {
      return total + (item.quantidadeSolicitada * 2.5) // Valor estimado
    }, 0)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          ← Voltar ao Dashboard
        </Link>
      </div>

      <h1 style={{ color: '#333', marginBottom: '30px' }}>Central de Aprovações</h1>

      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '1px solid #bbdefb'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>📋 Resumo</h3>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px' }}>
          <div>
            <strong>Projetos Pendentes:</strong> 
            <span style={{ 
              backgroundColor: '#ff9800', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              marginLeft: '8px',
              fontSize: '12px'
            }}>
              {projetosPendentes.length}
            </span>
          </div>
          <div>
            <strong>Total de Projetos:</strong> 
            <span style={{ 
              backgroundColor: '#2196f3', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              marginLeft: '8px',
              fontSize: '12px'
            }}>
              {projetos.length}
            </span>
          </div>
        </div>
      </div>

      {projetosPendentes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>Nenhum projeto aguardando aprovação</h3>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Quando houver projetos enviados para aprovação, eles aparecerão aqui.
          </p>
          <Link href="/projetos" style={{
            display: 'inline-block',
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            Ir para Projetos
          </Link>
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Projetos Aguardando Aprovação</h2>
          
          {projetosPendentes.map(projeto => (
            <div key={projeto.id} style={{
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderLeft: '4px solid #ff9800',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '18px' }}>{projeto.nome}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.5' }}>{projeto.descricao}</p>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                    <span>📅 Criado: {projeto.dataCriacao}</span>
                    {projeto.dataEnvio && <span style={{ marginLeft: '15px' }}>📤 Enviado: {projeto.dataEnvio}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: '#ff9800',
                    color: 'white'
                  }}>
                    AGUARDANDO APROVAÇÃO
                  </span>
                  <button
                    onClick={() => toggleDetalhes(projeto.id)}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {mostrarDetalhes[projeto.id] ? 'Ocultar' : 'Detalhes'}
                  </button>
                </div>
              </div>

              {mostrarDetalhes[projeto.id] && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '6px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ marginBottom: '10px', color: '#333' }}>📦 Itens Solicitados:</h4>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {projeto.itens.map((item, index) => {
                      const disponibilidadeOk = item.quantidadeSolicitada <= item.quantidadeDisponivel
                      return (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          backgroundColor: disponibilidadeOk ? '#d4edda' : '#f8d7da',
                          border: `1px solid ${disponibilidadeOk ? '#c3e6cb' : '#f5c6cb'}`,
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}>
                          <span><strong>{item.produtoNome}</strong></span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span>Solicitado: <strong>{item.quantidadeSolicitada}</strong></span>
                            <span>Disponível: <strong>{item.quantidadeDisponivel}</strong></span>
                            <span style={{
                              color: disponibilidadeOk ? '#155724' : '#721c24',
                              fontWeight: 'bold',
                              fontSize: '12px'
                            }}>
                              {disponibilidadeOk ? '✅ OK' : '⚠️ INSUFICIENTE'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    <strong>Valor Estimado Total: R$ {calcularValorTotal(projeto.itens).toFixed(2)}</strong>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Observações da Aprovação:
                </label>
                <textarea
                  value={observacoes[projeto.id] || ''}
                  onChange={(e) => handleObservacaoChange(projeto.id, e.target.value)}
                  placeholder="Adicione observações sobre a aprovação ou rejeição..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'Arial, sans-serif'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleRejeitar(projeto.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ❌ Rejeitar
                </button>
                <button
                  onClick={() => handleAprovar(projeto.id)}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Aprovar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>💡 Dicas para Aprovação:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404', fontSize: '14px' }}>
          <li>Verifique a disponibilidade de estoque antes de aprovar</li>
          <li>Adicione observações detalhadas para facilitar o acompanhamento</li>
          <li>Projetos rejeitados podem ser editados e reenviados</li>
          <li>Considere o valor total do projeto no processo de aprovação</li>
        </ul>
      </div>
    </div>
  )
}