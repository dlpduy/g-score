import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ScoreTableOne from "../../components/tables/Tables/ScoreTableOne";
import SearchInput from "../../components/common/SearchInput";
import { getStudentById } from "../../service/api.service";

export default function ScoreTables(props: any) { 
  const { handleNameSubject } = props;
  const [searchKeyword, setSearchKeyword] = useState("");
  const sbd = `Số báo danh: ${searchKeyword}`;
  const [studentData, setStudentData] = useState<any>();
  const [error, setError] = useState(false);
  const getStudentData = async () => {
    try {
      const response = await getStudentById(searchKeyword);
      if (response.status == 200){
        setStudentData(response.data);
        setError(false);
      }
      else {
        setError(true);
        setStudentData(null);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  useEffect(() => {
    if (searchKeyword) {
      getStudentData();
    }
  }, [searchKeyword]);


  return (
    <>
      <PageMeta
        title="Search Score"
        description="This is Score Table for each student"
      />
      <PageBreadcrumb pageTitle="Kết quả điểm thi THPT Quốc Gia 2024" />
      <div className="space-y-6">
        <div className="mb-4">
          <SearchInput
            placeholder="Tìm theo số báo danh..."
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        </div>
        <ComponentCard title={sbd}>
          {studentData ? (
            <ScoreTableOne
          handleNameSubject={handleNameSubject}
          studentData={studentData}
          />)
          : (
            <div className="w-full py-20 flex justify-center items-center">
              <p className="text-center text-gray-600 text-xl font-medium dark:text-gray-400 italic">
                {error ? "Không tìm thấy thí sinh với số báo danh này." : "Nhập số báo danh để tra cứu điểm thi."}
              </p>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
