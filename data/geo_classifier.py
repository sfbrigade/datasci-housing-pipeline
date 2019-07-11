import pandas
import logging

from osgeo import ogr


logging.basicConfig(level=logging.INFO)


def load_polygons():
    driver = ogr.GetDriverByName("ESRI Shapefile")
    polyshp = driver.Open("gis/shp/neighborhoods.shp")
    polygon_layer = polyshp.GetLayer(0)
    return list(polygon_layer)


def get_point(x, y):
    point = ogr.Geometry(ogr.wkbPoint)
    logging.debug("Adding point: ({x},{y})".format(x=x, y=y))
    point.AddPoint(y, x)
    return point


def classify_point(point, polygons):
    for polygon in polygons:
        if polygon.GetGeometryRef().Contains(point):
            return polygon.GetField("nhood")
    logging.warning("No polygon found for {}".format(str(point)))
    return "Unknown"


def classify_df(df):
    polygons = load_polygons()
    coords = zip(df.x.tolist(), df.y.tolist())
    return pandas.Series(
        [classify_point(get_point(*coord), polygons) for coord in coords]
    )
