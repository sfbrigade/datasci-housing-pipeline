##Create a dictionary from the uniq_header_mappings from previous files
def create_dict_object_from_uniq_headers(filename):
    with open(filename, "r") as fd:
        # skips the key,value notation
        uniq_header_dict = {}
        fd.readline()
        for line in fd:
            items = line.split(',')
            uniq_header_dict[items[0].replace("\"", "").replace("\n", "")] = items[1].replace("\n", "")

        return uniq_header_dict


def create_list_of_column_headers(filename):
    new_headers = []
    path = f'./raw/{filename}'
    with open(path, "r") as fd:
        new_headers = fd.readline().split(",")
        # strip the \n from the last header column
        new_headers[-1] = new_headers[-1].replace("\n", "")

    return new_headers


def create_new_unique_header_mappings(headers, unique_headers_dict, filename):
    new_unique_headers = {}
    for item in headers:
        if item not in uniq_headers_dict:
            new_unique_headers[item] = item.lower()

    # if a new item is added to the unique_header_dict, then update the file
    if len(new_unique_headers) > 0:
        with open(filename, "a") as fd:

            for idx in new_unique_headers.keys():
                print(f'Adding new header: {idx}')
                fd.write(f'"{idx}",{new_unique_headers[idx]}\n')


def create_new_columnnames_filename(filename):
    # File names are currently in this format SF_Development_Pipeline_2017_Q1.csv
    # parse filename and create a new filename to this format YYYYQ#.txt
    new_file_arr = filename.split(".")[0].split("_")[-2:]
    return ''.join(new_file_arr) + '.txt'


def create_new_columnnames_file(filename, new_headers, uniq_headers_dict):
    path = f'./raw/columnnames/{filename}'
    with open(path, "w") as fd:
        fd.write(f'key,value\n')
        for item in new_headers:
            fd.write(f'"{item}",{uniq_headers_dict.get(item)}\n')

        print(f'Created file: {filename}')

if __name__ == "__main__":
    uniq_header_mappings_file_name = "./uniq_header_mappings.txt"
    # get a dictionary of unique dict objects
    uniq_headers_dict = create_dict_object_from_uniq_headers(uniq_header_mappings_file_name)

    # new file to parse
    new_csv_to_parse = "San_Francisco_Development_Pipeline_2017_Quarter_3.csv"
    # get all column heads from the file
    new_headers = create_list_of_column_headers(new_csv_to_parse)

    # add a new header mappings to all header mappings
    create_new_unique_header_mappings(new_headers, uniq_headers_dict, uniq_header_mappings_file_name)
    # create a new file  name for the column names
    new_file_name = create_new_columnnames_filename(new_csv_to_parse)

    # create new file for the colunnames
    create_new_columnnames_file(new_file_name, new_headers, uniq_headers_dict)
