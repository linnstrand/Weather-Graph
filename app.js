requirejs.config({
    paths: {
        'd3': 'node_modules/d3/build/d3'
    }
});

require(['dist/weather-graph', 'd3']);