import * as d3 from 'd3';
import { weather } from './weather';
import { SampleData } from './sample-data';
import { weatherGraphService } from './weather-graph-service';

interface ChartData {
    q: number,
    p: number
}

export function drawGraph() {
    try {
        console.log("Doing a thing");

        const width = 1400;
        const height = 550;
        const margin = 35;
        const axisWidth = width - 2 * margin;
        const axisHeight = height - 2 * margin - 1;
        const service = new weatherGraphService;
        const data = SampleData.data;
        const range = service.setTopLow(data);

        const colorData = service.generateColorData(data);

        let svg = d3.selectAll('svg').remove();

        svg = d3.select('#weather-graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g');

        //time scale
        const xScale = d3.scaleTime()
            .domain([range.minDate, range.maxDate])
            .range([0, axisWidth]);

        const xScaleT = d3.scaleLinear().range([0, axisWidth]);

        //temperature scale
        const yScale = d3.scaleLinear()
            .domain([range.highTemp + 2, range.lowTemp - 2])
            .range([0, axisHeight])
            .nice();

        //wind scale
        const yScaleR = d3.scaleLinear()
            .domain([range.highWind + 2, range.lowWind - 2])
            .range([0, axisHeight]);

        //temperature line
        let weatherLine = d3.line<weather>()
            .x((d: any) => xScale(new Date(d.time)))
            .y((d: any) => yScale(d.temp))
            .curve(d3.curveCardinal);

        //wind line
        // let windLine = d3.line<weather>()
        //     .x(d => xScale(new Date(d.time)))
        //     .y(d => yScaleR(d.wind_speed));

        //axis
        let xAxis = d3.axisBottom(xScale)
            .tickFormat(x => service.multiFormat(<Date>x))
            .ticks(15);

        let xAxisT = d3.axisTop(xScaleT);

        let yAxis = d3.axisLeft(yScale);

        let yAxisR = d3.axisRight(yScaleR);

        //Data for temperature line color
        svg.append('linearGradient')
            .attr('id', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .selectAll('stop')
            .data(colorData)
            .enter()
            .append('stop')
            .attr('offset', function (d) {
                return d.offset;
            })
            .attr('stop-color', function (d) {
                return d.color;
            });

        //construct x-axis
        svg.append('g')
            .classed('x-axis', true)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + (height - margin) + ')';
            })
            .call(xAxis);

        //construct y-axis
        svg.append('g')
            .classed('y-axis', true)
            .call(yAxis)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')';
            });
        svg.append('text')
            .attr('x', 10)
            .attr('y', 15)
            .style('text-anchor', 'middle')
            .html('&#8451;');

        //right y-axis
        svg.append('g')
            .classed('y-axis-r', true)
            .call(yAxisR)
            .attr('transform', function () {
                return 'translate(' + (width - margin) + ',' + margin + ')';
            });

        //Temperature line
        svg.append('path')
            .classed('temperature-line', true)
            .datum(data)
            .attr('d', weatherLine)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')';
            });

        //Wind line
        // svg.append('path')
        //     .classed('wind-line', true)
        //     .datum(data)
        //     .attr('d', windLine)
        //     .attr('transform', function () {
        //         return 'translate(' + margin + ',' + margin + ')';
        //     });

        //grid lines
        svg.selectAll('g.y-axis g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', axisWidth)
            .attr('y2', 0);

        svg.selectAll('g.x-axis g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', -axisHeight)
            .attr('x2', 0)
            .attr('y2', 0);
    }
    catch {
        console.log("Oooops!");
    }
};