import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export function RecentMovements() {
  // Aqui você fará a busca dos dados reais do banco
  const movements = [
    {
      id: 1,
      type: 'entrada',
      item: 'Notebook Dell',
      quantity: 5,
      date: new Date(),
      user: 'João Silva'
    },
    {
      id: 2,
      type: 'saida',
      item: 'Mouse Logitech',
      quantity: 2,
      date: new Date(Date.now() - 86400000),
      user: 'Maria Santos'
    },
    {
      id: 3,
      type: 'entrada',
      item: 'Teclado Mecânico',
      quantity: 10,
      date: new Date(Date.now() - 172800000),
      user: 'Pedro Costa'
    }
  ]

  return (
    <div className="space-y-4">
      {movements.map((movement) => (
        <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Badge variant={movement.type === 'entrada' ? 'default' : 'destructive'}>
              {movement.type === 'entrada' ? 'Entrada' : 'Saída'}
            </Badge>
            <div>
              <p className="font-medium">{movement.item}</p>
              <p className="text-sm text-muted-foreground">
                Qtd: {movement.quantity} • {movement.user}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(movement.date)}
          </div>
        </div>
      ))}
    </div>
  )
}