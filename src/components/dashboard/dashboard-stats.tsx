import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function DashboardStats() {
  // Aqui você fará a busca dos dados reais do banco
  const stats = {
    totalItems: 150,
    lowStock: 12,
    totalValue: 45000,
    recentMovements: 8
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Itens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalItems}</div>
          <p className="text-xs text-muted-foreground">
            Itens cadastrados no sistema
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Estoque Baixo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.lowStock}</div>
          <p className="text-xs text-muted-foreground">
            Itens precisando reposição
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {stats.totalValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Valor total do estoque
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Movimentações Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentMovements}</div>
          <p className="text-xs text-muted-foreground">
            Entradas e saídas hoje
          </p>
        </CardContent>
      </Card>
    </div>
  )
}