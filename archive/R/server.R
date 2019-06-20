library(plyr)
library(rgeos)
library(maptools)
library(stringr)
library(ggplot2)
library(shiny)

args <- commandArgs(trailingOnly = TRUE)

df = read.csv(args[1], stringsAsFactors = FALSE)

neighborhoods <- readShapeSpatial("../gis/shp/neighborhoods.shp")
neighborhoods <- fortify(neighborhoods, region = "nhood")

# Try to standardize identifiers.
neighborhoods$id <- str_trim(toupper(neighborhoods$id))
df$NEIGHBORHOOD <- str_trim(toupper(df$NEIGHBORHOOD))

plotChoropleth = function(data, variable) {
    ggplot() +
        geom_map(data = data,
                 aes_string(map_id = "NEIGHBORHOOD", fill = variable),
                 map = neighborhoods) +
        geom_polygon(data = neighborhoods, aes(x=long, y = lat, group = group), fill = NA, color = "black") +
        expand_limits(x = neighborhoods$long, y = neighborhoods$lat)
}

shinyServer(function(input, output) {
    output$choropleth <- renderPlot({
        plotChoropleth(df, input$variable)
    })
})
