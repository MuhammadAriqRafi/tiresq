'use client'

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const tireRepairShopColumns: ColumnDef<TireRepairShop>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <p className="text-nowrap">{row.original.id}</p>,
  },
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => <p className="text-nowrap">{row.original.name}</p>,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => {
      const rating = row.original.rating
      return (
        <p
          className={cn('font-semibold', rating < 1 && 'text-muted-foreground')}
        >
          {rating > 0 ? rating : 'N/A'}
        </p>
      )
    },
  },
  {
    accessorKey: 'isOpen',
    header: 'Status',
    cell: ({ row }) => {
      return row.original.isOpen ? (
        <Badge>Buka</Badge>
      ) : (
        <Badge variant="destructive">Tutup</Badge>
      )
    },
  },
]
