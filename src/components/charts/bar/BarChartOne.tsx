import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartOne(props: any) {
  const { handleNameSubject,subjects,chartData } = props;


  const categories = Array<string>();
  subjects.forEach((subject: any) => {
    if (subject.name === "ma_ngoai_ngu") {
      return;
    }
    categories.push(handleNameSubject(subject.name));
  });

  const options: ApexOptions = {
    colors: ["#28a745", "#007bff", "#ffc107", "#dc3545"], // Xuất sắc, Giỏi, TB, Yếu
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: "#374151", // hoặc '#fff' cho dark mode
        },
      },
    },
    yaxis: {
      title: {
        text: "Số lượng học sinh",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          fontSize: "13px",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#333", // hoặc '#fff' cho dark mode
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: (val: number) => `${val} học sinh`,
      },
    },
  };

  const convertChartData = (data: any[]) => {
    const subjectOrder = Array<any>();
    subjects.forEach((subject: any) => {
      if (subject.name === "ma_ngoai_ngu") {
        return;
      }
      subjectOrder.push({ key: subject.name, label: handleNameSubject(subject.name) });
    });

    const series = [
      { name: "Xuất sắc", data: [] as number[] },
      { name: "Giỏi", data: [] as number[] },
      { name: "Trung bình", data: [] as number[] },
      { name: "Yếu", data: [] as number[] },
    ];

    subjectOrder.forEach((subject) => {
      const entry = data.find((d) => d.subject === subject.key);
      if (entry) {
        series[0].data.push(entry.excellent);
        series[1].data.push(entry.good);
        series[2].data.push(entry.average);
        series[3].data.push(entry.weak);
      } else {
        series[0].data.push(0);
        series[1].data.push(0);
        series[2].data.push(0);
        series[3].data.push(0);
      }
    });

    return series;
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="min-w-[1000px]">
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
