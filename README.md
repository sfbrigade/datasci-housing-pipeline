# San Francisco Housing Pipeline Project

### Having a shared interest with stakeholders in creating a more inclusive San Francisco through enabling accessible housing, we use Data Science to understand the facts and predict the potential impact of housing policy. We are not partisan or political.

[Living Project Document](https://docs.google.com/document/d/1-kBd97J6tX17gB4WVUejF7qSUWsGA8oTzvvCUvntKh8/edit#)

_This is a project of the [Data Science Working Group](https://github.com/sfbrigade/data-science-wg) at Code for San Francisco. slack: `#datasci-housingreport`_

### SF Brigade Team
_(Team, please keep your level of desired involvement up to date here)_

| Name | [Slack](http://c4a.me/cfsfslack) Handle | Role | [RACI](http://www.valuebasedmanagement.net/methods_raci.html) |
| ---|---|---|---|
| Clare Corthell | @clare | Lead, Product Manager | Responsible |
| Jason Kalmeida | @jasonkalmeida | ? | ? |
| Vijai Narayanan | @VijaiNarayanan | ? | ? |
| Rahele Tesfu | @? | Asso. Product Manager | ? |
| Adam Szabunio | @? | Data Scientist | ? |
| Sanat Moningi | @sanat | DSWG Founder | Informed |
| Brian Goggin | @bgoggin | - | _inactive_ |
| Jeff Quinn | @jfquinn |  - | _inactive_ |
| Arash Aghevli | @aaghevli |  - | _inactive_ |
| Tyler Field | @tyler |  - | _inactive_ |
| Earl Dos Santos | @earldossantos |  - | _inactive_ |
| Juan Carlos Collins | @juancarlos |  - | _inactive_ |
| Alwyna Lau | @alwynalau |  - | _inactive_ |
| Geoffrey Pay | @gpay |  - | _inactive_ |
| Angelique DeCastro | @angeliquedecastro |  - | _inactive_ |
| Caressa Cunningham | @caressalc27 |  - | _inactive_ |

### Partners & Stakeholders

For PM management of stakeholders, see [Living Project Document](https://docs.google.com/document/d/1-kBd97J6tX17gB4WVUejF7qSUWsGA8oTzvvCUvntKh8/edit#).

| Entity | Name | Contact | Role | RACI |
| ---|---|---|---| -- |
| **SF Planning Department** | [Paula Chiu](mailto:paula.chiu@sfgov.org) | paula.chiu@sfgov.org @pchiu-sf |  SF Planning Department | Informed |
| **Govt Data Portal** | Jason |---|---| Informed |
| **SF Supervisors** |---|---|---| --|
| SF Supervisor D5 | London Breed | London.Breed@sfgov.org | Legislature stakeholder | Informed |
| SF Supervisor D8 | Jeff Sheehy | Jeff.Sheehy@sfgov.org | Legislature stakeholder | - |
| SF Supervisor D9 | Hillary Ronen | Hillary.Ronen@sfgov.org | Legislature stakeholder | - |
| **SF Mayor** |---|---|---|
| Candidate for Mayor (6/2018) | London Breed | london@londonformayor.com | City Executive Stakeholder | Informed |
| **CA State Legislative Representatives** |---|---|---| --|
| CA State Legislative Representatives |---|---|---| --|
| Coalitional / Advocacy Organization |---|---|---| --|
| Non-SF CfA Housing Projects |---|---|---| --|
| San Francisco Residents | *by survey* |---|---| --|
| Real Estate Developers |---|---|---| --|
| Press / Journalists |---|---|---| --|

## How do I access the data?

See [data/README.md](/data/README.md) for information about analyzing the data. The data is checked into the repository under `data/cleaned`.

## History of the Project

Started in December 2015 by the SF Data Science Working Group, the project focused on integrating and exploring data, guided by opening questions of the [the original ask](https://github.com/sfbrigade/make-with-open-data/blob/master/quarterly-planning-reports.md).

In December 2017, Phase II began to incorporate new stakeholders and build further analysis on top of work in Phase I.

## Links
The pipeline [dataset](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-4/ra2x-jzmk)  
The pipeline [website](http://sf-planning.org/pipeline-report)   
[Notes from March 2017 convo with Paula](https://docs.google.com/document/d/1PDnv3bhyy9-WjfjyPQg4G5H4C4uQ1fRk6G7GUIu1AW0/edit)

See [data/README.MD](data/README.MD) for details about the data

### Annual Housing Inventory Reports
- [2011](https://data.sfgov.org/Housing-and-Buildings/2011-Housing-Inventory/mpcm-79w2)
- [2012](https://data.sfgov.org/Housing-and-Buildings/2012-Housing-Inventory/4xa2-t52k)
- [2013](https://data.sfgov.org/Housing-and-Buildings/2013-Housing-Inventory/e7d3-dxh5)
- [2014](https://data.sfgov.org/Housing-and-Buildings/2014-Housing-Inventory/b8d6-zthg)
- [2015](https://data.sfgov.org/Housing-and-Buildings/2015-Housing-Inventory/4htx-8nvv)

### Affordable Housing Reports
- https://data.sfgov.org/Housing-and-Buildings/Mayor-s-Office-of-Housing-and-Community-Developmen/9rdx-httc
- https://data.sfgov.org/Housing-and-Buildings/Affordable-Housing-Pipeline/aaxw-2cb8

---

## Getting Started

### Setting up Python Environment

First make sure you have python3 and virtualenv installed.

Run this command to make a virtualenv:

`virtualenv --python=$(which python3) VE`

Run this command to enter the virtualenv:

`source VE/bin/activate`

Then run this command to install the dependencies:

```
brew install gdal --HEAD
pip install -r requirements.txt
```
