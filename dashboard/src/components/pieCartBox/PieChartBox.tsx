import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";

const data = [
  { 
    name: "Technical Roles", 
    value: 45, // Percentage of total interviews
    color: "#0088FE"  // Blue
  },
  { 
    name: "Behavioral Rounds", 
    value: 30, 
    color: "#00C49F"  // Teal
  },
  { 
    name: "Final HR Rounds", 
    value: 15, 
    color: "#FFBB28"  // Yellow
  },
  { 
    name: "Rejected Early", 
    value: 10, 
    color: "#FF8042"  // Orange
  },
];

const PieChartBox = () => {
  return (
    <div className="pieChartBox">
      <h1 className="pie-text">Leads by Source</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
