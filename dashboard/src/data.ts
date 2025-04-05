export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "user.svg",
      },
    ],
  },
  
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup.svg",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log.svg",
      },
    ],
  },
];

export const topInterviewers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Ananya Sharma",
    email: "ananya.sharma@gmail.com",
    rating: 9.6,
    remarks: "Excellent technical evaluation",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/2404414/pexels-photo-2404414.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Rohan Mehta",
    email: "rohan.mehta@gmail.com",
    rating: 9.3,
    remarks: "Very good in behavioral round",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/2531551/pexels-photo-2531551.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Sneha Patil",
    email: "sneha.patil@gmail.com",
    rating: 8.9,
    remarks: "8.9 in mixed interview",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    rating: 8.7,
    remarks: "Consistent across all rounds",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1848358/pexels-photo-1848358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Ishita Nair",
    email: "ishita.nair@gmail.com",
    rating: 8.5,
    remarks: "Strong logical reasoning",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Aman Verma",
    email: "aman.verma@gmail.com",
    rating: 8.2,
    remarks: "Quick decision-making skills",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Meera Iyer",
    email: "meera.iyer@gmail.com",
    rating: 7.9,
    remarks: "Engaging and confident",
  },
];


export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Applicants",
  number: "4,238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Selected Applicants",
  number: "238",
  dataKey: "products",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "HR Activities",
  number: "128 ac",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Ratio of selection",
  number: "2.6",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 700 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 500 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartBoxRevenue = {
  title: "New Hires",
  color: "#8884d8",
  dataKey: "hires",
  chartData: [
    { name: "Sun", hires: 0 },
    { name: "Mon", hires: 2 },
    { name: "Tue", hires: 1 },
    { name: "Wed", hires: 3 },
    { name: "Thu", hires: 1 },
    { name: "Fri", hires: 4 },
    { name: "Sat", hires: 0 },
  ],
};


export const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    { name: "Sun", visit: 180 },
    { name: "Mon", visit: 420 },
    { name: "Tue", visit: 390 },
    { name: "Wed", visit: 520 },
    { name: "Thu", visit: 460 },
    { name: "Fri", visit: 610 },
    { name: "Sat", visit: 240 },
  ],
};

export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    firstName: "Anjali",
    lastName: "Verma",
    email: "anjali.verma@company.com",
    phone: "987 654 3210",
    department: "Human Resources",
    designation: "HR Manager",
    joinedAt: "12.01.2021",
    status: "Active",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600",
    firstName: "Rahul",
    lastName: "Mehra",
    email: "rahul.mehra@company.com",
    phone: "876 543 2109",
    department: "Recruitment",
    designation: "HR Executive",
    joinedAt: "10.06.2022",
    status: "On Leave",
  },
];



export const interviewees = [
  {
    id: 1,
    photo: "/candidates/alex.png",
    name: "Alex Johnson",
    techStack: "MERN Stack",
    skills: "React, Node.js, Express, MongoDB",
    experience: "2 years",
    availability: true,
    appliedAt: "2025-04-01",
  },
  {
    id: 2,
    photo: "/candidates/sara.png",
    name: "Sara Lee",
    techStack: "Java + Spring Boot",
    skills: "Java, Spring Boot, Hibernate, SQL",
    experience: "3 years",
    availability: false,
    appliedAt: "2025-03-25",
  },
  {
    id: 3,
    photo: "/candidates/jayesh.png",
    name: "Jayesh Jadhav",
    techStack: "Python + Django",
    skills: "Python, Django, PostgreSQL, REST APIs",
    experience: "1.5 years",
    availability: true,
    appliedAt: "2025-04-03",
  },
  {
    id: 4,
    photo: "/candidates/ananya.png",
    name: "Ananya Sharma",
    techStack: "Frontend (React)",
    skills: "React, Redux, Tailwind, Figma",
    experience: "2.5 years",
    availability: true,
    appliedAt: "2025-03-30",
  },
  {
    id: 5,
    photo: "/candidates/rohit.png",
    name: "Rohit Mehra",
    techStack: "DevOps",
    skills: "AWS, Docker, Jenkins, Kubernetes",
    experience: "4 years",
    availability: false,
    appliedAt: "2025-03-20",
  },
  {
    id: 6,
    photo: "/candidates/emily.png",
    name: "Emily Davis",
    techStack: "Full Stack (MEVN)",
    skills: "Vue, Node.js, MongoDB, REST APIs",
    experience: "3 years",
    availability: true,
    appliedAt: "2025-04-02",
  },
  {
    id: 7,
    photo: "/candidates/karan.png",
    name: "Karan Kapoor",
    techStack: "Backend (Go)",
    skills: "Go, MySQL, Redis, Microservices",
    experience: "2 years",
    availability: true,
    appliedAt: "2025-03-28",
  },
  {
    id: 8,
    photo: "/candidates/lisa.png",
    name: "Lisa Chen",
    techStack: "Data Science",
    skills: "Python, Pandas, Scikit-learn, Power BI",
    experience: "3.5 years",
    availability: true,
    appliedAt: "2025-04-04",
  },
  {
    id: 9,
    photo: "/candidates/naveen.png",
    name: "Naveen Reddy",
    techStack: "Android Development",
    skills: "Java, Kotlin, Firebase, Jetpack Compose",
    experience: "2.5 years",
    availability: false,
    appliedAt: "2025-03-27",
  },
  {
    id: 10,
    photo: "/candidates/sneha.png",
    name: "Sneha Patil",
    techStack: "Machine Learning",
    skills: "TensorFlow, Python, NLP, OpenCV",
    experience: "4 years",
    availability: true,
    appliedAt: "2025-04-01",
  },
];

export const singleUser = {
  id: 1,
  title: "Jayesh Jadhav",
  img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  info: {
    username: "jayeshj_hr",
    fullname: "Jayesh Jadhav",
    email: "jayesh.jadhav@company.com",
    phone: "987 654 3210",
    status: "active",
  },
  chart: {
    dataKeys: [
      { name: "meetings", color: "#82ca9d" },
      { name: "interviews", color: "#8884d8" },
    ],
    data: [
      { name: "Sun", meetings: 2, interviews: 1 },
      { name: "Mon", meetings: 4, interviews: 3 },
      { name: "Tue", meetings: 3, interviews: 4 },
      { name: "Wed", meetings: 5, interviews: 2 },
      { name: "Thu", meetings: 2, interviews: 5 },
      { name: "Fri", meetings: 4, interviews: 3 },
      { name: "Sat", meetings: 1, interviews: 0 },
    ],
  },
  activities: [
    {
      text: "Jayesh conducted an interview with candidate Rohan Sharma",
      time: "2 days ago",
    },
    {
      text: "Jayesh scheduled a department meeting",
      time: "4 days ago",
    },
    {
      text: "Jayesh onboarded new employee Priya Nair",
      time: "1 week ago",
    },
    {
      text: "Jayesh approved leave request for Amit Kumar",
      time: "2 weeks ago",
    },
    {
      text: "Jayesh updated the employee handbook",
      time: "3 weeks ago",
    },
    {
      text: "Jayesh conducted a feedback session with new hires",
      time: "1 month ago",
    },
  ],
};
