# import the psycopg2 database adapter for PostgreSQL
from psycopg2 import connect, extensions, sql
import csv

global_conn = None


def make_db_connection(dbname, user, host, password):
    conn = connect(user=user, host=host, password=password)
    # object type: psycopg2.extensions.connection
    print("\ntype(conn):", type(conn))
    return conn


def create_new_db(db_name):
    global_conn.set_isolation_level(extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = global_conn.cursor()

    try:
        # use the sql module to avoid SQL injection attacks
        cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
        print(f'Created: {db_name}')
    except Exception as e:
        print(e)
        pass
    cursor.close()


def create_table(table_name):
    cursor = global_conn.cursor()
    try:
        cursor.execute("CREATE TABLE " + table_name + "(id varchar, " +
                       "BP_date date," +
                       "address varchar," +
                       "best_date date," +
                       "best_status varchar," +
                       "comp_date varchar," +
                       "con_date date," +
                       "dbi_permit date," +
                       "first_date date," +
                       "first_project_recorded_date date," +
                       "first_filed date," +
                       "latest_project_record_date date," +
                       "latest_project_status varchar," +
                       "project_dates text[]," +
                       "project_duration_days real," +
                       "project_statuses text[]," +
                       "report_quarter varchar," +
                       "report_year varchar," +
                       "status int," +
                       "units real," +
                       "unitsnet varchar," +
                       "x_coordinate double precision," +
                       "y_coordinate double precision," +
                       "zoning varchar," +
                       "zoning_simplified varchar" +
                       ")")
        print(f'Created {table_name}')
    except Exception as e:
        print(e)
        pass
    global_conn.commit()


def populate_table(file_name, table_name):
    cursor = global_conn.cursor()

    with open(file_name, "r") as fd:
        csv_reader = csv.reader(fd, delimiter=",")
        count = 0
        next(csv_reader, None)
        for item in csv_reader:
            BP_date = item[1]
            address = item[2]
            apn = item[3]
            best_date = item[4]
            best_status = item[5]
            comp_date = item[6]
            con_date = item[7]
            dbi_permit = item[8]
            first_date = item[9]
            first_project_recorded_date = item[10]
            first_filed = item[11]
            latest_project_record_date = item[12]
            latest_project_status = item[13]
            project_dates = item[14]
            project_duration_days = item[15]
            project_statuses = item[16]
            report_quarter = item[17]
            report_year = item[18]
            status = item[19]
            units = item[20]
            unitsnet = item[21]
            x_coordinate = item[22]
            y_coordinate = item[23]
            zoning = item[24]
            zoning_simplified = item[25]

            print(item)
            postgres_insert_query = """INSERT INTO {} (id, BP_date, address, best_date, best_status, con_date, comp_date, dbi_permit, first_date, first_project_recorded_date,
            first_filed, latest_project_record_date, latest_project_status, project_dates, project_duration_days,
            project_statuses, report_quarter, report_year, status, units, unitsnet, x_coordinate, y_coordinate, zoning,
            zoning_simplified) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""".format(
                table_name)

            id = apn + address.replace(" ", "-")
            record_to_insert = (
                id, BP_date, address, best_date, best_status, comp_date, con_date, dbi_permit, first_date,
                first_project_recorded_date, first_filed, latest_project_record_date, latest_project_status,
                project_dates, project_duration_days, project_statuses, report_quarter, report_year,
                status, units, unitsnet, x_coordinate, y_coordinate, zoning, zoning_simplified
            )
            cursor.execute(postgres_insert_query, record_to_insert)
            # data_arr = item.split(',')
            # print(data_arr)
            count += 1
            if count == 10:
                break


if __name__ == "__main__":
    USER = "RSW"
    HOST = "localhost"
    PASSWORD = ""
    global_conn = make_db_connection(USER, USER, HOST, PASSWORD)

    # create_new_db(DB_NAME)

    TABLE_NAME = "San_Francisco_Housing_Pipeline"
    create_table(TABLE_NAME)

    filename = "../data/cleaned/all_quarters__one_record_per_project.csv"
    populate_table(filename, TABLE_NAME)
    global_conn.close()
