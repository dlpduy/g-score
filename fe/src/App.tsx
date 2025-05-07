import { BrowserRouter as Router, Routes, Route } from "react-router";
import BarChart from "./pages/Charts/BarChart";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import StudentTables from "./pages/Tables/StudentTable";
import ScoreTables from "./pages/Tables/ScoreTable";
import { getAllSubjects } from "./service/api.service";
import { useEffect, useState } from "react";

export default function App() {
  const handleNameSubject = (name: string) => {
    switch (name) {
      case "toan": return "Toán";
      case "ngu_van": return "Ngữ Văn";
      case "ngoai_ngu": return "Ngoại Ngữ";
      case "vat_li": return "Vật Lí";
      case "hoa_hoc": return "Hóa Học";
      case "sinh_hoc": return "Sinh Học";
      case "dia_li": return "Địa Lí";
      case "lich_su": return "Lịch Sử";
      case "gdcd": return "Giáo Dục Công Dân";
      case "ma_ngoai_ngu": return "Mã Ngoại Ngữ";
      default: return name;
    }
  };

  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSubjects = async () => {
    try {
      const response = await getAllSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching all subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-semibold">Vui lòng chờ trong giây lát...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />

          {/* Tables */}
          <Route 
            path="/student-tables" 
            element={<StudentTables />} 
          />

          <Route 
            path="/score-tables" 
            element={<ScoreTables handleNameSubject={handleNameSubject} />} 
          />

          {/* Charts */}
          <Route 
            path="/chart-dashboard" 
            element={
              <BarChart 
                handleNameSubject={handleNameSubject} 
                subjects={subjects} 
              />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}
