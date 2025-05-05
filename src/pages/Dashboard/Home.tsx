import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import StudentPersent from "../../components/ecommerce/MonthlyTarget";
import { getNumerStudent } from "../../service/api.service";
import { useEffect, useState } from "react";

export default function Home() {
  const [studentCount, setStudentCount] = useState<any>([0,1]);
  const getTotalStudent = async () => {
    try {
      const response = await getNumerStudent();
      if (response.status === 200) {
        setStudentCount(response.data);
      } else {
        console.error("Error fetching student count:", response.status);
      }
    } catch (error) {
      console.error("Error fetching all students:", error);
    }
  }

  useEffect(() => {
    getTotalStudent();
  }, []);

  return (
    <>
      <PageMeta
        title="G-Score Tra cứu điểm thi THPT Quốc Gia 2024"
        description="Trang tổng quan về kết quả kì thi THPT Quốc Gia 2024"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-8">
          <EcommerceMetrics studentCount={studentCount} />
          <StudentPersent studentCount={studentCount} />
        </div>
      </div>

    </>
  );
}
