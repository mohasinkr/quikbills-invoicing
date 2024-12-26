import { InvoiceChart } from '@/features/dashboard/components/invoice-chart'
import { MetricCard } from '@/features/dashboard/components/metric-card'
import { RecentInvoices } from '@/features/dashboard/components/recent-invoices'
import { DollarSign, Users, FileText } from 'lucide-react'


// This would typically come from an API or database
const metrics = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Customers',
    value: '2,350',
    description: '+180.1% from last month',
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Pending Invoices',
    value: '12',
    description: '-19% from last month',
    icon: <FileText className="h-4 w-4 text-muted-foreground" />,
  },
]

const recentInvoices = [
  {
    id: 'INV001',
    customer: 'Acme Corp',
    amount: 1250.00,
    status: 'paid',
    date: '2023-01-13',
  },
  {
    id: 'INV002',
    customer: 'Globex Corporation',
    amount: 875.50,
    status: 'pending',
    date: '2023-01-14',
  },
  {
    id: 'INV003',
    customer: 'Soylent Corp',
    amount: 2340.00,
    status: 'overdue',
    date: '2023-01-15',
  },
]

const chartData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2700 },
  { name: 'Jun', total: 3000 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <h2 className="mb-4 text-xl font-semibold">Recent Invoices</h2>
          <RecentInvoices invoices={recentInvoices} />
        </div>
        <div className="col-span-3">
          <h2 className="mb-4 text-xl font-semibold">Revenue Overview</h2>
          <InvoiceChart data={chartData} />
        </div>
      </div>
    </div>
  )
}

