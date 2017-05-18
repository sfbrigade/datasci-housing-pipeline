import json
import pandas

# Load cleaned data and select only the needed columns: 
# parcel number ("apn"), project status("best_stat"), and project status update date ("best_date")
df = pandas.read_csv("data/cleaned/all_quarters_merged.csv")[["apn", "best_stat", "best_date"]]

# Convert strings to datetime.
df['best_date'] = pandas.to_datetime(df['best_date'])

# Group by APN
gb = df.groupby("apn")

# Determine which APNs look like they actually reached the construction stage
is_constructed = gb['best_stat'].apply(list).apply(lambda x: 'CONSTRUCTION' in x and len(x) > 1)

# For the APNs that look like they reached construction phase, get the difference
# between the first and last dates that APN appeared in the pipeline.
times = gb['best_date'].apply(list)[is_constructed].apply(lambda x: max(x) - min(x))
print(times.describe())
