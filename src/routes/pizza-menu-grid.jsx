import { createFileRoute } from '@tanstack/react-router'
import PizzaGridMenu from '../PizzaGridMenu'

export const Route = createFileRoute('/pizza-menu-grid')({
  component: PizzaGridMenu,
})
