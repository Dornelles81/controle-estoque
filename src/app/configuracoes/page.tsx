'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ConfigItem {
  id: string
  titulo: string
  descricao: string
  valor: string | boolean | number
  tipo: 'text' | 'boolean' | 'number' | 'select'
  opcoes?: string[]
}

export default function Configuracoes() {
  const [configs, setConfigs] = useState<ConfigItem[]>([
    {
      id: 'nomeEmpresa',
      titulo: 'Nome da Empresa',
      descricao: 'Nome que aparecerá nos relatórios e documentos',
      valor: 'Minha Empresa LTDA',
      tipo: 'text'
    },
    {
      id: 'moeda',
      titulo: 'Moeda Padrão',
      descricao: 'Moeda utilizada para cálculos e exibição',
      valor: 'BRL',
      tipo: 'select',
      opcoes: ['BRL', 'USD', 'EUR']
    },
    {
      id: 'alertaEstoqueBaixo',
      titulo: 'Alerta de Estoque Baixo',
      descricao: 'Receber notificações quando estoque estiver baixo',
      valor: true,
      tipo: 'boolean'
    },
    {
      id: 'limiteEstoqueBaixo',
      titulo: 'Limite para Estoque Baixo',
      descricao: 'Quantidade mínima para disparar alerta',
      valor: 5,
      tipo: 'number'
    },
    {
      id: 'backupAutomatico',
      titulo: 'Backup Automático',
      descricao: 'Realizar backup automático dos dados',
      valor: true,
      tipo: 'boolean'
    },
    {
      id: 'tema',
      titulo: 'Tema da Interface',
      descricao: 'Aparência visual do sistema',
      valor: 'Claro',
      tipo: 'select',
      opcoes: ['Claro', 'Escuro', 'Automático']
    }
  ])

  const [alteracoesSalvas, setAlteracoesSalvas] = useState(false)
  const [salvando, setSalvando] = useState(false)

  const atualizarConfig = (id: string, novoValor: string | boolean | number) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, valor: novoValor } : config
    ))
    setAlteracoesSalvas(false)
  }

  const salvarConfiguracoes = async () => {
    setSalvando(true)
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSalvando(false)
    setAlteracoesSalvas(true)
    setTimeout(() => setAlteracoesSalvas(false), 3000)
  }

  const resetarConfiguracoes = () => {
    if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?')) {
      // Resetar para valores padrão
      setConfigs([
        { id: 'nomeEmpresa', titulo: 'Nome da Empresa', descricao: 'Nome que aparecerá nos relatórios e documentos', valor: 'Minha Empresa LTDA', tipo: 'text' },
        { id: 'moeda', titulo: 'Moeda Padrão', descricao: 'Moeda utilizada para cálculos e exibição', valor: 'BRL', tipo: 'select', opcoes: ['BRL', 'USD', 'EUR'] },
        { id: 'alertaEstoqueBaixo', titulo: 'Alerta de Estoque Baixo', descricao: 'Receber notificações quando estoque estiver baixo', valor: true, tipo: 'boolean' },
        { id: 'limiteEstoqueBaixo', titulo: 'Limite para Estoque Baixo', descricao: 'Quantidade mínima para disparar alerta', valor: 5, tipo: 'number' },
        { id: 'backupAutomatico', titulo: 'Backup Automático', descricao: 'Realizar backup automático dos dados', valor: true, tipo: 'boolean' },
        { id: 'tema', titulo: 'Tema da Interface', descricao: 'Aparência visual do sistema', valor: 'Claro', tipo: 'select', opcoes: ['Claro', 'Escuro', 'Automático'] }
      ])
      setAlteracoesSalvas(false)
    }
  }

  const renderInput = (config: ConfigItem) => {
    const baseStyle = {
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s',
      width: '100%'
    }

    switch (config.tipo) {
      case 'text':
        return (
          <input
            type="text"
            value={config.valor as string}
            onChange={(e) => atualizarConfig(config.id, e.target.value)}
            style={baseStyle}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={config.valor as number}
            onChange={(e) => atualizarConfig(config.id, parseInt(e.target.value) || 0)}
            style={baseStyle}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        )
      
      case 'select':
        return (
          <select
            value={config.valor as string}
            onChange={(e) => atualizarConfig(config.id, e.target.value)}
            style={baseStyle}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          >
            {config.opcoes?.map(opcao => (
              <option key={opcao} value={opcao}>{opcao}</option>
            ))}
          </select>
        )
      
      case 'boolean':
        return (
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={config.valor as boolean}
              onChange={(e) => atualizarConfig(config.id, e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span style={{ color: config.valor ? '#28a745' : '#6c757d', fontWeight: '500' }}>
              {config.valor ? '✅ Ativado' : '❌ Desativado'}
            </span>
          </label>
        )
      
      default:
        return null
    }
  }

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

      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        marginBottom: '32px', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '8px', fontSize: '2.5rem' }}>⚙️ Configurações do Sistema</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Personalize o comportamento e aparência do sistema</p>
      </div>

      {/* Status de Salvamento */}
      {alteracoesSalvas && (
        <div style={{
          background: '#d4edda',
          color: '#155724',
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✅ <strong>Configurações salvas com sucesso!</strong>
        </div>
      )}

      {/* Configurações */}
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <h2 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #eee', color: '#333' }}>🔧 Configurações Gerais</h2>
        
        <div style={{ padding: '20px' }}>
          {configs.map((config, index) => (
            <div key={config.id} style={{ 
              marginBottom: index < configs.length - 1 ? '30px' : '0',
              paddingBottom: index < configs.length - 1 ? '30px' : '0',
              borderBottom: index < configs.length - 1 ? '1px solid #eee' : 'none'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1rem' }}>{config.titulo}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{config.descricao}</p>
              </div>
              <div style={{ maxWidth: '400px' }}>
                {renderInput(config)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={salvarConfiguracoes}
          disabled={salvando}
          style={{
            background: salvando ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: salvando ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {salvando ? '⏳ Salvando...' : '💾 Salvar Configurações'}
        </button>
        
        <button
          onClick={resetarConfiguracoes}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          🔄 Resetar Padrões
        </button>
      </div>

      {/* Informações do Sistema */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>ℹ️ Informações do Sistema</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <strong style={{ color: '#666' }}>Versão:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#333' }}>1.0.0</p>
          </div>
          <div>
            <strong style={{ color: '#666' }}>Última Atualização:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#333' }}>Janeiro 2024</p>
          </div>
          <div>
            <strong style={{ color: '#666' }}>Banco de Dados:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#333' }}>PostgreSQL</p>
          </div>
          <div>
            <strong style={{ color: '#666' }}>Status:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#28a745', fontWeight: '600' }}>✅ Online</p>
          </div>
        </div>
      </div>
    </div>
  )
}