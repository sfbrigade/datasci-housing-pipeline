# Housing Pipeline Analysis
This project is a part of the [Data Science Working Group](http://datascience.codeforsanfrancisco.org) at [Code for San Francisco](http://www.codeforsanfrancisco.org).  Other DSWG projects can be found at the [main GitHub repo](https://github.com/sfbrigade/data-science-wg).

#### Project Status: Active

## Project Intro/Objective

The purpose of this project is to analyze the impact of zoning laws on the development of housing in San Francisco. We use datasets provided by the city of San Francisco to analyze the initiation, progress, and completion of entitlements for the construction of housing. We want to empower policymakers and citizens with the facts and data that help explain the potential impact of housing policy decisions.

See our [Doc](https://docs.google.com/document/d/1giQrnMOPvQSi2tEBPxd4bxzFKbH9m3MZQnB2vrwD4tI/edit) for more info and specific objectives for the project.

### Methods Used
* Inferential Statistics
* Data Visualization
* Predictive Modeling

### Technologies
* Python
* Pandas, jupyter

## Project Description

We focus on utilizing our distinct skillset of data science and the SF Planning Department’s pipeline data to a) develop quantitative facts about the state of the pipeline of planned housing in SF, and b) use predictive methods to model potential impact of policies. The potential impact could take multiple forms, such as in units built, free market price, and affordable unit availability.

### Guiding Principles

- Accessible San Francisco -- We are invested in providing facts that allow other parties, some political, to make data-informed decisions that enable San Francisco to become more inclusive and therefore healthier.
- Science is A-political -- While we do believe in an accessible San Francisco, we are not a policy advocate. Our role is to provide the most rigorous data analysis to define facts, and use sound statistical methods and scientific investigation to predict how those facts may shift given a policy change.
- Correlation is not causation -- Hand-in-hand with being a-political is the responsibility to clearly articulate the findings and limitations of analysis. Most analysis and prediction will only be able to leverage correlative relationships, and will likely be unable to demonstrate causative relationships. Natural experiments that would give us this kind of increased conviction in causative factors are rare.
- Equal Access to Facts -- Our work will be shared through blog format to be accessible to all stakeholders at the same time.
- Open to Everyone -- We are an all-volunteer organization, and our team welcomes all people of all skill bases and backgrounds to join our team. There is always a way for you to contribute!

## Needs of this project

The best place to get started is our list of Issues in Github. We have workstreams spread across these skillsets:

#### Data Scientists
Data modeling and analysis towards a better understanding of housing pipeline changes over time.

#### Python Programmers
Creating data cleanup tools and methods for parsing or scraping new datasets.

#### Econometrists, Economic Modeling
Model market incentives and assumptions, enabling prediction of impact based on changes.

#### Operations
Manage the volunteer network, communicate with stakeholders, and network with new people to learn new needs.

#### Visual Designer
Help create visualizations of facts and predictions with Data Scientists

#### Policy Researcher
Help us understand the policy strategies being discussed and work with the PMs on whether we should investigate them.

#### Marketing
Help us publicize our work and build a stronger community overall.

## The Repo

1. Raw Data is being kept [here](./data/csv) within this repo.
2. Data processing/transformation scripts are being kept [here](./analysis)
3. The [Jupyter notebook](./analysis/summary_analysis_notebook.ipynb) contains prior analyses

## Getting Started

### Quickstart

#### Step 1: Clone the repo
1. Navigate to a folder where you want the project folder to be located
2. Clone the repo with the following command

```sh
git clone git@github.com:sfbrigade/datasci-housing-pipeline.git
```
for help see this [tutorial](https://help.github.com/articles/cloning-a-repository/)).

3. navigate into your newly created project folder
```sh
cd datasci-housing-pipeline
```

#### Step 2: Install Dependencies

We use Pipenv for environment management, follow the installation guides below if you don't have it.

Install all project and development dependencies:
```sh
pipenv install --dev
```

#### Step 2: Enter The Development Shell

```sh
pipenv run python -m ipykernel install --user --name=`pipenv run basename '$VIRTUAL_ENV'`
```

#### Step 3: Open the Notebook

Launch Jupyter and select `datasci-housing-pipeline kernel` in Jupyter.

```sh
jupyter notebook
```

## Installation Guide

### macOS

#### Step 1: Ensure you have Python 3.7 installed

Check your currently installed version of Python 3.

```sh
python3 --version
```

If you don't have Python version 3.7, the Pipfile will not complete installation. Install Python 3 using [Homebrew](https://brew.sh/):

```sh
brew install python3
```
Or, upgrade Python 3 from an earlier dot version (like 3.6) using [Homebrew](https://brew.sh/):
```sh
brew upgrade python3
```

#### Step 2: Install Pipenv using Homebrew

Run this in your terminal:

```sh
brew install pipenv
```

**NOTE:** dependencies will only be available within the `pipenv` virtualenv. Enter the virtualenv with `pipenv shell`, or run a single command with `pipenv run my-cool-command`.

#### Step 3: Install Postgres using Homebrew

Run this in your terminal:

```sh
brew install postgresql
```

Postgres should start automatically. If you run into trouble, refer to [this guide](https://goonan.io/setting-up-postgresql-on-os-x-2/).

### Windows

#### Suggestion: Install a console emulator running on ConEmu

My personal recommendation is [Cmder](http://cmder.net/)

#### Step 1: Install Chocolatey, a package manager for windows

Install [chocolatey](https://chocolatey.org/install)

#### Step 2: Ensure you have Python 3.7 installed

Check your currently installed version of Python.
```sh
python --version
```

If you don't have Python version 3.7, install or upgrade to Python 3 using Chocolatey:
```sh
choco install python
```

#### Step 3: Install Pipenv using pip

Python3 should install pip automatically, but check for updates with the following command:
```sh
python -m pip install -U pip
```

Now install pipenv with a User installation:
```sh
pip install --user pipenv
```

**NOTE:** If pipenv isn't available in your console after installing and running `refreshenv`
you will need to add the user base's binary directory to your PATH. This is relatively simple, read the Yellow Box on [this tutorial page](https://python-docs.readthedocs.io/en/latest/dev/virtualenvs.html#virtualenvironments-ref)

**NOTE 2:** dependencies will only be available within the `pipenv` virtualenv. Enter the virtualenv with `pipenv shell`, or run a single command with `pipenv run my-cool-command`.

#### Step 4: Install Postgres using Chocolatey

Postgres requires a password parameter, so run the following command, with your own password to be assigned to the postgres user:

```sh
choco install postgresql10 --params '/Password:YOURPASSWORDHERE' --params-global
```

Postgres should start automatically. If you run into trouble, refer to the [Postgres website](https://www.postgresql.org/download/windows/).

## Contributing DSWG Members

#### Team Leads (Contacts)
- **[Rocio Ng](https://github.com/rociosng) - @rocio**

##### Previous Leads:
- **[Shantanu Bala](https://github.com/shantanubala) - @Shantanu Bala**
- **[Anders Engnell](https://github.com/DerzYerz) - @Anders Engnell**
- **[Andrew Roberts](https://github.com/ajroberts0417) - @Andrew Roberts**


#### Other Members:

|Name     |  Slack Handle   |
|---------|-----------------|
|[Andrew Roberts](https://https://github.com/ajroberts0417)| @Andrew Roberts        |

## Contact
* If you haven't joined the SF Brigade Slack, [you can do that here](http://c4sf.me/slack).
* Our slack channel is `#datasci-projectname`
* Feel free to contact team leads with any questions or if you are interested in contributing!
