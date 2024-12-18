"use client";

import * as d3 from "d3";

import { ExpenseType, useGetExpenses } from "../api/use-get-expenses";
import { useEffect, useRef } from "react";

const Expenses = () => {
  const { data, isLoading } = useGetExpenses();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width || 500;
    const height = svg.node()?.getBoundingClientRect().height || 500;
    const radius = Math.min(width, height) / 2;

    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<(typeof data)[0]>()
      .value((d: ExpenseType) => d.value)
      .startAngle(-45)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(0)
      .outerRadius((d) => {
        const index = data.findIndex((item) => item.id === d.data.id);
        return radius * 0.9 * (index === 1 ? 1.1 : index === 3 ? 0.9 : 1);
      });

    // Function to calculate the centroid offset for the "exploded" effect
    const midAngle = (d: d3.PieArcDatum<(typeof data)[0]>) =>
      d.startAngle + (d.endAngle - d.startAngle) / 2;

    const getExplodeOffset = (d: d3.PieArcDatum<(typeof data)[0]>) => {
      const index = data.findIndex((item) => item.id === d.data.id);
      const OFFSET = 6;

      switch (index) {
        case 0:
          return [0, -OFFSET]; // top
        case 1:
          return [OFFSET, 0]; // right
        case 2:
          return [0, OFFSET]; // bottom
        case 3:
          return [-OFFSET, 0]; // left
        default:
          return [0, 0];
      }
    };

    const labelArc = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.5);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", (d: d3.PieArcDatum<ExpenseType>) => {
        const [x, y] = getExplodeOffset(d);
        return `translate(${x}, ${y})`;
      });

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.fill);

    arcs
      .append("text")
      .attr(
        "transform",
        (d: d3.PieArcDatum<ExpenseType>) => `translate(${labelArc.centroid(d)})`
      )
      .attr("dy", "-0.5em")
      .text((d: d3.PieArcDatum<ExpenseType>) => `${d.data.value}%`)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    arcs
      .append("text")
      .attr(
        "transform",
        (d: d3.PieArcDatum<ExpenseType>) => `translate(${labelArc.centroid(d)})`
      )
      .attr("dy", "1em")
      .text((d: d3.PieArcDatum<ExpenseType>) => d.data.label)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "14px");
  }, [data]);

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">Expense Statistics</span>
      </div>
      <div className="flex flex-col gap-5 rounded-3xl bg-white border border-gray-200 h-[322px] w-[350px] p-6">
        <div className="w-full h-full">
          <svg ref={svgRef} className="w-full h-full"></svg>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
