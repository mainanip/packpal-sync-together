
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { TaskProgress } from '@/types/auth';

interface TaskStatusChartProps {
  progressData: TaskProgress;
  userName: string;
  onDownload?: () => void;
  showDownload?: boolean;
  chartType?: 'bar' | 'pie';
}

const COLORS = ['#ef4444', '#10b981', '#f59e0b'];

export const TaskStatusChart = ({
  progressData,
  userName,
  onDownload,
  showDownload = true,
  chartType = 'bar'
}: TaskStatusChartProps) => {
  const barData = [
    {
      name: 'To Pack',
      value: progressData.toPack,
      fill: '#f59e0b'
    },
    {
      name: 'Packed',
      value: progressData.packed,
      fill: '#10b981'
    },
    {
      name: 'Delivered',
      value: progressData.delivered,
      fill: '#ef4444'
    }
  ];
  
  const pieData = [
    { name: 'To Pack', value: progressData.toPack },
    { name: 'Packed', value: progressData.packed },
    { name: 'Delivered', value: progressData.delivered },
  ].filter(item => item.value > 0);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{userName}'s Tasks Progress</CardTitle>
        {showDownload && (
          <Button size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        )}
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Tasks" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
