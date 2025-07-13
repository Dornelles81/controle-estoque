'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

export function ItemsTable() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Dados mockados - substituir por dados reais do banco
  const items = [
    {
      id: 1,
      name: 'Notebook Dell Inspiron',
      category: 'Eletrônicos',
      quantity: 15,
      minStock: 5,
      price: 2500.00,
      supplier: 'Dell Brasil',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Mouse Logitech MX',
      category: 'Periféricos',
      quantity: 3,
      minStock: 10,
      price: 150.00,
      supplier: 'Logitech',
      status: 'baixo_estoque'
    },
    {
      id: 3,
      name: 'Papel A4 500 folhas',
      category: 'Escritório',
      quantity: 0,
      minStock: 20,
      price: 25.00,
      supplier: 'Chamex',
      status: 'sem_estoque'
    }
  ]

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string, quantity: number, minStock: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Sem Estoque</Badge>
    } else if (quantity <= minStock) {
      return <Badge variant="secondary">Estoque Baixo</Badge>
    } else {
      return <Badge variant="default">Normal</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Buscar itens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>
                  {getStatusBadge(item.status, item.quantity, item.minStock)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}