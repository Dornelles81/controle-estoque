import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sistema.com' },
    update: {},
    create: {
      email: 'admin@sistema.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Criar itens de exemplo
  const items = [
    {
      name: 'Notebook Dell',
      description: 'Notebook Dell Inspiron 15 3000',
      price: 2500.00,
      quantity: 10,
      minQuantity: 2,
      category: 'Eletrônicos',
      sku: 'NB-DELL-001'
    },
    {
      name: 'Mouse Logitech',
      description: 'Mouse óptico sem fio',
      price: 89.90,
      quantity: 25,
      minQuantity: 5,
      category: 'Periféricos',
      sku: 'MS-LOG-001'
    },
    {
      name: 'Teclado Mecânico',
      description: 'Teclado mecânico RGB',
      price: 299.99,
      quantity: 8,
      minQuantity: 3,
      category: 'Periféricos',
      sku: 'KB-MEC-001'
    }
  ]

  for (const item of items) {
    await prisma.item.upsert({
      where: { sku: item.sku },
      update: {},
      create: item
    })
  }

  // Criar algumas movimentações
  const createdItems = await prisma.item.findMany()
  
  for (const item of createdItems) {
    await prisma.movement.create({
      data: {
        itemId: item.id,
        type: 'IN',
        quantity: item.quantity,
        description: `Estoque inicial - ${item.name}`,
        userId: admin.id
      }
    })
  }

  console.log('✅ Seed executado com sucesso!')
  console.log('👤 Usuário admin criado: admin@sistema.com / admin123')
  console.log(`📦 ${items.length} itens criados`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })