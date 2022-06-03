#####
# init
#####
# clear old data
rm(list=ls(all=TRUE))

# set working directory
data_wd = "C:/Users/desk/_srf_updates_backups/socdoneleft.github.io/"
setwd(data_wd)

# load packages
require("data.table")
require("ggplot2")
require("readxl")

#####
# read data
#####
# read csv
budget = read_excel("budget.xlsx")
budget = data.table(budget)

# reformat columns
budget[, date := as.Date(date, format = "%Y-%m-%d UTC")]
budget[, yearmonth := format(date, "%Y-%m")]

# skip last row
budget = budget[-dim(budget)[1], ]

#####
# graph data
#####
summary = budget[, .(sumearnings = sum(earnings)), by = c("yearmonth", "type")]
summary = summary[-c(1:2), ]

ggplot(summary, aes(x = yearmonth, y = sumearnings, fill = type, group = type)) +
  geom_bar(stat = "identity")

summary = summary[, .(cumsumearnings = cumsum(sumearnings), yearmonth = yearmonth), by = c("type")]

ggplot(summary, aes(x = yearmonth, y = cumsumearnings, color = type, group = type)) +
  geom_line(size = 2)
