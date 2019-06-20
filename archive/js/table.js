(function() {
  d3_queue.queue()
      .defer(d3.json, "data/n5ik-nmm3.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(afterLoad)


  function afterLoad (error,data) {
    if (error) console.log('There was an error downloading data')

    function table1 () {
      var dataNest = d3.nest()
        .key(function(d) { return (d.entitlementstatus == "0") ? 'Under Planning Review' : 'Approved By Planning' })
        .key(function(d) { return d.beststat_group })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_cult_inst_educ: d3.sum(v, function(d) { return +d.net_cult_inst_educ }),
          net_medical: d3.sum(v, function(d) { return +d.net_medical }),
          net_office: d3.sum(v, function(d) { return +d.net_office }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep }),
          net_ret_ent: d3.sum(v, function(d) { return +d.net_ret_ent }),
          net_visitor: d3.sum(v, function(d) { return +d.net_visitor })
        }; })
        .entries(data)

      var t1aData = d3nestToDatatables(dataNest[0].values)
          t1aData.forEach(function(el){el.unshift('Under Planning Review')})
      var t1bData = d3nestToDatatables(dataNest[1].values)
          t1bData.forEach(function(el){el.unshift('Approved by Planning')})
      var tData = t1aData.concat(t1bData)

      var tHead = [
        { title: "Entitlement Status" },
        { title: "Status" },
        { title: "Total no of Projects" },
        { title: "Net Housing Units" },
        { title: "Net Comm'l Sqft" },
        { title: "CIE" },
        { title: "Medical" },
        { title: "Office" },
        { title: "PDR" },
        { title: "Retail" },
        { title: "Visitior" }
      ]
      tHead.forEach(function(el,i){ el.targets = i })

      var grandTotal = flatTotals(tData)

      addFlatFooter('table1', grandTotal)

      return { data: tData, columns: tHead, searching: false, paging: false, info: false}
    }

    function table2 () {
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          units: d3.sum(v, function(d) { return +d.units }),
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf })
        }; })
        .entries(data)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'net_added_units')
      ranks(dataNest, 'net_added_units')
      ranks(dataNest, 'net_added_sf')
      averages(dataNest,'units','projects') //average units/project

      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "Avg Units per Proj" },
        { title: "Net Comm'l Sq Ft" },
        { title: "Residential Rank" },
        { title: "Commercial Rank" }
      ]
      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key" },
        { data: "values.projects" },
        { data: "values.projects_percent" },
        { data: "values.net_added_units" },
        { data: "values.net_added_units_percent" },
        { data: "values.average_units_per_projects" },
        { data: "values.net_added_sf" },
        { data: "values.net_added_units_rank" },
        { data: "values.net_added_sf_rank" }
      ]

      var grandTotal = totals(dataNest)

      addFooter('table2', [
        'key',
        'projects',
        'projects_percent',
        'net_added_units',
        'net_added_units_percent',
        'average_units_per_projects',
        'net_added_sf',
        'net_added_units_rank',
        'net_added_sf_rank'
      ], grandTotal)

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}
    }

    function table3 () {
      var dataNest = d3.nest()
        .key(function(d) { return d.zoning_generalized })
        .key(function(d) { return d.zoning_simplified })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_cult_inst_educ: d3.sum(v, function(d) { return +d.net_cult_inst_educ }),
          net_medical: d3.sum(v, function(d) { return +d.net_medical }),
          net_office: d3.sum(v, function(d) { return +d.net_office }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep }),
          net_ret_ent: d3.sum(v, function(d) { return +d.net_ret_ent }),
          net_visitor: d3.sum(v, function(d) { return +d.net_visitor })
        }; })
        .entries(data)

      var tHead = [
        { title: "District Type" },
        { title: "Simplified Zoning" },
        { title: "Projects" },
        { title: "Net Units" },
        { title: "Net Gross Sq Ft" },
        { title: "CIE" },
        { title: "Medical" },
        { title: "Office" },
        { title: "PDE" },
        { title: "Retail" },
        { title: "Visitor" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tData = dataNest.map(function(el){
        var flattened = d3nestToDatatables(el.values)
        flattened.forEach(function(d){d.unshift(el.key)})
        return flattened
      })
      tData = _.flatten(tData,true)

      var grandTotal = flatTotals(tData)
      addFlatFooter('table3', grandTotal)

      return { data: tData, columns: tHead, searching: false, paging: false, info: false}
    }

    function table4 () {
      var projectSize = d3.scale.threshold()
                        .domain([1,2,10,20,50,100,250])
                        .range(['0','1','2-9','10-19','20-49','50-99', '100-249','Above 250'])

      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          singleFamily: d3.sum(v, function(d) { return projectSize(+d.units)==='1'}),
          twoToNine: d3.sum(v, function(d) { return projectSize(+d.units)==='2-9'}),
          tenToNineteen: d3.sum(v, function(d) { return projectSize(+d.units)==='10-19'}),
          twentyToFortynine: d3.sum(v, function(d) { return projectSize(+d.units)==='20-49'}),
          fiftyToNinetynine: d3.sum(v, function(d) { return projectSize(+d.units)==='50-99'}),
          hundredToTwofifty: d3.sum(v, function(d) { return projectSize(+d.units)==='100-249'}),
          morethanTwofifty: d3.sum(v, function(d) { return projectSize(+d.units)==='Above 250'}),
          grandTotal: d3.sum(v, function(d) { return +d.units })
        }; })
        .entries(data)
      ranks(dataNest,'grandTotal')
      // debugger


      var tHead = [
        { title: "Neighborhood" },
        { title: "Single Family" },
        { title: "2-9 Units" },
        { title: "10-19 Units" },
        { title: "20-49 Units" },
        { title: "50-99 Units" },
        { title: "100-249 Units" },
        { title: "Above 250" },
        { title: "Grand Total" },
        { title: "Rank" }
      ]
      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key" },
        { data: "values.singleFamily" },
        { data: "values.twoToNine" },
        { data: "values.tenToNineteen" },
        { data: "values.twentyToFortynine" },
        { data: "values.fiftyToNinetynine" },
        { data: "values.hundredToTwofifty" },
        { data: "values.morethanTwofifty" },
        { data: "values.grandTotal" },
        { data: "values.grandTotal_rank" }
      ]

      var grandTotal = totals(dataNest)

      addFooter('table4', [
        'neighborhood',
        'singleFamily',
        'twoToNine',
        'tenToNineteen',
        'twentyToFortynine',
        'fiftyToNinetynine',
        'hundredToTwofifty',
        'morethanTwofifty',
        'grandTotal'
      ], grandTotal)

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}
    }

    function table5 () {
      var lostPDR = data.filter(function(d){ return d.net_prod_dist_rep < 0 })
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep })
        }; })
        .entries(lostPDR)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'net_added_units')
      percentages(dataNest, 'net_prod_dist_rep')

      var grandTotal = totals(dataNest)

      addFooter('table5', [
        'neighborhood',
        'projects',
        'projects_percent',
        'net_added_units',
        'net_added_units_percent',
        'net_prod_dist_rep',
        'net_prod_dist_rep_percent'
      ], grandTotal)



      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "PDR Net" },
        { title: "Percent" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key"},
        { data: "values.projects"},
        { data: "values.projects_percent"},
        { data: "values.net_added_units"},
        { data: "values.net_added_units_percent"},
        { data: "values.net_prod_dist_rep"},
        { data: "values.net_prod_dist_rep_percent"}
      ]
      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}
    }

    function table6 () {
      var lostOffice = data.filter(function(d){ return d.net_office < 0 })
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_office: d3.sum(v, function(d) { return +d.net_office })
        }; })
        .entries(lostOffice)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'net_added_units')
      percentages(dataNest, 'net_office')

      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "Office Net" },
        { title: "Percent" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key"},
        { data: "values.projects"},
        { data: "values.projects_percent"},
        { data: "values.net_added_units"},
        { data: "values.net_added_units_percent"},
        { data: "values.net_office"},
        { data: "values.net_office_percent"}
      ]

      var grandTotal = totals(dataNest)
      addFooter('table6', [
        'neighborhood',
        'projects',
        'projects_percent',
        'net_added_units',
        'net_added_units_percent',
        'net_office',
        'net_office_percent'
      ], grandTotal)

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}

    }

    $(document).ready(function() {
      $('#table1').DataTable( table1() )
      $('#table1').prepend('<caption>Table 1 - Residential and Commercial Pipeline, by Pipeline Status and Land Use Category</caption>')

      $('#table2').DataTable( table2() )
      $('#table2').prepend('<caption>Table 2 - Residential and Commercial Pipeline, by Neighborhood</caption>')

      $('#table3').DataTable( table3() )
      $('#table3').prepend('<caption>Table 3 - Residential and Commercial Pipeline by Generalized Zoning Category</caption>')

      $('#table4').DataTable( table4() )
      $('#table4').prepend('<caption>Table 4 - Projects by Neighborhood and Building Size</caption>')

      $('#table5').DataTable( table5() )
      $('#table5').prepend('<caption>Table 5 - PDR Space Conversion to Residential Use, by Planning District</caption>')

      $('#table6').DataTable( table6() )
      $('#table6').prepend('<caption>Table 6 - Office Space Conversion to Residential Use, by Planning District</caption>')
    })
  }

  function d3nestToDatatables (nestData) {
    var dataSet = nestData.map(function (row) {
      var result = []
      result.push(row.key)
      for (v in row.values){
        result.push(row.values[v])
      }
      return result
    } )
    return dataSet
  }

  function percentages(dataNest, varName){
    var totalVarName = dataNest.reduce(function(prev, curr) {
      return prev + curr.values[varName]
    },0)
    return dataNest.map(function(el){
      var percent = Math.round(el.values[varName]/totalVarName*100)
      el.values[varName +'_percent'] = percent //+ '%'
    })
  }

  function ranks(dataNest, varName){
    dataNest.sort(function(a,b){
      return b.values[varName] - a.values[varName]
    })
    return dataNest.map(function(el,i){
      el.values[varName +'_rank'] = i +1
    })
  }

  function averages(dataNest, var1, var2){
    //average num of var1 per var2
    return dataNest.map(function(el,i){
      el.values['average_'+ var1 + '_per_' + var2] = Math.round(el.values[var1]/el.values[var2])
    })
  }

  function totals(dataNest) {
    return dataNest.reduce(function(prev, curr) {
      var next = {}
      for (variable in curr.values) {
        next[variable] = (!prev[variable] ? 0 : prev[variable]) + curr.values[variable]
      }
      return next
    },{})
  }

  function flatTotals(dataArray) {
    return dataArray.reduce(function(prev,curr){
      var next = []
      curr.forEach(function(el,i){
        next[i] = (!prev[i] ? 0 : +prev[i]) + +curr[i]
      })
      return next
    },[])
  }

  function addFooter(tableEl, cols, totals) {
    $('#'+tableEl).append('<tfoot>')
    $('#'+tableEl + ' tfoot').append('<tr>')
    var footer = $('#'+tableEl + ' tfoot tr')
    cols.forEach(function(el,i){
      if (i==0) {footer.append('<th>Total</th>')}
      else {footer.append('<th class="text-right">'+totals[el]+'</th>')}
    })
  }

  function addFlatFooter(tableEl, totals) {
    $('#'+tableEl).append('<tfoot>')
    $('#'+tableEl + ' tfoot').append('<tr>')
    var footer = $('#'+tableEl + ' tfoot tr')
    totals.forEach(function(el,i){
      if (i==0) {footer.append('<th>Total</th>')}
      else if (i==1) {footer.append('<th></th>')}
      else {footer.append('<th class="text-right">'+el+'</th>')}
    })
  }



}());
