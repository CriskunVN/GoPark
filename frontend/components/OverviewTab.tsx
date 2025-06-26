import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { chartData, pieData, COLORS } from "@/app/fakedata";

interface OverviewTabProps {
  dataView: string;
  setDataView: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  formatCurrency: (value: number) => string;
}

export function OverviewTab({
  dataView,
  setDataView,
  chartType,
  setChartType,
  selectedDate,
  setSelectedDate,
  formatCurrency,
}: OverviewTabProps) {
  const filteredData = chartData.find((item) => item.date === selectedDate);

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey={dataView === "income" ? "income" : dataView}
                stroke="#10B981"
                fill="#D1FAE5"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Bar
                dataKey={dataView === "income" ? "income" : dataView}
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview Chart</CardTitle>
        <CardDescription>Select data view and date</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <Select value={dataView} onValueChange={setDataView}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Data View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Revenue</SelectItem>
              <SelectItem value="car">Car Count</SelectItem>
              <SelectItem value="motorbike">Motorbike Count</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              {chartData.map((item) => (
                <SelectItem key={item.date} value={item.date}>
                  {item.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredData ? (
          <div className="mt-4">
            <p className="text-muted-foreground">Data for {selectedDate}:</p>
            <p className="text-lg font-medium">
              {dataView === "income"
                ? formatCurrency(filteredData.income)
                : `${
                    dataView === "car"
                      ? filteredData.car
                      : dataView === "motorbike"
                      ? filteredData.motorbike
                      : ""
                  }${
                    dataView === "car" || dataView === "motorbike"
                      ? " vehicles"
                      : ""
                  }`}
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-muted-foreground">
              No data available for {selectedDate}
            </p>
          </div>
        )}

        {renderChart()}
      </CardContent>
    </Card>
  );
}