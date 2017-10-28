requirejs.config({
    paths: {
        'd3': 'https://d3js.org/d3.v4'
    }
});

require(['dist/weather-graph', 'd3']);