export default function Home() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '2.5rem',
          textAlign: 'center'
        }}>
          📦 Sistema de Controle de Estoque
        </h1>
        
        <p style={{ 
          color: '#666', 
          fontSize: '1.2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Bem-vindo ao sistema de gerenciamento de estoque!
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #4caf50'
          }}>
            <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🚀 Status do Sistema</h2>
            <ul style={{ color: '#2e7d32', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>✅ Sistema Online</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Deploy Realizado</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Pronto para Uso</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #2196f3'
          }}>
            <h2 style={{ color: '#1565c0', marginBottom: '1rem' }}>📊 Funcionalidades</h2>
            <ul style={{ color: '#1565c0', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>📦 Controle de Estoque</li>
              <li style={{ marginBottom: '0.5rem' }}>📋 Gestão de Projetos</li>
              <li style={{ marginBottom: '0.5rem' }}>📈 Relatórios Avançados</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ff9800'
        }}>
          <p style={{ color: '#e65100', margin: 0, fontSize: '1.1rem' }}>
            🎉 Sistema implantado com sucesso no Vercel!
          </p>
        </div>
      </div>
    </div>
  )
}