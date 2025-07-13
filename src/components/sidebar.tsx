'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ArrowUpDown,
  Settings,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Itens',
    href: '/itens',
    icon: Package
  },
  {
    name: 'Movimentações',
    href: '/movimentacoes',
    icon: ArrowUpDown
  },
  {
    name: 'Configurações',
    href: '/configuracoes',
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          Sistema Estoque
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}}
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}