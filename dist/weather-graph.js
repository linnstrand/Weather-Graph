define(["require", "exports", "d3", "./sample-data", "./weather-graph-service"], function (require, exports, d3, sample_data_1, weather_graph_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawGraph() {
        try {
            console.log("Doing a thing");
            var width_1 = 1400;
            var height_1 = 550;
            var margin_1 = 35;
            var axisWidth = width_1 - 2 * margin_1;
            var axisHeight = height_1 - 2 * margin_1 - 1;
            var service_1 = new weather_graph_service_1.weatherGraphService;
            var data = sample_data_1.SampleData.data;
            var range = service_1.setTopLow(data);
            var colorData = service_1.generateColorData(data);
            var svg = d3.selectAll('svg').remove();
            svg = d3.select('#weather-graph')
                .append('svg')
                .attr('width', width_1)
                .attr('height', height_1)
                .append('g');
            //time scale
            var xScale_1 = d3.scaleTime()
                .domain([range.minDate, range.maxDate])
                .range([0, axisWidth]);
            var xScaleT = d3.scaleLinear().range([0, axisWidth]);
            //temperature scale
            var yScale_1 = d3.scaleLinear()
                .domain([range.highTemp + 2, range.lowTemp - 2])
                .range([0, axisHeight])
                .nice();
            //wind scale
            var yScaleR = d3.scaleLinear()
                .domain([range.highWind + 2, range.lowWind - 2])
                .range([0, axisHeight]);
            //temperature line
            var weatherLine = d3.line()
                .x(function (d) { return xScale_1(new Date(d.time)); })
                .y(function (d) { return yScale_1(d.temp); })
                .curve(d3.curveCardinal);
            //wind line
            // let windLine = d3.line<weather>()
            //     .x(d => xScale(new Date(d.time)))
            //     .y(d => yScaleR(d.wind_speed));
            //axis
            var xAxis = d3.axisBottom(xScale_1)
                .tickFormat(function (x) { return service_1.multiFormat(x); })
                .ticks(15);
            var xAxisT = d3.axisTop(xScaleT);
            var yAxis = d3.axisLeft(yScale_1);
            var yAxisR = d3.axisRight(yScaleR);
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
                return 'translate(' + margin_1 + ',' + (height_1 - margin_1) + ')';
            })
                .call(xAxis);
            //construct y-axis
            svg.append('g')
                .classed('y-axis', true)
                .call(yAxis)
                .attr('transform', function () {
                return 'translate(' + margin_1 + ',' + margin_1 + ')';
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
                return 'translate(' + (width_1 - margin_1) + ',' + margin_1 + ')';
            });
            //Temperature line
            svg.append('path')
                .classed('temperature-line', true)
                .datum(data)
                .attr('d', weatherLine)
                .attr('transform', function () {
                return 'translate(' + margin_1 + ',' + margin_1 + ')';
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
        catch (_a) {
            console.log("Oooops!");
        }
    }
    exports.drawGraph = drawGraph;
    ;
});
//# sourceMappingURL=weather-graph.js.map