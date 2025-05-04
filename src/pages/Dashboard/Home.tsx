import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import StudentPersent from "../../components/ecommerce/MonthlyTarget";
import { getNumerStudent } from "../../service/api.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";

export default function Home() {
  const [studentCount, setStudentCount] = useState<any>([0,0]);
  const getTotalStudent = async () => {
    try {
      const response = await getNumerStudent();
      if (response.status === 200) {
        setStudentCount(response.data[0]);
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
  const navigator = useNavigate();

  return (
    <>
      <PageMeta
        title="Kì thi THPT Quốc Gia 2024"
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
