'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Sistema de Estoque
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {session?.user && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {session.user.email}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}