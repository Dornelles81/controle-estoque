import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function LowStockAlert() {
  // Aqui você fará a busca dos dados reais do banco
  const lowStockItems = [
    {
      id: 1,
      name: 'Papel A4',
      currentStock: 2,
      minStock: 10,
      category: 'Escritório'
    },
    {
      id: 2,
      name: 'Tinta Impressora',
      currentStock: 1,
      minStock: 5,
      category: 'Suprimentos'
    },
    {
      id: 3,
      name: 'Cabo HDMI',
      currentStock: 0,
      minStock: 3,
      category: 'Eletrônicos'
    }
  ]

  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
          <div>
            <p className="font-medium">{item.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{item.category}</Badge>
              <span className="text-sm text-muted-foreground">
                Estoque: {item.currentStock} / Mín: {item.minStock}
              </span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Repor
          </Button>
        </div>
      ))}
    </div>
  )
}