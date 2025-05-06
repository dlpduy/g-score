import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import StudentTableOne from "../../components/tables/Tables/StudentTableOne";
import { getStudentByGroup } from "../../service/api.service";

export default function StudentTables() {
  const [studentCount, setStudentCount] = useState(10);
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [studentData, setStudentData] = useState([]);

  const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentCount(Number(event.target.value));
  };

  const handleBlockChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  const handleStudentData = async () => {
    try {
      const response = await getStudentByGroup(selectedGroup, studentCount);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    handleStudentData();
  }, [selectedGroup, studentCount]);

  return (
    <>
      <PageMeta title="Student Tables" description="This is group of students" />
      <PageBreadcrumb pageTitle="Thống kê thí sinh theo khối thi" />
      
      {/* Bộ lọc và nút in */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 print:hidden">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label htmlFor="studentCount" className="mr-2">Số lượng thí sinh:</label>
            <select
              id="studentCount"
              value={studentCount}
              onChange={handleCountChange}
              className="p-2 border rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="selectedBlock" className="mr-2">Chọn khối:</label>
            <select
              id="selectedBlock"
              value={selectedGroup}
              onChange={handleBlockChange}
              className="p-2 border rounded"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>

        {/* Nút in */}
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all text-sm font-medium"
        >
          🖨 In báo cáo
        </button>
      </div>

      {/* Khu vực in */}
      <div id="print-area" className="space-y-6">
        <ComponentCard title={`Danh sách ${studentCount} thí sinh khối ${selectedGroup} có điểm cao nhất kì thi THPT Quốc Gia 2024`}>
          <StudentTableOne studentData={studentData} />
        </ComponentCard>
      </div>
    </>
  );
}
