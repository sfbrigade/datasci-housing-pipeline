from psycopg2 import connect, extensions, sql
import csv

# global db connection
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
        cursor.execute("CREATE TABLE " + table_name +
                       "(id varchar PRIMARY KEY, " +
                       "BP_date date," +
                       "address varchar," +
                       "best_date date," +
                       "best_status varchar," +
                       "comp_date varchar," +
                       "con_date date," +
                       "dbi_permit varchar," +
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
                       "status varchar," +
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
        total_inserted = 0
        invalid_character = ''
        next(csv_reader, None)
        for item in csv_reader:
            BP_date = item[1] if item[1] is not invalid_character else None
            address = item[2] if item[2] is not invalid_character else None
            apn = item[3] if item[3] is not invalid_character else None
            best_date = item[4] if item[4] is not invalid_character else None
            best_status = item[5] if item[5] is not invalid_character else None
            comp_date = item[6] if item[6] is not invalid_character else None
            con_date = item[7] if item[7] is not invalid_character else None
            dbi_permit = item[8] if item[8] is not invalid_character else None
            first_date = item[9] if item[9] is not invalid_character else None
            first_project_recorded_date = item[10] if item[10] is not invalid_character else None
            first_filed = item[11] if item[11] is not invalid_character else None
            latest_project_record_date = item[12] if item[12] is not invalid_character else None
            latest_project_status = item[13] if item[13] is not invalid_character else None
            project_dates = item[14] if item[14] is not invalid_character else None
            if project_dates:
                # Formatting issues from the cleaner.ipynb file, so cleaning them up here
                project_dates = project_dates.replace("(", "{").replace(")", "}")
                if project_dates[-2] == ",":
                    project_dates = project_dates[:-3] + project_dates[-1:]
                if project_dates[-2] != "\'":
                    project_dates = project_dates[:-1] + "\'" + project_dates[-1:]
            project_duration_days = item[15] if item[15] is not invalid_character else None
            project_statuses = item[16] if item[16] is not invalid_character else None
            if project_statuses:
                # Formatting issues from the cleaner.ipynb file, so cleaning them up here
                if project_statuses[-2] == ",":
                    project_statuses = project_statuses[:-3] + project_statuses[-1:]
                if project_statuses[-2] != "\'":
                    project_statuses = project_statuses[:-1] + "\'" + project_statuses[-1:]
                project_statuses = project_statuses.replace("(", "{").replace(")", "}").replace("\'", "")
            report_quarter = item[17] if item[17] is not invalid_character else None
            report_year = item[18] if item[18] is not invalid_character else None
            status = item[19] if item[19] is not invalid_character else None
            units = item[20] if item[20] is not invalid_character else None
            unitsnet = item[21] if item[21] is not invalid_character else None
            x_coordinate = item[22] if item[22] is not invalid_character else None
            y_coordinate = item[23] if item[23] is not invalid_character else None
            zoning = item[24] if item[24] is not invalid_character else None
            zoning_simplified = item[25] if item[25] is not invalid_character else None

            postgres_insert_query = """INSERT INTO {} (id,BP_date, address, best_date, best_status, con_date, comp_date, dbi_permit, first_date, first_project_recorded_date,
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
            cursor = global_conn.cursor()
            try:
                cursor.execute(postgres_insert_query, record_to_insert)
                total_inserted += 1
            except Exception as e:
                # print(item)
                global_conn.rollback()
                print(e)

            count += 1

        global_conn.commit()
        print(f'{total_inserted}/{count} item were inserted into the table')


if __name__ == "__main__":
    USER = "ENTER_USER_HERE"
    HOST = "ENTER_HOST_HERE" #if running locally, enter: localhost
    PASSWORD = "ENTER_PASSWORD_HERE"
    global_conn = make_db_connection(USER, USER, HOST, PASSWORD)

    # create_new_db(DB_NAME)

    TABLE_NAME = "San_Francisco_Housing_Pipeline"
    create_table(TABLE_NAME)

    filename = "../data/cleaned/all_quarters__one_record_per_project.csv"
    populate_table(filename, TABLE_NAME)
    global_conn.close()
