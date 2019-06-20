(function() {
  d3_queue.queue()
      .defer(d3.json, "data/n5ik-nmm3.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(afterLoad)


  function afterLoad (error,data) {
    if (error) console.log('There was an error downloading data')

    var projectSize = d3.scale.threshold()
                      .domain([1,3,11,50,250])
                      // .range([0,1,2,3,4,5])
                      .range(['0','1-2','3-10', '11-49', '50-250', 'Above 250'])

    var projByNeighbhood = d3.nest()
      .key(function(d) { return d.planning_neighborhood })
      .rollup(function(v) { return {
        projects: v.length,
        units: d3.sum(v, function(d) { return +d.units })
      }; })
      .entries(data)

    projByNeighbhood.sort(function(a, b) {
      return +(a.values.units < b.values.units) || +(a.values.units === b.values.units) - 1;
    });

    var projBySizeGroup = d3.nest()
      .key(function(d) { return projectSize(+d.units) } )
      .key(function(d) { return d.planning_neighborhood })
      .rollup(function(v) { return {
        projects: v.length,
        units: d3.sum(v, function(d) { return +d.units })
      }; })
      .entries(data)
      // .map(data)


    var neighborhoodList = projByNeighbhood.map(function(el){
      return el.key
    })

    var columns = projBySizeGroup.map(function(el){
      var result = new Array(neighborhoodList.length).fill(0)
      el.values.forEach(function(val){
        var j = neighborhoodList.findIndex(function(nh){ return nh === val.key })
        result[j] = val.values.units
      })
      result.unshift(el.key)
      return result
    })
    columns.shift()
    columns.pop()

    var chart = c3.generate({
      bindto: '#barchart',
      data: {
        columns: columns,
        type: 'bar',
        groups: [
          projectSize.range()
        ],
      },
      axis: {
        x: {
            type: 'category',
            categories: neighborhoodList
        },
        y: {
            max: 3500,
            min: 0,
            padding: {top:0, bottom:0}
        },
        rotated: true
      },
      size: {
        height: 600
      }
    });


  }

  }());