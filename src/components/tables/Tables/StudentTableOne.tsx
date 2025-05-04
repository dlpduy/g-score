import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
export default function StudentTableOne(props: any) {
  const { studentData } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tính toán dữ liệu hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = studentData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(studentData?.length / itemsPerPage);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-center text-base dark:text-white"
              >
                STT
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-center text-base dark:text-white"
              >
                Số báo danh
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-center text-base dark:text-white"
              >
                Tổng điểm theo khối
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          {currentData && (
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentData.map((order: any, index: number) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 text-center font-medium text-gray-800 dark:text-white/90">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center font-medium text-gray-800 dark:text-white/90">
                    {order.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center text-gray-700 dark:text-gray-400">
                    {order.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      )}
    </div>
  );
}
