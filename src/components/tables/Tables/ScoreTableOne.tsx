import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default function ScoreTableOne(props: any) {
  const { handleNameSubject,studentData } = props;
  
  return (
    <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-4 py-4 font-bold text-gray-700 text-center text-lg dark:text-white"
              >
                Môn Học
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-4 font-bold text-gray-700 text-center text-lg dark:text-white"
              >
                Điểm
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {studentData.scores.map((order: any) => (
                <TableRow key={order.name}>
                  <TableCell className="px-4 py-4 text-center">
                    <span className="block text-gray-800 text-lg dark:text-white/90">
                      {handleNameSubject(order.name)}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-gray-700 text-lg dark:text-gray-300">
                    {order.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>
    </div>



  );
}
