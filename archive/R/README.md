Choropleth Shiny Server
=======================

`run_shiny_server.sh` will take a CSV file as an argument, and it will start a shiny app that 
plots a choropleth of the SF neighborhoods using that data.

For example:

```
./run_shiny_server.sh ../data/San_Francisco_Development_Pipeline_2015_Quarter_4.csv
```

The shiny app will allow you to select which variable the choropleth color scale corresponds to.
