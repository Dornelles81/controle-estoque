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
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDate } from '@/lib/utils'

export function MovementsTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  
  // Dados mockados - substituir por dados reais do banco
  const movements = [
    {
      id: 1,
      type: 'entrada',
      item: 'Notebook Dell Inspiron',
      quantity: 10,
      date: new Date('2024-01-15'),
      user: 'João Silva',
      reason: 'Compra de equipamentos',
      supplier: 'Dell Brasil'
    },
    {
      id: 2,
      type: 'saida',
      item: 'Mouse Logitech MX',
      quantity: 5,
      date: new Date('2024-01-14'),
      user: 'Maria Santos',
      reason: 'Distribuição para funcionários',
      supplier: null
    },
    {
      id: 3,
      type: 'entrada',
      item: 'Papel A4 500 folhas',
      quantity: 50,
      date: new Date('2024-01-13'),
      user: 'Pedro Costa',
      reason: 'Reposição de estoque',
      supplier: 'Chamex'
    },
    {
      id: 4,
      type: 'saida',
      item: 'Teclado Mecânico',
      quantity: 2,
      date: new Date('2024-01-12'),
      user: 'Ana Lima',
      reason: 'Setup home office',
      supplier: null
    }
  ]

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || movement.type === filterType
    return matchesSearch && matchesType
  })

  const getTypeBadge = (type: string) => {
    return type === 'entrada' 
      ? <Badge variant="default">Entrada</Badge>
      : <Badge variant="destructive">Saída</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar movimentações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="entrada">Entradas</SelectItem>
            <SelectItem value="saida">Saídas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Fornecedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>
                  {getTypeBadge(movement.type)}
                </TableCell>
                <TableCell className="font-medium">{movement.item}</TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>{formatDate(movement.date)}</TableCell>
                <TableCell>{movement.user}</TableCell>
                <TableCell>{movement.reason}</TableCell>
                <TableCell>{movement.supplier || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}