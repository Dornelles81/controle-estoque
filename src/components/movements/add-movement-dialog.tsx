'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AddMovementDialogProps {
  children: React.ReactNode
}

export function AddMovementDialog({ children }: AddMovementDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    itemId: '',
    quantity: '',
    reason: '',
    supplier: ''
  })

  // Lista mockada de itens - substituir por dados reais
  const items = [
    { id: '1', name: 'Notebook Dell Inspiron' },
    { id: '2', name: 'Mouse Logitech MX' },
    { id: '3', name: 'Papel A4 500 folhas' },
    { id: '4', name: 'Teclado Mecânico' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aqui você fará a chamada para a API
    console.log('Dados da movimentação:', formData)
    
    // Resetar formulário e fechar dialog
    setFormData({
      type: '',
      itemId: '',
      quantity: '',
      reason: '',
      supplier: ''
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Movimentação</DialogTitle>
          <DialogDescription>
            Registre uma entrada ou saída de item do estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item" className="text-right">
                Item
              </Label>
              <Select onValueChange={(value) => setFormData({...formData, itemId: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantidade
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Motivo
              </Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Compra, Venda, Distribuição..."
                required
              />
            </div>
            
            {formData.type === 'entrada' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">
                  Fornecedor
                </Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  className="col-span-3"
                  placeholder="Nome do fornecedor"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Registrar Movimentação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}