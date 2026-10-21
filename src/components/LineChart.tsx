import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default function LineChart({data}: {data: {year: number; crime: number; migration: number}[]}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 300;
    const height = 150;
    const margin = {top: 10, right: 10, bottom: 20, left: 30};

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year) as [number, number])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.crime, d.migration)) as number])
      .range([height - margin.bottom, margin.top]);

    const lineCrime = d3.line<{year: number; crime: number; migration: number}>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.crime));

    const lineMigration = d3.line<{year: number; crime: number; migration: number}>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.migration));

    svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'red').attr('d', lineCrime as any);
    svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'blue').attr('d', lineMigration as any);

  }, [data]);

  return <svg ref={svgRef} width="300" height="150" className="bg-slate-50 rounded-lg" />;
}
