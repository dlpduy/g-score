import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import PageMeta from "../../components/common/PageMeta";
import { getAllSubjects, getChartData } from "../../service/api.service";
import { useEffect, useState } from "react";

export default function BarChart(props: any) {
  const { handleNameSubject } = props;
  const [chartData, setChartData] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const getData = async () => {
    try {
      const response = await getChartData();
      setChartData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const getSubjects = async () => {
    try {
      const response = await getAllSubjects();
      console.log(response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching all subjects:", error);
    }
  }

  useEffect(() => {
    getSubjects();
    getData();
  }, []);

  return (
    <div>
      <PageMeta
        title="Chart Dashboard"
        description="Biểu đồ thống kê điểm thi"
      />
      <PageBreadcrumb pageTitle="Biểu đồ " />
      <div className="space-y-6">
        <ComponentCard title="Biểu đồ thống kê điểm thi">
          <BarChartOne
            handleNameSubject={handleNameSubject}
            subjects={subjects}
            chartData={chartData}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
