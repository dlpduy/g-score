import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartOne(props: any) {
  const { handleNameSubject, subjects, chartData } = props;

  const categories = subjects
    .filter((subject: any) => subject.name !== "ma_ngoai_ngu")
    .map((subject: any) => handleNameSubject(subject.name));

  const options: ApexOptions = {
    colors: ["#28a745", "#007bff", "#ffc107", "#dc3545"],
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: { columnWidth: "50%" },
          },
          xaxis: {
            labels: { style: { fontSize: "12px" } },
          },
          yaxis: {
            labels: { style: { fontSize: "12px" } },
          },
          legend: {
            fontSize: "12px",
          },
        },
      },
    ],
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: "#374151",
        },
      },
    },
    yaxis: {
      title: {
        text: "Số lượng thí sinh",
        style: { fontSize: "14px", fontWeight: 600 },
      },
      labels: { style: { fontSize: "13px" } },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      labels: { colors: "#333" },
    },
    fill: { opacity: 1 },
    tooltip: {
      style: { fontSize: "14px" },
      y: {
        formatter: (val: number) => `${formatNumber(val)} thí sinh`,
      },
    },
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const convertChartData = (data: any[]) => {
    const subjectOrder = subjects
      .filter((subject: any) => subject.name !== "ma_ngoai_ngu")
      .map((subject: any) => ({
        key: subject.name,
        label: handleNameSubject(subject.name),
      }));

    const series = [
      { name: "Xuất sắc (≥ 8)", data: [] as number[] },
      { name: "Giỏi (6 ≤ x < 8)", data: [] as number[] },
      { name: "Trung bình (4 ≤ x < 6)", data: [] as number[] },
      { name: "Yếu (< 4)", data: [] as number[] },
    ];

    subjectOrder.forEach((subject:any) => {
      const entry = data.find((d) => d.subject === subject.key);
      if (entry) {
        series[0].data.push(entry.excellent);
        series[1].data.push(entry.good);
        series[2].data.push(entry.average);
        series[3].data.push(entry.weak);
      } else {
        series.forEach((s) => s.data.push(0));
      }
    });

    return series;
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="w-full">
        <Chart
          options={options}
          series={convertChartData(chartData)}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
}
