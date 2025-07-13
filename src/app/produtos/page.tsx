'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Produto {
  id: number
  nome: string
  preco: number
  quantidade: number
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: 'Notebook Dell', preco: 2500.00, quantidade: 10 },
    { id: 2, nome: 'Mouse Logitech', preco: 85.50, quantidade: 25 },
    { id: 3, nome: 'Teclado Mecânico', preco: 350.00, quantidade: 15 }
  ])
  
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' })
  const [produtoParaRemover, setProdutoParaRemover] = useState<number | null>(null)
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(null)
  const [produtoEditando, setProdutoEditando] = useState({ nome: '', preco: '', quantidade: '' })

  const adicionarProduto = () => {
    if (novoProduto.nome && novoProduto.preco && novoProduto.quantidade) {
      const produto: Produto = {
        id: Date.now(),
        nome: novoProduto.nome,
        preco: parseFloat(novoProduto.preco),
        quantidade: parseInt(novoProduto.quantidade)
      }
      setProdutos([...produtos, produto])
      setNovoProduto({ nome: '', preco: '', quantidade: '' })
    }
  }

  const confirmarRemocao = (id: number) => {
    setProdutoParaRemover(id)
  }

  const removerProduto = () => {
    if (produtoParaRemover) {
      setProdutos(produtos.filter(p => p.id !== produtoParaRemover))
      setProdutoParaRemover(null)
    }
  }

  const cancelarRemocao = () => {
    setProdutoParaRemover(null)
  }

  const iniciarEdicao = (produto: Produto) => {
    setProdutoParaEditar(produto)
    setProdutoEditando({
      nome: produto.nome,
      preco: produto.preco.toString(),
      quantidade: produto.quantidade.toString()
    })
  }

  const salvarEdicao = () => {
    if (produtoParaEditar && produtoEditando.nome && produtoEditando.preco && produtoEditando.quantidade) {
      const produtoAtualizado: Produto = {
        ...produtoParaEditar,
        nome: produtoEditando.nome,
        preco: parseFloat(produtoEditando.preco),
        quantidade: parseInt(produtoEditando.quantidade)
      }
      
      setProdutos(produtos.map(p => 
        p.id === produtoParaEditar.id ? produtoAtualizado : p
      ))
      
      cancelarEdicao()
    }
  }

  const cancelarEdicao = () => {
    setProdutoParaEditar(null)
    setProdutoEditando({ nome: '', preco: '', quantidade: '' })
  }

  const valorTotal = produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0)
  const totalItens = produtos.reduce((total, produto) => total + produto.quantidade, 0)

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          ← Voltar ao Dashboard
        </Link>
      </div>

      <h1 style={{ color: '#333', marginBottom: '30px', fontSize: '2.5rem' }}>📦 Gerenciamento de Produtos</h1>
      
      {/* Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#28a745', margin: '0 0 10px 0' }}>Total de Produtos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>{produtos.length}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#007bff', margin: '0 0 10px 0' }}>Total de Itens</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>{totalItens}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#6f42c1', margin: '0 0 10px 0' }}>Valor Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
            R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
        marginBottom: '30px' 
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Adicionar Novo Produto</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
            style={{ 
              padding: '12px', 
              border: '2px solid #ddd', 
              borderRadius: '6px', 
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
            style={{ 
              padding: '12px', 
              border: '2px solid #ddd', 
              borderRadius: '6px', 
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={novoProduto.quantidade}
            onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})}
            style={{ 
              padding: '12px', 
              border: '2px solid #ddd', 
              borderRadius: '6px', 
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <button
          onClick={adicionarProduto}
          style={{ 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '6px', 
            fontSize: '16px', 
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          ➕ Adicionar Produto
        </button>
      </div>

      {/* Lista de Produtos */}
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
        overflow: 'hidden' 
      }}>
        <h2 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #eee', color: '#333' }}>Lista de Produtos</h2>
        {produtos.length === 0 ? (
          <p style={{ padding: '40px', textAlign: 'center', color: '#666', margin: 0 }}>Nenhum produto cadastrado</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nome</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Preço</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Quantidade</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Total</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{produto.nome}</td>
                    <td style={{ padding: '15px' }}>R$ {produto.preco.toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>{produto.quantidade}</td>
                    <td style={{ padding: '15px', fontWeight: '600' }}>
                      R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => iniciarEdicao(produto)}
                          style={{ 
                            background: '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            padding: '6px 12px', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => confirmarRemocao(produto.id)}
                          style={{ 
                            background: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            padding: '6px 12px', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                        >
                          🗑️ Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {produtoParaEditar && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>✏️ Editar Produto</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontWeight: '500' }}>Nome do Produto:</label>
              <input
                type="text"
                value={produtoEditando.nome}
                onChange={(e) => setProdutoEditando({...produtoEditando, nome: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontWeight: '500' }}>Preço (R$):</label>
              <input
                type="number"
                step="0.01"
                value={produtoEditando.preco}
                onChange={(e) => setProdutoEditando({...produtoEditando, preco: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontWeight: '500' }}>Quantidade:</label>
              <input
                type="number"
                value={produtoEditando.quantidade}
                onChange={(e) => setProdutoEditando({...produtoEditando, quantidade: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={cancelarEdicao}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                💾 Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Remoção */}
      {produtoParaRemover && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>⚠️ Confirmar Remoção</h3>
            <p style={{ marginBottom: '25px', color: '#666', lineHeight: '1.5' }}>
              Tem certeza que deseja remover o produto <strong>"{produtos.find(p => p.id === produtoParaRemover)?.nome}"</strong>?
              <br /><br />
              Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={cancelarRemocao}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={removerProduto}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                🗑️ Confirmar Remoção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}