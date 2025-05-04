import { BrowserRouter as Router, Routes, Route } from "react-router";
import BarChart from "./pages/Charts/BarChart";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import StudentTables from "./pages/Tables/StudentTable";
import ScoreTables from "./pages/Tables/ScoreTable";

export default function App() {
  const handleNameSubject = (name: string) => {
    if (name === "toan") {
      return "Toán";
    }
    if (name === "ngu_van") {
      return "Ngữ Văn";
    }
    if (name === "ngoai_ngu") {
      return "Ngoại Ngữ";
    }
    if (name === "vat_li") {
      return "Vật Lí";
    }
    if (name === "hoa_hoc") {
      return "Hóa Học";
    }
    if (name === "sinh_hoc") {
      return "Sinh Học";
    }
    if (name === "dia_li") {
      return "Địa Lí";
    }
    if (name === "lich_su") {
      return "Lịch Sử";
    }
    if (name === "gdcd") {
      return "Giáo Dục Công Dân";
    }
    if (name === "ma_ngoai_ngu") {
      return "Mã Ngoại Ngữ";
    }
  }
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Tables */}
            <Route 
            path="/student-tables" 
            element={<StudentTables />} />

            <Route 
            path="/score-tables" 
            element={<ScoreTables handleNameSubject = {handleNameSubject}  />} />

            {/* Charts */}
            <Route path="/bar-chart" element={<BarChart handleNameSubject = {handleNameSubject}  />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
