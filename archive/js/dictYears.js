var dictYears = [
{'2016Q1':'affordable', '2015Q4':'affordable', '2015Q3':'affordable', '2015Q2':'affordable','2015Q1':'aff', '2014Q3':null},
{'2016Q1':'affordable_net', '2015Q4':'affordab_1', '2015Q3':'affordablenet', '2015Q2':'affordablenet','2015Q1':'affnet', '2014Q3':null},
{'2016Q1':'alias', '2015Q4':'alias', '2015Q3':'alias', '2015Q2':'alias','2015Q1':'alias', '2014Q3':null},
{'2016Q1':'apn', '2015Q4':'apn', '2015Q3':'apn', '2015Q2':'apn','2015Q1':'blklot', '2014Q3':'block_lot'},
{'2016Q1':'bestdate', '2015Q4':'bestdate', '2015Q3':'bestdate', '2015Q2':'bestdate','2015Q1':'bestdate', '2014Q3':'best_date'},
{'2016Q1':'beststat', '2015Q4':'beststat', '2015Q3':'beststat', '2015Q2':'beststat','2015Q1':'beststat', '2014Q3':'best_stat'},
{'2016Q1':'bpapplno', '2015Q4':'bpapplno', '2015Q3':'bpapplno', '2015Q2':'bpapplno','2015Q1':'bpapplno', '2014Q3':'dbi_permit'},
{'2016Q1':'caseno', '2015Q4':'caseno', '2015Q3':'caseno', '2015Q2':'caseno','2015Q1':'caseno', '2014Q3':'planning_id'},
{'2016Q1':'cie_proposed', '2015Q4':'cie', '2015Q3':'cie', '2015Q2':'cie','2015Q1':'cie', '2014Q3':'cult_inst_educ'},
{'2016Q1':'cie_net', '2015Q4':'cienet', '2015Q3':'cienet', '2015Q2':'cienet','2015Q1':'cienet', '2014Q3':'net_cult_inst_educ'},
{'2016Q1':'contact', '2015Q4':'contact', '2015Q3':'contact', '2015Q2':'contact','2015Q1':'contact', '2014Q3':'fullname'},
{'2016Q1':'contactph', '2015Q4':'contactph', '2015Q3':'contactph', '2015Q2':'contactph','2015Q1':'contactph', '2014Q3':'contactphone'},
{'2016Q1':'dbidesc', '2015Q4':'dbidesc', '2015Q3':'dbidesc', '2015Q2':'dbidesc','2015Q1':'dbidesc', '2014Q3':'dbi_project_description'},
{'2016Q1':'district', '2015Q4':'district', '2015Q3':'plandistrict', '2015Q2':'plndistrict','2015Q1':'district', '2014Q3':'planningdistrictscombo'},
{'2016Q1':'entitlementstatus', '2015Q4':'entitled', '2015Q3':'entitled', '2015Q2':'entitlementstatus','2015Q1':'entitlement', '2014Q3':'entitlementstatus'},
{'2016Q1':'firstfiled', '2015Q4':'firstfiled', '2015Q3':'firstfiled', '2015Q2':'filedate','2015Q1':'filedate', '2014Q3':'firstfiled'},
{'2016Q1':'location', '2015Q4':'geography', '2015Q3':'location', '2015Q2':'geography','2015Q1':'geography', '2014Q3':'location_1'},
{'2016Q1':'heightlimit', '2015Q4':'height', '2015Q3':'height', '2015Q2':'height_lim','2015Q1':'height', '2014Q3':'heightlimit'},
{'2016Q1':'industrial_proposed', '2015Q4':'pdr', '2015Q3':'pdr', '2015Q2':'pdr','2015Q1':'pdr', '2014Q3':'prod_dist_rep'},
{'2016Q1':'industrial_net', '2015Q4':'pdrnet', '2015Q3':'pdrnet', '2015Q2':'pdrnet','2015Q1':'pdrnet', '2014Q3':'net_prod_dist_rep'},
{'2016Q1':'landuse', '2015Q4':'landuse', '2015Q3':'landuse', '2015Q2':'landuse','2015Q1':'landuse', '2014Q3':'landuse'},
{'2016Q1':'medical_net', '2015Q4':'mednet', '2015Q3':'mednet', '2015Q2':'med','2015Q1':'med', '2014Q3':'net_medical'},
{'2016Q1':'medical_proposed', '2015Q4':'med', '2015Q3':'med', '2015Q2':'mednet','2015Q1':'mednet', '2014Q3':'medical'},
{'2016Q1':'nameaddr', '2015Q4':'nameaddr', '2015Q3':'nameaddr', '2015Q2':'nameaddr','2015Q1':'nameaddr', '2014Q3':null},
{'2016Q1':'neighborhood', '2015Q4':'neighborhood', '2015Q3':'neighborhood', '2015Q2':'neighborhood','2015Q1':'neighborhood', '2014Q3':'planning_neighborhood'},
{'2016Q1':'office_net', '2015Q4':'mipsnet', '2015Q3':'mipsnet', '2015Q2':'mipsnet','2015Q1':'mipsnet', '2014Q3':'net_office'},
{'2016Q1':'office_proposed', '2015Q4':'mips', '2015Q3':'mips', '2015Q2':'mips','2015Q1':'mips', '2014Q3':'office'},
{'2016Q1':'planarea', '2015Q4':'planarea', '2015Q3':'planarea', '2015Q2':'planarea','2015Q1':null, '2014Q3':null},
{'2016Q1':'planner', '2015Q4':'planner', '2015Q3':'planner', '2015Q2':'planner','2015Q1':'planner', '2014Q3':null},
{'2016Q1':'plndesc', '2015Q4':'descript', '2015Q3':'plndesc', '2015Q2':'descript','2015Q1':'descript', '2014Q3':null},
{'2016Q1':'propuse', '2015Q4':'propuse', '2015Q3':'propuse', '2015Q2':'propuse','2015Q1':'propuse', '2014Q3':null},
{'2016Q1':'retailcomm_net', '2015Q4':'retnet', '2015Q3':'retnet', '2015Q2':'retnet','2015Q1':'retnet', '2014Q3':'net_ret_ent'},
{'2016Q1':'retailcomm_proposed', '2015Q4':'ret', '2015Q3':'ret', '2015Q2':'ret','2015Q1':'ret', '2014Q3':'ret_ent'},
{'2016Q1':'sponsor', '2015Q4':'sponsor', '2015Q3':'sponsor', '2015Q2':'sponsor','2015Q1':'sponsor', '2014Q3':'sponsor_name'},
{'2016Q1':'supdist', '2015Q4':'supdist', '2015Q3':'supedist', '2015Q2':'dname','2015Q1':'supdist', '2014Q3':null},
{'2016Q1':'units', '2015Q4':'units', '2015Q3':'units', '2015Q2':'units','2015Q1':'units', '2014Q3':'units'},
{'2016Q1':'unitsnet', '2015Q4':'unitsnet', '2015Q3':'unitsnet', '2015Q2':'unitsnet','2015Q1':'unitsnet', '2014Q3':'net_added_units'},
{'2016Q1':'visitor_net', '2015Q4':'visitnet', '2015Q3':'visitnet', '2015Q2':'visitnet','2015Q1':'visitnet', '2014Q3':'net_visitor'},
{'2016Q1':'visitor_proposed', '2015Q4':'visit', '2015Q3':'visit', '2015Q2':'visit','2015Q1':'visit', '2014Q3':'visitor'},
{'2016Q1':'zoning', '2015Q4':'zoning_sim', '2015Q3':'zoning_sim', '2015Q2':'zoning_sim','2015Q1':'zoning_sim', '2014Q3':'zoning_simplified'},
{'2016Q1':'districtname', '2015Q4':'districtname', '2015Q3':'zonename', '2015Q2':'districtname','2015Q1':'districtname', '2014Q3':null}
]









































