# sf-planning-pipeline-report
slack channel: `#datasci-housingreport`

## About
This is a project of the [Data Science Working Group](https://github.com/sfbrigade/data-science-wg) at Code for San Francisco

[The original ask](https://github.com/sfbrigade/make-with-open-data/blob/master/quarterly-planning-reports.md), or how this project got started.

[Here is a past report that's a great overview of the how the data has been used in the past](http://sf-planning.org/sites/default/files/FileCenter/Documents/9338-pipelinereport_q3_2014.pdf)  

[Paula Chiu](mailto:paula.chiu@sfgov.org) is our contact as SF Gov (she's part of our Slack group too)

These DSWG members are contributors to this project, and how to get in touch with us on [slack](http://c4a.me/cfsfslack):

| Name | Slack Handle |
| ---|--- |
| Jeff Quinn | @jfquinn |
| Arash Aghevli | @arashaghevli |
| Tyler Field | @tyler |
| Sanat Moningi | @sanat |
| Earl Dos Santos | @earldossantos |
| Juan Carlos Collins | @juancarlos |
| Alwyna Lau | @alwynalau |
| Paula Chiu | @pchiu-sf |
| Geoffrey Pay | @gpay |
| Angelique DeCastro | @angeliquedecastro |
| Caressa Cunningham | @caressalc27 |

## Working Plan/Current Priorities

1. Create a data model that can span several quarters, adjusting for the name mismatch (@jfquinn, @arashaghevli)
2. Come up with detailed UI design (@caressalc27, @alwynalau)
3. Analyze how long projects take for completion. Determine what relationship between project size and completion time is. (@juancarlos)

## Questions we want to answer

The main question(s) we want to tackle with an interactive visualization would be the following. 
- How long it takes a project to go from start to end.
    - Does it depend on neighborhood? Size of project?
    - What factors depend on this?
    - What status of the projects take longer
    - Is there a status of the project where it's common for projects to get cancelled?
- At some point in time in the lifecycle of a project, the # of units are defined? This number changes towards the end (usually decreases).Typically speaking how many units do we lose over the course of a project?
    - What factors tend to lead to this?
- How many projects are being built per neighborhood?
    
Keep in mind we want to look at this at the Neighborhood and Zoning district level not at a individual project level.

Other Questions (From previous meeting):
  - How many units are being built per neighborhood per time period?
      - how many of those are affordable?
  - How many projects are being built per neighbood
  - How much space designated as "light industrial" is being gained/lost per neighboorhood?
  - Projects approved and filed over time:
      - what happens to the planning process per neighborhood
      - when were projects filed/approved/started/completed?
  - Size of project vs speed of getting on market?
  - A way to gauge compliance with Nov 2016's Measure X


## How do I access the data?

See data/README.md for information about analyzing the data. The data is checked into the repository under `data/cleaned`, and you should not need to download it yourself for most purposes.

## Links
The pipeline [dataset](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-4/ra2x-jzmk)  
The pipeline [website](http://sf-planning.org/pipeline-report)   
[Notes from March 2017 convo with Paula](https://docs.google.com/document/d/1PDnv3bhyy9-WjfjyPQg4G5H4C4uQ1fRk6G7GUIu1AW0/edit)
[an obsolete column mapping google doc](https://docs.google.com/spreadsheets/d/1ikjaHDLf-iCGBCQ1KmSIXVEiVNbX8pQzW26yYqhrH3U/edit#gid=1633784412)

See [data/README.MD](data/README.MD) for details about the data

| dataset | api link |
| ---|--- |
| [2012-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-1/v5p2-emnu) | [2012-Quarter-1 api](https://data.sfgov.org/resource/bi8h-tgxg.json) |
| [2012-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-2/ugxk-ztb8) | [2012-Quarter-2 api](https://data.sfgov.org/resource/g6gj-usjb.json) |
| [2012-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-4/b2bw-u33d) | [2012-Quarter-4 api](https://data.sfgov.org/resource/fpzh-9ii5.json) |
| [2013-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-1/bime-puj8) | [2013-Quarter-1 api](https://data.sfgov.org/resource/662u-bk2r.json) |
| [2013-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-2/evrp-pcmc) | [2013-Quarter-2 api](https://data.sfgov.org/resource/ixti-hd8i.json) |
| [2013-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-3/hxup-t2n6) | [2013-Quarter-3 api](https://data.sfgov.org/resource/h2ky-3rra.json) |
| [2013-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-4/ep85-j8df) | [2013-Quarter-4 api](https://data.sfgov.org/resource/s42z-x9np.json) |
| [2014-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-1/g383-7xmf) | [2014-Quarter-1 api](https://data.sfgov.org/resource/fq62-z4pc.json) |
| [2014-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-2/fv2q-qaux) | [2014-Quarter-2 api](https://data.sfgov.org/resource/tkr2-mzci.json) |
| [2014-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-3/n5ik-nmm3) | [2014-Quarter-3 api](https://data.sfgov.org/resource/9xqb-guwy.json) |
| [2014-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-4/858q-nwrm) | [2014-Quarter-4 api](https://data.sfgov.org/resource/ia2z-a7eh.json) |
| [2015-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-1/2cma-9y6y) | [2015-Quarter-1 api](https://data.sfgov.org/resource/auw5-vpae.json) |
| [2015-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-2/w3e8-bxrm) | [2015-Quarter-2 api](https://data.sfgov.org/resource/b6nb-tyvq.json) |
| [2015-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-3/apz9-dh7k) | [2015-Quarter-3 api](https://data.sfgov.org/resource/8qip-pyye.json) |
| [2015-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-4/ra2x-jzmk) | [2015-Quarter-4 api](https://data.sfgov.org/resource/6jnk-ty34.json) |
| [2016-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2016-Quarter-1/dtz9-jkjt) | [2016-Quarter-1 api](https://data.sfgov.org/resource/6iid-qfaz.json) |
| [2016-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2016-Quarter-2/g5sr-9nhs) | [2016-Quarter-2 api](https://data.sfgov.org/resource/3n2r-nn4r.json) |

### Annual Housing Inventory Reports
- [2011](https://data.sfgov.org/Housing-and-Buildings/2011-Housing-Inventory/mpcm-79w2)
- [2012](https://data.sfgov.org/Housing-and-Buildings/2012-Housing-Inventory/4xa2-t52k)
- [2013](https://data.sfgov.org/Housing-and-Buildings/2013-Housing-Inventory/e7d3-dxh5)
- [2014](https://data.sfgov.org/Housing-and-Buildings/2014-Housing-Inventory/b8d6-zthg)
- [2015](https://data.sfgov.org/Housing-and-Buildings/2015-Housing-Inventory/4htx-8nvv)

### Affordable Housing Reports
- https://data.sfgov.org/Housing-and-Buildings/Mayor-s-Office-of-Housing-and-Community-Developmen/9rdx-httc
- https://data.sfgov.org/Housing-and-Buildings/Affordable-Housing-Pipeline/aaxw-2cb8


## Useful Term Dictionary
Entitlement Status: 0 = Under Planning Review, -1 = Approved By Planning  
APN: Assessor Parcel Number (blocklot, blklot)  
MIPS: Managerial, Information, Professional Services.  (Same as Office)  
CIE: Cultural, Institutional, Educational  
PDR: Production, Distribution, Repair  


## Setting up Python Environment

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
