import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Engineering",
    current: 65,
    openPositions: 8
  },
  {
    name: "Marketing",
    current: 22,
    openPositions: 3
  },
  {
    name: "Sales",
    current: 48,
    openPositions: 5
  },
  {
    name: "HR",
    current: 12,
    openPositions: 1
  }
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1 className="revenue-text">Department Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="current"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="openPositions"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;