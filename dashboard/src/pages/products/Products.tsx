import { useState } from "react";
import "./products.scss"; 
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { interviewees } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "photo",
    headerName: "Photo",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.photo || "/noavatar.png"} alt="profile" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "techStack",
    type: "string",
    headerName: "Tech Stack",
    width: 250,
  },
  {
    field: "skills",
    type: "string",
    headerName: "Skills",
    width: 300,
  },
  {
    field: "experience",
    type: "string",
    headerName: "Experience",
    width: 150,
  },
  {
    field: "availability",
    headerName: "Available?",
    width: 150,
    type: "boolean",
  },
  {
    field: "appliedAt",
    headerName: "Applied At",
    width: 200,
    type: "string",
  },
];

const Interviewees = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="interviewees">
      <div className="info">
        <h1>Interview Candidates</h1>
        <button onClick={() => setOpen(true)}>Add New Candidate</button>
      </div>
      <DataTable slug="interviewees" columns={columns} rows={interviewees} />
      {open && <Add slug="interviewee" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Interviewees;
