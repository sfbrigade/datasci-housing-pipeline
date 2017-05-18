import csv
import dateutil
import glob
import json
import os
import pandas
import logging
import numpy

import geo_classifier


logging.basicConfig(level=logging.INFO)


def clean_values(data):
    """
    Args
    data: List of python objects

    Returns: pandas.DataFrame
    """
    # load to data frame for convenience
    df = pandas.DataFrame(data)
    return clean_df(df)


def clean_df(df):
    # Standardize best_stat
    df.best_stat = df.best_stat.apply(lambda x: x.strip().upper())

    # Standardize best_date
    df.best_date = df.best_date.apply(maybe_format_date)

    # Standardize APN
    # Some APN values are "APN XXXXXX", some are just "XXXXXXX", standardize this.
    records_with_apn = df.apn.notnull()
    df.apn = df.apn[records_with_apn].apply(lambda x: x.split()[-1])

    # Standardize Lat/Long
    records_with_location_attribute = df.location.notnull()
    df.x[records_with_location_attribute] = df.location[records_with_location_attribute].apply(get_lat_from_glob)
    df.y[records_with_location_attribute] = df.location[records_with_location_attribute].apply(get_long_from_glob)

    records_with_geography_attribute = df.geography.notnull()
    df.x[records_with_geography_attribute] = df.geography[records_with_geography_attribute].apply(get_lat_from_glob)
    df.y[records_with_geography_attribute] = df.geography[records_with_geography_attribute].apply(get_long_from_glob)

    # Get address into separate fields for cases where it is concatenated with the lat,long
    records_with_address_in_location_attribute = df.location.apply(lambda x: not pandas.isnull(x) and '\n' in x)
    df.address[records_with_address_in_location_attribute] = df.location[records_with_address_in_location_attribute].apply(get_address_from_glob)

    # Standardize address by uppercasing and removing punctuation
    df.address = df.address.apply(standardize_address)

    # Classify neighborhoods using point-in-polygon approach
    df['classified_neighborhood'] = geo_classifier.classify_df(df)

    return df


def maybe_format_date(s):
    """
    Use advanced date parsing (python-dateutil) to parse
    the first 10 chars of each line.
    """
    try:
        return dateutil.parser.parse(s.strip()[:10]).strftime("%Y-%m-%d")
    except Exception as e:
        logging.exception("Date formatting failed for {}".format(s))
        return s


def get_coords_tuple_from_address_lat_long_glob(s):
    """
    For some quarters, the address and lat/long tuple are
    in the same column, concatenated together with a newline

    Returns: tuple
    """
    lat_long_tuple = s.split('\n')[-1]
    # Dirty hack, the lat long tuple happens to be valid python syntax so.. YOLO
    return eval(lat_long_tuple)


def get_lat_from_glob(s):
    try:
        return get_coords_tuple_from_address_lat_long_glob(s)[0]
    except Exception as e:
        logging.exception("Lat long glob parsing failed for {}".format(s))
        return numpy.nan


def get_long_from_glob(s):
    try:
        return get_coords_tuple_from_address_lat_long_glob(s)[1]
    except Exception as e:
        logging.exception("Lat long glob parsing failed for {}".format(s))
        return numpy.nan


def get_address_from_glob(s):
    return s.split('\n')[0]


def standardize_address(s):
    return s.upper().replace('.', '').replace(',', '')


def main():
    ################################################################################
    # Allows for a map of column names to be used to convert field names and output
    # the result into a dict object
    #
    def load_csv_with_mapping(csvfile, column_mapping):
        mapped_data = []
        for row in csv.DictReader(csvfile):
            mapped_row = dict((column_mapping[k], v) for k, v in row.items())
            mapped_data.append(mapped_row)
        return mapped_data

    ################################################################################
    # Given a file with the column names, create a list of dictionaries with
    # additional entries for the year and quarter created from the date field to
    # ease future transforms
    #
    # see https://docs.google.com/spreadsheets/d/1ikjaHDLf-iCGBCQ1KmSIXVEiVNbX8pQzW26yYqhrH3U/edit#gid=1633784412
    #
    column_mappings = []
    for mapping_filename in os.listdir('data/raw/columnnames/'):
        with open('data/raw/columnnames/' + mapping_filename, 'r') as mapping_file:
            column_mapping = {}
            column_mapping['year'] = mapping_filename[0:4]
            column_mapping['quarter'] = mapping_filename[5:6]
            for row in csv.DictReader(mapping_file):
                column_mapping[row['key']] = row['value']
            column_mappings.append(column_mapping)


    all_housing_data = pandas.DataFrame()

    ################################################################################
    # Load each file based on filename conventions and apply the column cleaning
    #
    for column_mapping in column_mappings:
        filename = 'San_Francisco_Development_Pipeline_%s_Quarter_%s' % (
            column_mapping['year'],
            column_mapping['quarter'],
        )

        housing_data_csv_filename = 'data/raw/' + filename + '.csv'
        print('loading ' + housing_data_csv_filename)


        with open(housing_data_csv_filename, 'r') as csvfile:
            housing_data = load_csv_with_mapping(csvfile, column_mapping)
            housing_data_json_filename = 'data/cleaned/' + filename + '.json'
            df = pandas.DataFrame(housing_data)
            df['original_data_file'] = housing_data_csv_filename
            df['report_year'] = housing_data_csv_filename.replace(".csv",'').split("_")[4]
            df['report_quarter'] = housing_data_csv_filename.replace(".csv",'').split("_")[6]
            all_housing_data = all_housing_data.append(df, ignore_index=True)
            print('writing ' + housing_data_json_filename)
            df.to_json(housing_data_json_filename, orient='records')
    df = clean_df(all_housing_data)
    df.to_csv("data/cleaned/all_quarters_merged.csv")


if __name__ == '__main__':
    main()
