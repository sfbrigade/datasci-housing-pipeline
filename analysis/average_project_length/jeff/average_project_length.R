require("ggplot2")

df = read.csv("data/cleaned/time_to_construction_aggregated.csv", header=TRUE)

ggplot(data = df) + geom_point(mapping = aes(x = time_to_construction, y = units))

lm(time_to_construction ~ units, data = df)

ggplot(df, aes(x = neighborhood, y = time_to_construction)) + 
        geom_bar(stat = "summary", fun.y = "mean") +
        theme(axis.text.x = element_text(angle = 90, hjust = 1))
