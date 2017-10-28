define(["require", "exports", "d3", "./sample-data", "./weather-graph-service"], function (require, exports, d3, sample_data_1, weather_graph_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawGraph() {
        var width = 1100;
        var height = 550;
        var margin = 35;
        var axisWidth = width - 2 * margin;
        var axisHeight = height - 2 * margin - 1;
        var service = new weather_graph_service_1.weatherGraphService;
        var data = sample_data_1.SampleData.data.slice(0, 30);
        var range = service.setTopLow(data);
        var colorData = service.generateColorData(data);
        var svg = d3.selectAll('svg').remove();
        svg = d3.select('#weather-graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g');
        //time scale
        var xScale = d3.scaleTime()
            .domain([range.minDate, range.maxDate])
            .range([0, axisWidth]);
        var xScaleT = d3.scaleLinear().range([0, axisWidth]);
        //temperature scale
        var yScale = d3.scaleLinear()
            .domain([range.highTemp + 2, range.lowTemp - 2])
            .range([0, axisHeight])
            .nice();
        //wind scale
        var yScaleR = d3.scaleLinear()
            .domain([range.highWind + 2, range.lowWind - 2])
            .range([0, axisHeight]);
        //temperature line
        var weatherLine = d3.line()
            .x(function (d) { return xScale(new Date(d.time)); })
            .y(function (d) { return yScale(d.temp); })
            .curve(d3.curveCardinal);
        // wind line
        var windLine = d3.line()
            .x(function (d) { return xScale(new Date(d.time)); })
            .y(function (d) { return yScaleR(d.wind_speed); });
        //axis
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(function (x) { return service.multiFormat(x); })
            .ticks(15);
        var xAxisT = d3.axisTop(xScaleT);
        var yAxis = d3.axisLeft(yScale);
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
            .attr('style', function (d) { return 'stop-color:' + d.color + ';'; });
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
        // svg.selectAll('circle')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', function (d) {
        //         return xScale(new Date(d.time))
        //     })
        //     .attr('cy', function (d) {
        //         return yScale(d.temp)
        //     })
        //     .attr('r', 3)
        //     .attr('transform', function () {
        //         return 'translate(' + margin + ',' + margin + ')';
        //     });
        //Wind line
        svg.append('path')
            .classed('wind-line', true)
            .datum(data)
            .attr('d', windLine)
            .attr('transform', function () {
            return 'translate(' + margin + ',' + margin + ')';
        });
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
    exports.drawGraph = drawGraph;
    ;
});
//# sourceMappingURL=weather-graph.js.map