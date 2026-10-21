import {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {feature} from 'topojson-client';

export default function Map({onCountrySelect}: {onCountrySelect: (country: string) => void}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 960;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .classed('w-full', true)
      .classed('h-auto', true);

    const g = svg.append('g');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    const projection = d3.geoMercator()
      .scale(150 * 5)
      .translate([width / 2, height / 1.2]);

    const path = d3.geoPath().projection(projection);

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      const countries = feature(data, data.objects.countries);

      const tooltip = d3.select('body').append('div')
        .attr('class', 'absolute bg-slate-950 text-white text-xs p-2 rounded shadow-lg pointer-events-none opacity-0 border border-slate-700');

      g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('class', 'fill-slate-700 stroke-slate-950 hover:fill-blue-600 cursor-pointer')
        .on('mouseover', (event, d: any) => {
            d3.select(event.currentTarget)
                .attr('stroke', '#60a5fa')
                .attr('stroke-width', 2)
                .raise(); // Bring to front
            tooltip.transition().duration(200).style('opacity', .9);
            tooltip.html(`<strong>${d.properties.name}</strong><br/>Crime: High<br/>Migration: Mod`)
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', (event) => {
            d3.select(event.currentTarget)
                .attr('stroke', '#030712')
                .attr('stroke-width', 1);
            tooltip.transition().duration(500).style('opacity', 0);
        })
        .on('click', (_event, d: any) => {
            onCountrySelect(d.properties.name || 'Unknown Country');
        });
    });

  }, [onCountrySelect]);

  return <svg ref={svgRef} className="bg-slate-900 border border-slate-700 rounded-lg shadow-sm w-full h-full"></svg>;
}
