'use client'

import { useState } from 'react'
import { useProjetos } from '../../contexts/ProjetosContext'
import Link from 'next/link'

export default function ProjetosPage() {
  const { projetos, produtos, criarProjeto, enviarParaAprovacao } = useProjetos()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nomeProjeto, setNomeProjeto] = useState('')
  const [descricaoProjeto, setDescricaoProjeto] = useState('')
  const [itensSelecionados, setItensSelecionados] = useState<{[key: number]: number}>({})
  const [buscaProduto, setBuscaProduto] = useState('')

  // Filtrar produtos baseado na busca
  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(buscaProduto.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(buscaProduto.toLowerCase())
  )

  const handleCriarProjeto = () => {
    if (!nomeProjeto.trim() || !descricaoProjeto.trim()) {
      alert('Por favor, preencha nome e descrição do projeto')
      return
    }

    const itens = Object.entries(itensSelecionados)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([produtoId, quantidadeSolicitada]) => {
        const produto = produtos.find(p => p.id === parseInt(produtoId))
        return {
          produtoId: parseInt(produtoId),
          produtoNome: produto?.nome || '',
          quantidadeSolicitada,
          quantidadeDisponivel: produto?.quantidade || 0
        }
      })

    if (itens.length === 0) {
      alert('Selecione pelo menos um produto')
      return
    }

    criarProjeto({
      nome: nomeProjeto,
      descricao: descricaoProjeto,
      itens,
      status: 'rascunho'
    })

    // Limpar formulário
    setNomeProjeto('')
    setDescricaoProjeto('')
    setItensSelecionados({})
    setBuscaProduto('')
    setMostrarFormulario(false)
    alert('Projeto criado com sucesso!')
  }

  const handleQuantidadeChange = (produtoId: number, quantidade: number) => {
    setItensSelecionados(prev => ({
      ...prev,
      [produtoId]: quantidade
    }))
  }

  const limparBusca = () => {
    setBuscaProduto('')
  }

  const adicionarProdutoRapido = (produto: any) => {
    setItensSelecionados(prev => ({
      ...prev,
      [produto.id]: 1
    }))
    setBuscaProduto('')
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

      <h1 style={{ color: '#333', marginBottom: '30px' }}>Gestão de Projetos</h1>

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {mostrarFormulario ? 'Cancelar' : '📝 Criar Projeto'}
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Novo Projeto</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Projeto:</label>
            <input
              type="text"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              placeholder="Digite o nome do projeto"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descrição:</label>
            <textarea
              value={descricaoProjeto}
              onChange={(e) => setDescricaoProjeto(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Descreva o projeto"
            />
          </div>

          <h4 style={{ marginBottom: '15px', color: '#333' }}>📦 Produtos Necessários:</h4>
          
          {/* Campo de Busca de Produtos */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={buscaProduto}
                onChange={(e) => setBuscaProduto(e.target.value)}
                placeholder="🔍 Digite o nome do produto para buscar..."
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 12px',
                  border: '2px solid #007bff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#f8f9ff'
                }}
              />
              {buscaProduto && (
                <button
                  onClick={limparBusca}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '16px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Resultados da Busca */}
            {buscaProduto && (
              <div style={{
                marginTop: '8px',
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map(produto => (
                    <div
                      key={produto.id}
                      onClick={() => adicionarProdutoRapido(produto)}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <div>
                        <strong>{produto.nome}</strong>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {produto.categoria} | Disponível: {produto.quantidade}
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        + Adicionar
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    Nenhum produto encontrado para "{buscaProduto}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Lista de Produtos Selecionados */}
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ marginBottom: '10px', color: '#333' }}>Produtos Selecionados:</h5>
            {Object.keys(itensSelecionados).filter(id => itensSelecionados[parseInt(id)] > 0).length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic', fontSize: '14px' }}>
                Nenhum produto selecionado. Use a busca acima para adicionar produtos.
              </p>
            ) : (
              <div>
                {Object.entries(itensSelecionados)
                  .filter(([_, quantidade]) => quantidade > 0)
                  .map(([produtoId, quantidade]) => {
                    const produto = produtos.find(p => p.id === parseInt(produtoId))
                    if (!produto) return null
                    
                    return (
                      <div key={produtoId} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <strong>{produto.nome}</strong>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            Categoria: {produto.categoria} | Disponível: {produto.quantidade} | R$ {produto.preco.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <label style={{ fontSize: '14px' }}>Quantidade:</label>
                          <input
                            type="number"
                            min="0"
                            max={produto.quantidade}
                            value={quantidade}
                            onChange={(e) => handleQuantidadeChange(produto.id, parseInt(e.target.value) || 0)}
                            style={{
                              width: '80px',
                              padding: '5px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              textAlign: 'center'
                            }}
                          />
                          <button
                            onClick={() => handleQuantidadeChange(produto.id, 0)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )}
          </div>

          <button
            onClick={handleCriarProjeto}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Salvar Projeto
          </button>
        </div>
      )}

      <h2 style={{ marginBottom: '20px', color: '#333' }}>Meus Projetos</h2>
      
      {projetos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhum projeto criado ainda.</p>
      ) : (
        <div>
          {projetos.map(projeto => (
            <div key={projeto.id} style={{
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{projeto.nome}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666' }}>{projeto.descricao}</p>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    Criado em: {projeto.dataCriacao}
                    {projeto.dataEnvio && ` | Enviado em: ${projeto.dataEnvio}`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: 
                      projeto.status === 'rascunho' ? '#ffc107' :
                      projeto.status === 'pendente' ? '#17a2b8' :
                      projeto.status === 'aprovado' ? '#28a745' : '#dc3545',
                    color: 'white'
                  }}>
                    {projeto.status.toUpperCase()}
                  </span>
                  {projeto.status === 'rascunho' && (
                    <button
                      onClick={() => enviarParaAprovacao(projeto.id)}
                      style={{
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Enviar para Aprovação
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <strong>Itens solicitados:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {projeto.itens.map((item, index) => (
                    <li key={index} style={{ fontSize: '14px', marginBottom: '2px' }}>
                      {item.produtoNome} - Quantidade: {item.quantidadeSolicitada}
                      {item.quantidadeSolicitada > item.quantidadeDisponivel && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}> (Estoque insuficiente!)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {projeto.observacoes && (
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong>Observações:</strong> {projeto.observacoes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}