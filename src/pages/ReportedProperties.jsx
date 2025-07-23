import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ReportedProperties = () => {
  const queryClient = useQueryClient();

  const { data: reports = [] } = useQuery({
    queryKey: ["reportedProperties"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/admin/reports");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (propertyId) => {
      return await axios.delete(`http://localhost:5000/admin/reported-property/${propertyId}`);
    },
    onSuccess: () => {
      toast.success("Property removed");
      queryClient.invalidateQueries(["reportedProperties"]);
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reported Properties</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Agent</th>
              <th>Reporter</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.propertyTitle}</td>
                <td>{report.agentName}</td>
                <td>
                  <p>{report.reporterName}</p>
                  <p className="text-xs text-gray-500">{report.reporterEmail}</p>
                </td>
                <td>{report.reportDescription}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteMutation.mutate(report.propertyId)}
                  >
                    Remove Property
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProperties;