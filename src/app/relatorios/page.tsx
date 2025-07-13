'use client'

import { useProjetos } from '../../contexts/ProjetosContext'
import Link from 'next/link'
import { useState, useMemo } from 'react'

export default function RelatoriosPage() {
  const { projetos, produtos } = useProjetos()
  const [filtroTempo, setFiltroTempo] = useState('todos')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [mostrarDetalhes, setMostrarDetalhes] = useState<{[key: string]: boolean}>({})

  // Cálculos e estatísticas
  const estatisticas = useMemo(() => {
    const totalProjetos = projetos.length
    const projetosRascunho = projetos.filter(p => p.status === 'rascunho').length
    const projetosPendentes = projetos.filter(p => p.status === 'pendente').length
    const projetosAprovados = projetos.filter(p => p.status === 'aprovado').length
    const projetosRejeitados = projetos.filter(p => p.status === 'rejeitado').length

    // Produtos mais solicitados
    const produtosSolicitados: {[key: string]: {nome: string, quantidade: number, projetos: number}} = {}
    projetos.forEach(projeto => {
      projeto.itens.forEach(item => {
        if (!produtosSolicitados[item.produtoNome]) {
          produtosSolicitados[item.produtoNome] = {
            nome: item.produtoNome,
            quantidade: 0,
            projetos: 0
          }
        }
        produtosSolicitados[item.produtoNome].quantidade += item.quantidadeSolicitada
        produtosSolicitados[item.produtoNome].projetos += 1
      })
    })

    const topProdutos = Object.values(produtosSolicitados)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5)

    // Valor total estimado
    const valorTotal = projetos.reduce((total, projeto) => {
      return total + projeto.itens.reduce((subtotal, item) => {
        const produto = produtos.find(p => p.nome === item.produtoNome)
        return subtotal + (item.quantidadeSolicitada * (produto?.preco || 2.5))
      }, 0)
    }, 0)

    // Produtos com estoque baixo
    const estoqueBaixo = produtos.filter(p => p.quantidade < 20)

    // NOVA SEÇÃO: Análise de Estoque e Alocação
    const analiseEstoque = {
      // Estoque total disponível
      volumeEstoqueTotal: produtos.reduce((total, produto) => total + produto.quantidade, 0),
      valorEstoqueTotal: produtos.reduce((total, produto) => total + (produto.quantidade * produto.preco), 0),
      
      // Itens alocados em projetos (aprovados e pendentes)
      itensAlocados: projetos
        .filter(p => p.status === 'aprovado' || p.status === 'pendente')
        .reduce((total, projeto) => {
          return total + projeto.itens.reduce((subtotal, item) => subtotal + item.quantidadeSolicitada, 0)
        }, 0),
      
      valorItensAlocados: projetos
        .filter(p => p.status === 'aprovado' || p.status === 'pendente')
        .reduce((total, projeto) => {
          return total + projeto.itens.reduce((subtotal, item) => {
            const produto = produtos.find(p => p.nome === item.produtoNome)
            return subtotal + (item.quantidadeSolicitada * (produto?.preco || 2.5))
          }, 0)
        }, 0),
      
      // Análise por produto
      produtosDetalhados: produtos.map(produto => {
        const alocadoEmProjetos = projetos
          .filter(p => p.status === 'aprovado' || p.status === 'pendente')
          .reduce((total, projeto) => {
            return total + projeto.itens
              .filter(item => item.produtoNome === produto.nome)
              .reduce((subtotal, item) => subtotal + item.quantidadeSolicitada, 0)
          }, 0)
        
        const disponivel = produto.quantidade - alocadoEmProjetos
        const percentualAlocado = produto.quantidade > 0 ? (alocadoEmProjetos / produto.quantidade) * 100 : 0
        
        return {
          ...produto,
          alocado: alocadoEmProjetos,
          disponivel: Math.max(0, disponivel),
          percentualAlocado,
          valorAlocado: alocadoEmProjetos * produto.preco,
          valorDisponivel: Math.max(0, disponivel) * produto.preco
        }
      })
    }

    return {
      totalProjetos,
      projetosRascunho,
      projetosPendentes,
      projetosAprovados,
      projetosRejeitados,
      topProdutos,
      valorTotal,
      estoqueBaixo,
      analiseEstoque
    }
  }, [projetos, produtos])

  const toggleDetalhes = (secao: string) => {
    setMostrarDetalhes(prev => ({
      ...prev,
      [secao]: !prev[secao]
    }))
  }

  const getCorStatus = (status: string) => {
    switch(status) {
      case 'rascunho': return '#ffc107'
      case 'pendente': return '#17a2b8'
      case 'aprovado': return '#28a745'
      case 'rejeitado': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const calcularPorcentagem = (valor: number, total: number) => {
    return total > 0 ? ((valor / total) * 100).toFixed(1) : '0'
  }

  const getCorAlocacao = (percentual: number) => {
    if (percentual >= 80) return '#dc3545' // Vermelho - crítico
    if (percentual >= 60) return '#ffc107' // Amarelo - atenção
    if (percentual >= 40) return '#fd7e14' // Laranja - moderado
    return '#28a745' // Verde - ok
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          ← Voltar ao Dashboard
        </Link>
      </div>

      <h1 style={{ color: '#333', marginBottom: '30px', fontSize: '28px' }}>📊 Relatórios e Analytics</h1>

      {/* Cards de Estatísticas Principais */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff', marginBottom: '8px' }}>
            {estatisticas.totalProjetos}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Total de Projetos</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745', marginBottom: '8px' }}>
            {estatisticas.projetosAprovados}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Projetos Aprovados</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#17a2b8', marginBottom: '8px' }}>
            {estatisticas.projetosPendentes}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Aguardando Aprovação</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6f42c1', marginBottom: '8px' }}>
            R$ {estatisticas.valorTotal.toFixed(2)}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Valor Total Estimado</div>
        </div>
      </div>

      {/* NOVA SEÇÃO: Análise de Volume e Valor de Estoque */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        border: '2px solid #007bff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ margin: 0, color: '#333', fontSize: '20px' }}>📦 Análise de Estoque e Alocação</h3>
          <button
            onClick={() => toggleDetalhes('estoque')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {mostrarDetalhes.estoque ? 'Ocultar Detalhes' : 'Ver Detalhes'}
          </button>
        </div>

        {/* Cards de Resumo de Estoque */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          marginBottom: '25px' 
        }}>
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #28a745',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', marginBottom: '8px' }}>
              {estatisticas.analiseEstoque.volumeEstoqueTotal}
            </div>
            <div style={{ color: '#155724', fontSize: '14px', fontWeight: 'bold' }}>Total de Itens em Estoque</div>
            <div style={{ color: '#155724', fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>
              R$ {estatisticas.analiseEstoque.valorEstoqueTotal.toFixed(2)}
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff3cd',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #ffc107',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404', marginBottom: '8px' }}>
              {estatisticas.analiseEstoque.itensAlocados}
            </div>
            <div style={{ color: '#856404', fontSize: '14px', fontWeight: 'bold' }}>Itens Alocados em Projetos</div>
            <div style={{ color: '#856404', fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>
              R$ {estatisticas.analiseEstoque.valorItensAlocados.toFixed(2)}
            </div>
          </div>

          <div style={{
            backgroundColor: '#d1ecf1',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #17a2b8',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0c5460', marginBottom: '8px' }}>
              {estatisticas.analiseEstoque.volumeEstoqueTotal - estatisticas.analiseEstoque.itensAlocados}
            </div>
            <div style={{ color: '#0c5460', fontSize: '14px', fontWeight: 'bold' }}>Itens Disponíveis</div>
            <div style={{ color: '#0c5460', fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>
              R$ {(estatisticas.analiseEstoque.valorEstoqueTotal - estatisticas.analiseEstoque.valorItensAlocados).toFixed(2)}
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8d7da',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #dc3545',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#721c24', marginBottom: '8px' }}>
              {calcularPorcentagem(estatisticas.analiseEstoque.itensAlocados, estatisticas.analiseEstoque.volumeEstoqueTotal)}%
            </div>
            <div style={{ color: '#721c24', fontSize: '14px', fontWeight: 'bold' }}>Taxa de Alocação</div>
            <div style={{ color: '#721c24', fontSize: '12px', marginTop: '5px' }}>
              do estoque total
            </div>
          </div>
        </div>

        {/* Gráfico Visual de Alocação */}
        <div style={{ marginBottom: '25px' }}>
          <h5 style={{ marginBottom: '15px', color: '#333' }}>📊 Distribuição Visual do Estoque:</h5>
          <div style={{
            display: 'flex',
            height: '40px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #dee2e6'
          }}>
            <div style={{
              backgroundColor: '#17a2b8',
              width: `${calcularPorcentagem(estatisticas.analiseEstoque.volumeEstoqueTotal - estatisticas.analiseEstoque.itensAlocados, estatisticas.analiseEstoque.volumeEstoqueTotal)}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Disponível
            </div>
            <div style={{
              backgroundColor: '#ffc107',
              width: `${calcularPorcentagem(estatisticas.analiseEstoque.itensAlocados, estatisticas.analiseEstoque.volumeEstoqueTotal)}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Alocado
            </div>
          </div>
        </div>

        {/* Detalhes por Produto */}
        {mostrarDetalhes.estoque && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h5 style={{ marginBottom: '15px', color: '#333' }}>📋 Detalhamento por Produto:</h5>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e9ecef' }}>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Produto</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Estoque Total</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Alocado</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Disponível</th>
                    <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>% Alocação</th>
                    <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>Valor Alocado</th>
                    <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>Valor Disponível</th>
                  </tr>
                </thead>
                <tbody>
                  {estatisticas.analiseEstoque.produtosDetalhados
                    .sort((a, b) => b.percentualAlocado - a.percentualAlocado)
                    .map(produto => (
                    <tr key={produto.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>{produto.nome}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{produto.categoria}</div>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                        {produto.quantidade}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: produto.alocado > 0 ? '#ffc107' : '#e9ecef',
                          color: produto.alocado > 0 ? 'white' : '#666',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {produto.alocado}
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: produto.disponivel > 0 ? '#28a745' : '#dc3545',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {produto.disponivel}
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}>
                          <div style={{
                            width: '30px',
                            height: '8px',
                            backgroundColor: '#e9ecef',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${produto.percentualAlocado}%`,
                              height: '100%',
                              backgroundColor: getCorAlocacao(produto.percentualAlocado)
                            }}></div>
                          </div>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: getCorAlocacao(produto.percentualAlocado)
                          }}>
                            {produto.percentualAlocado.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#856404' }}>
                        R$ {produto.valorAlocado.toFixed(2)}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#0c5460' }}>
                        R$ {produto.valorDisponivel.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '6px', border: '1px solid #c3e6cb' }}>
              <h6 style={{ margin: '0 0 10px 0', color: '#155724' }}>💡 Insights de Alocação:</h6>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#155724' }}>
                <li>Produtos com alocação acima de 80% precisam de atenção especial</li>
                <li>Valor total em estoque: <strong>R$ {estatisticas.analiseEstoque.valorEstoqueTotal.toFixed(2)}</strong></li>
                <li>Valor comprometido em projetos: <strong>R$ {estatisticas.analiseEstoque.valorItensAlocados.toFixed(2)}</strong></li>
                <li>Liquidez disponível: <strong>R$ {(estatisticas.analiseEstoque.valorEstoqueTotal - estatisticas.analiseEstoque.valorItensAlocados).toFixed(2)}</strong></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Gráfico de Status dos Projetos */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#333' }}>📈 Distribuição de Status dos Projetos</h3>
          <button
            onClick={() => toggleDetalhes('status')}
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
            {mostrarDetalhes.status ? 'Ocultar' : 'Detalhes'}
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Rascunho', valor: estatisticas.projetosRascunho, cor: '#ffc107' },
            { label: 'Pendente', valor: estatisticas.projetosPendentes, cor: '#17a2b8' },
            { label: 'Aprovado', valor: estatisticas.projetosAprovados, cor: '#28a745' },
            { label: 'Rejeitado', valor: estatisticas.projetosRejeitados, cor: '#dc3545' }
          ].map(item => {
            const porcentagem = calcularPorcentagem(item.valor, estatisticas.totalProjetos)
            return (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: item.cor,
                  borderRadius: '4px'
                }}></div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.valor}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{item.label} ({porcentagem}%)</div>
                </div>
              </div>
            )
          })}
        </div>

        {mostrarDetalhes.status && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <h5 style={{ marginBottom: '10px' }}>Análise Detalhada:</h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
              <li>Taxa de aprovação: {calcularPorcentagem(estatisticas.projetosAprovados, estatisticas.totalProjetos)}%</li>
              <li>Taxa de rejeição: {calcularPorcentagem(estatisticas.projetosRejeitados, estatisticas.totalProjetos)}%</li>
              <li>Projetos em andamento: {estatisticas.projetosPendentes + estatisticas.projetosRascunho}</li>
              <li>Eficiência do processo: {calcularPorcentagem(estatisticas.projetosAprovados + estatisticas.projetosRejeitados, estatisticas.totalProjetos)}%</li>
            </ul>
          </div>
        )}
      </div>

      {/* Top Produtos Mais Solicitados */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#333' }}>🏆 Top 5 Produtos Mais Solicitados</h3>
          <button
            onClick={() => toggleDetalhes('produtos')}
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
            {mostrarDetalhes.produtos ? 'Ocultar' : 'Detalhes'}
          </button>
        </div>

        {estatisticas.topProdutos.length > 0 ? (
          <div>
            {estatisticas.topProdutos.map((produto, index) => {
              const maxQuantidade = estatisticas.topProdutos[0]?.quantidade || 1
              const larguraBarra = (produto.quantidade / maxQuantidade) * 100
              
              return (
                <div key={produto.nome} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: index === 0 ? '#fff3cd' : '#f8f9fa',
                  borderRadius: '6px',
                  border: index === 0 ? '2px solid #ffc107' : '1px solid #dee2e6'
                }}>
                  <div style={{ 
                    minWidth: '30px', 
                    textAlign: 'center', 
                    fontWeight: 'bold',
                    color: index === 0 ? '#856404' : '#666'
                  }}>
                    #{index + 1}
                  </div>
                  <div style={{ flex: 1, marginLeft: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{produto.nome}</div>
                    <div style={{ 
                      backgroundColor: '#e9ecef', 
                      height: '8px', 
                      borderRadius: '4px', 
                      overflow: 'hidden',
                      marginBottom: '5px'
                    }}>
                      <div style={{
                        backgroundColor: index === 0 ? '#ffc107' : '#007bff',
                        height: '100%',
                        width: `${larguraBarra}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {produto.quantidade} unidades solicitadas em {produto.projetos} projeto(s)
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhum produto foi solicitado ainda.</p>
        )}

        {mostrarDetalhes.produtos && estatisticas.topProdutos.length > 0 && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <h5 style={{ marginBottom: '10px' }}>Insights dos Produtos:</h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
              <li>Produto mais popular: <strong>{estatisticas.topProdutos[0]?.nome}</strong></li>
              <li>Total de itens únicos solicitados: <strong>{estatisticas.topProdutos.length}</strong></li>
              <li>Média de solicitações por produto: <strong>{(estatisticas.topProdutos.reduce((acc, p) => acc + p.quantidade, 0) / estatisticas.topProdutos.length).toFixed(1)}</strong></li>
            </ul>
          </div>
        )}
      </div>

      {/* Alerta de Estoque Baixo */}
      {estatisticas.estoqueBaixo.length > 0 && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#856404' }}>⚠️ Alerta: Produtos com Estoque Baixo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {estatisticas.estoqueBaixo.map(produto => (
              <div key={produto.id} style={{
                backgroundColor: 'white',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ffc107'
              }}>
                <div style={{ fontWeight: 'bold', color: '#856404' }}>{produto.nome}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Estoque: <strong style={{ color: '#dc3545' }}>{produto.quantidade}</strong> | 
                  Categoria: {produto.categoria}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumo Financeiro */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>💰 Resumo Financeiro</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
              R$ {(estatisticas.valorTotal * 0.7).toFixed(2)}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Projetos Aprovados</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#17a2b8' }}>
              R$ {(estatisticas.valorTotal * 0.2).toFixed(2)}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Aguardando Aprovação</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
              R$ {(estatisticas.valorTotal * 0.1).toFixed(2)}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Em Rascunho</div>
          </div>
        </div>
      </div>

      {/* Lista Detalhada de Projetos */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📋 Histórico Completo de Projetos</h3>
        
        {projetos.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Projeto</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Itens</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Data Criação</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>Valor Est.</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map(projeto => {
                  const valorProjeto = projeto.itens.reduce((total, item) => {
                    const produto = produtos.find(p => p.nome === item.produtoNome)
                    return total + (item.quantidadeSolicitada * (produto?.preco || 2.5))
                  }, 0)
                  
                  return (
                    <tr key={projeto.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 'bold' }}>{projeto.nome}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{projeto.descricao}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          backgroundColor: getCorStatus(projeto.status),
                          color: 'white'
                        }}>
                          {projeto.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {projeto.itens.length}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {projeto.dataCriacao}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                        R$ {valorProjeto.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '40px' }}>
            Nenhum projeto encontrado. Crie seu primeiro projeto para ver os relatórios.
          </p>
        )}
      </div>
    </div>
  )
}