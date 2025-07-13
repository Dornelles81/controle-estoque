import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj)
}

export function getStockStatus(quantity: number, minStock: number): 'normal' | 'low' | 'out' {
  if (quantity === 0) return 'out'
  if (quantity <= minStock) return 'low'
  return 'normal'
}

export function getStockStatusColor(status: string): string {
  switch (status) {
    case 'normal': return 'text-green-600'
    case 'low': return 'text-yellow-600'
    case 'out': return 'text-red-600'
    default: return 'text-gray-600'
  }
}