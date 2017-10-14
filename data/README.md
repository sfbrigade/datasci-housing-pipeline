# Housing Pipeline Dataset

This directory contains the housing pipeline dataset downloaded from [The SF OpenData](https://data.sfgov.org/data?dept=Planning&type=datasets&search=pipeline)
* [cleaned](cleaned) - canonical JSON housing data used for analysis
* [raw](raw) - raw datasets in csv format
* [raw/columnnames](raw) - transform file to map raw csv columns to a standard set
* [cleaner.ipynb](cleaner.py) - transforms raw pipeline datasets and appends them into one file
* [data_model.ipynb](data_model.py) - builds on cleaner.ipynb to create one project-level file with project times

Files are marked as belonging to a certain quarter, but that file can contain events from previous quarters.

It is unclear what the relationship between the quarter of the file and date of the events it contains is.

## Where is the data?

There are two files right now that are suitable for using for analysis:

* `data/cleaned/all_quarters_merged.csv` - this file is created by the `data/cleaner.ipynb` script. It includes all quarterly files concatenated, with column names and column values standardized.
* `data/cleaned/all_quarters__one_record_per_project.csv` - this file is created by the `data/data_model.ipynb` script. It is generated from the `all_quarters_merged.csv` file. It has been modified so that there is only one record per project (using apn+address as a unique project identifier). All attributes, such as number of units etc. are taken from the latest recrord received for that project. Other useful variables, such as the duration of a project, its first status, as well as the series of statuses it has gone through are added.

If you find that the information you are interested in is messed up, please modify the scripts so that it is corrected. Avoid doing 1-off, non-reproducible analysis.

## About the dataset

Each row represents a _transition_ into another stage of the pipeline for a single project.

This means the same project can occur multiple times in the dataset, since multiple transitions are required before a project is complete.

Below are the 7 states that a project can be in:

### Project States

| PROJECT STATUS     | Current pipeline status of a project application.                               |
|--------------------|---------------------------------------------------------------------------------|
| Under Construction | Project is under construction.                                                  |
| BP Approved        | DBI approved building permit.                                                   |
| BP Issued          | Project sponsor has picked up approved building permit (proxy measure of under construction). |
| BP Reinstated      | DBI reinstates a lapsed building permit (lapses after 1 year with no activity). |
| BP Filed           | Application for building permit filed with BPI                                  |
| PL Approved        | All Planning actions approved.                                                  |
| PL Filed           | Project application filed with the Planning Department                          |

### Number of records per file

| filename | Number of Records | Number of Unique Records (by APN) |
|-------------------------------------------------------|------|------|
| San_Francisco_Development_Pipeline_2012_Quarter_1.csv | 744  | 744  |
| San_Francisco_Development_Pipeline_2012_Quarter_2.csv | 740  | 740  |
| San_Francisco_Development_Pipeline_2012_Quarter_4.csv | 708  | 708  |
| San_Francisco_Development_Pipeline_2013_Quarter_1.csv | 775  | 775  |
| San_Francisco_Development_Pipeline_2013_Quarter_2.csv | 807  | 807  |
| San_Francisco_Development_Pipeline_2013_Quarter_3.csv | 898  | 898  |
| San_Francisco_Development_Pipeline_2013_Quarter_4.csv | 857  | 856  |
| San_Francisco_Development_Pipeline_2014_Quarter_1.csv | 874  | 873  |
| San_Francisco_Development_Pipeline_2014_Quarter_2.csv | 894  | 892  |
| San_Francisco_Development_Pipeline_2014_Quarter_4.csv | 895  | 895  |
| San_Francisco_Development_Pipeline_2015_Quarter_1.csv | 1020 | 1019 |
| San_Francisco_Development_Pipeline_2015_Quarter_2.csv | 1119 | 1113 |
| San_Francisco_Development_Pipeline_2015_Quarter_3.csv | 1189 | 1187 |
| San_Francisco_Development_Pipeline_2015_Quarter_4.csv | 1294 | 1278 |
| San_Francisco_Development_Pipeline_2016_Quarter_1.csv | 1299 | 1280 |
| San_Francisco_Development_Pipeline_2016_Quarter_2.csv | 1322 | 1290 |

### Distribution of APN Appearances

Over all quarters listed on main README.md, we count 2383 unique APNs.

The distribution of APNs by how many times they appear in the dataset is:

| Number of APN Occurances | Number of APNs that Occured That Many Times |
|----|-----|
| 1  | 289 |
| 2  | 329 |
| 3  | 203 |
| 4  | 154 |
| 5  | 204 |
| 6  | 210 |
| 7  | 158 |
| 8  | 115 |
| 9  | 134 |
| 10 | 87  |
| 11 | 69  |
| 12 | 78  |
| 13 | 75  |
| 14 | 101 |
| 15 | 75  |
| 16 | 98  |
| 17 | 2   |
| 18 | 1   |
| 27 | 1   |

Glossary
--------

`APN`: Assessor Parcel Number (blocklot, blklot)
`BEST_STATE`: The state of the project at the time the record was submitted. Must be one of the values from the above `Project States` table
`BEST_DATE`: The date the record was submitted, which means the date at which the project entered its current project state.
`Entitlement Status`: 0 = Under Planning Review, -1 = Approved By Planning
`MIPS`: Managerial, Information, Professional Services. (Same as Office?)
`CIE`: Cultural, Institutional, Educational
`PDR`: Production, Distribution, Repair


Other Notes
-----------

The Pipeline Report measures housing production in terms of housing units. Non-residential development, on the other hand, is measured in terms of building square footage.

Columns concerning number of units may be blank for non-residential development, and vice versa.


Data Issues
-----------

### Primary Keys

There is not a strong concept of a primary key in the dataset. That is to say, a unique identifier for a project in the dataset.

APN, or parcel number, can often act a unique identified for a project, but sometimes multiple addresses and thus multiple projects, can correspond to the same APN, as in the example below:

|     | NEIGHBORHOOD | APN         | Entitlement | BESTSTAT | BESTDATE   | NAMEADDR        | Alias | PLN_CASENO | BPAPPLNO       | BP_FORM | UNITS | UNITSNET | AFF | AFFNET | SECTION415 | SEC415_TENURE | SENIOR_HSG | STUDENT_HSG | ADDITIONS | NEWCONSTRUCTION | DEMOLITION | CHANGEOFUSE | COST       | BldgUse           | TOTAL_GSF | NET_GSF | CIE | CIENET | MED | MEDNET | MIPS | MIPSNET | PDR | PDRNET | RET | RETNET | VISIT | VISITNET | HOTELRM | HOTELRMNET | FirstFiled | MULTI | PLN_DESC                                                                                                                                                                                                         | DBI_DESC                                           | PLANNER  | EasternNbrhood | PLN_AREA              | PLN_DISTRICT   | HEIGHT | ZONING_SIM | ZONING_DISTRICT_NAME           | Supervisorial             | Location                           |
|-----|--------------|-------------|-------------|----------|------------|-----------------|-------|------------|----------------|---------|-------|----------|-----|--------|------------|---------------|------------|-------------|-----------|-----------------|------------|-------------|------------|-------------------|-----------|---------|-----|--------|-----|--------|------|---------|-----|--------|-----|--------|-------|----------|---------|------------|------------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|----------|----------------|-----------------------|----------------|--------|------------|--------------------------------|---------------------------|------------------------------------|
| 406 | Bayview      | APN 5336048 | 0           | PL FILED | 08/08/2013 | 1911 QUESADA AV |       | 2009       | 200701171881.0 | 2       | 1     | 1        | 0   | 0      |            |               | 0          | 0           | 0         | 0               | 0          | 0           | $350000.00 | 1 FAMILY DWELLING | 0         | 0       | 0   | 0      | 0   | 0      | 0    | 0       | 0   | 0      | 0   | 0      | 0     | 0        | 0       | 0          | 04/20/2009 | 1     | Construct two new three-story single-family homes on two vacant lots; 4,460 sf on Lot 48 and 6,020 sf on Lot 49, off-street parking for two vehicles (one on each lot); create access easement on City property. | TO ERECT 1 DWELLING UNIT WITH 3 STORY NEW BUILDING | EJARDINE | 0              | Bayview Hunters Point | South Bayshore | 40-X   | RH-1       | RESIDENTIAL- HOUSE, ONE FAMILY | SUPERVISORIAL DISTRICT 10 | (37.73539301820, -122.39559042300) |
| 409 | Bayview      | APN 5336048 | 0           | PL FILED | 08/08/2013 | 1915 QUESADA AV |       | 2009       | 200701171858.0 | 2       | 1     | 1        | 0   | 0      |            |               | 0          | 0           | 0         | 0               | 0          | 0           | $400000.00 | 1 FAMILY DWELLING | 0         | 0       | 0   | 0      | 0   | 0      | 0    | 0       | 0   | 0      | 0   | 0      | 0     | 0        | 0       | 0          | 04/20/2009 | 1     | Construct two new three-story single-family homes on two vacant lots; 4,460 sf on Lot 48 and 6,020 sf on Lot 49, off-street parking for two vehicles (one on each lot); create access easement on City property. | TO ERECT 1 DWELLING UNIT 3 STORY NEW BUILDING      | EJARDINE | 0              | Bayview Hunters Point | South Bayshore | 40-X   | RH-1       | RESIDENTIAL- HOUSE, ONE FAMILY | SUPERVISORIAL DISTRICT 10 | (37.73539301820, -122.39559042300) |

Thus the best primary key we can think of currently is the combination of (`APN`, `address`).
