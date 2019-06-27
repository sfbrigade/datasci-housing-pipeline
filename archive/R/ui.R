require(shiny)
require(plyr)

args <- commandArgs(trailingOnly = TRUE)
df = read.csv(args[1], stringsAsFactors=FALSE)

# Only integer columns will work well for the choropleth
options = names(colwise(class)(df)[,colwise(class)(df) == "integer"])
variableSelector = selectInput(inputId = "variable", 
            label = "Variable",
            choices = options, 
            selected = "UNITS")

shinyUI(fluidPage(
  titlePanel("SF Housing Pipeline"),
  sidebarLayout(
    mainPanel(
      plotOutput("choropleth", height = "700px")
    ),
    sidebarPanel(variableSelector)
  )
))
