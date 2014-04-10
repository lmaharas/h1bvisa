import csv
sectorTypes = []
sectorTypesFreq = {}
cityList = ["lasVegas", "Cambridge", "NYC", "SanFrancisco", "LA","Chicago", "Seattle", "Philadelphia", "Austin", "Houston", "Detroit", "Boston", "Boulder", "Madison", "Portland", "WashingtonDC", "Nashville"]

lasVegas = {"89101", "89102", "89103", "89104", "89106", "89107", "89108", "89109", "89110", "89111", "89112", "89113", "89114", "89115", "89116", "89117", "89118", "89119", "89120", "89121", "89122", "89123", "89124", "89125", "89126", "89127", "89128", "89129", "89130", "89131", "89132", "89133", "89134", "89135", "89137", "89138", "89139", "89141", "89142", "89143", "89144", "89145", "89146", "89147", "89148", "89149", "89150", "89151", "89152", "89153", "89154", "89155", "89156", "89158", "89159", "89160", "89164", "89170", "89173", "89177", "89180", "89185", "89193", "89195", "89199"}
Cambridge = {"02138", "02139", "02140", "02141", "02142", "02238", "02239"}
NYC = {"10001", "10002", "10003", "10004", "10005", "10006", "10007", "10009", "10010", "10011", "10012", "10013", "10014", "10016", "10017", "10018", "10019", "10020", "10021", "10022", "10023", "10024", "10025", "10026", "10027", "10028", "10029", "10030", "10031", "10032", "10033", "10034", "10035", "10036", "10037", "10038", "10039", "10040", "10044", "10065", "10069", "10075", "10103", "10110", "10111", "10112", "10115", "10119", "10128", "10152", "10153", "10154", "10162", "10165", "10167", "10168", "10169", "10170", "10171", "10172", "10173", "10174", "10177", "10199", "10271", "10278", "10279", "10280", "10282", "10301", "10302", "10303", "10304", "10305", "10306", "10307", "10308", "10309", "10310", "10311", "10312", "10314", "10451", "10452", "10453", "10454", "10455", "10456", "10457", "10458", "10459", "10460", "10461", "10462", "10463", "10464", "10465", "10466", "10467", "10468", "10469", "10470", "10471", "10472", "10473", "10474", "10475", "11001", "11003", "11004", "11005", "11040", "11101", "11102", "11103", "11104", "11105", "11106", "11109", "11201", "11203", "11204", "11205", "11206", "11207", "11208", "11209", "11210", "11211", "11212", "11213", "11214", "11215", "11216", "11217", "11218", "11219", "11220", "11221", "11222", "11223", "11224", "11225", "11226", "11228", "11229", "11230", "11231", "11232", "11233", "11234", "11235", "11236", "11237", "11238", "11239", "11351", "11354", "11355", "11356", "11357", "11358", "11359", "11360", "11361", "11362", "11363", "11364", "11365", "11366", "11367", "11368", "11369", "11370", "11371", "11372", "11373", "11374", "11375", "11377", "11378", "11379", "11385", "11411", "11412", "11413", "11414", "11415", "11416", "11417", "11418", "11419", "11420", "11421", "11422", "11423", "11424", "11425", "11426", "11427", "11428", "11429", "11430", "11432", "11433", "11434", "11435", "11436", "11451", "11691", "11692", "11693", "11694", "11697"}
SanFrancisco = {"94101", "94102", "94103", "94104", "94105", "94106", "94107", "94108", "94109", "94110", "94111", "94112", "94114", "94115", "94116", "94117", "94118", "94119", "94120", "94121", "94122", "94123", "94124", "94125", "94126", "94127", "94128", "94129", "94130", "94131", "94132", "94133", "94134", "94135", "94136", "94137", "94138", "94139", "94140", "94141", "94142", "94143", "94144", "94145", "94146", "94147", "94150", "94151", "94152", "94153", "94154", "94155", "94156", "94157", "94159", "94160", "94161", "94162", "94163", "94164", "94165", "94166", "94167", "94168", "94169", "94170", "94171", "94172", "94175", "94177", "94188"}
LA = {"90001", "90002", "90003", "90004", "90005", "90006", "90007", "90008", "90009", "90010", "90011", "90012", "90013", "90014", "90015", "90016", "90017", "90018", "90019", "90020", "90021", "90022", "90023", "90024", "90025", "90026", "90027", "90028", "90029", "90030", "90031", "90032", "90033", "90034", "90035", "90036", "90037", "90038", "90039", "90040", "90041", "90042", "90043", "90044", "90045", "90046", "90047", "90048", "90049", "90050", "90051", "90052", "90053", "90054", "90055", "90056", "90057", "90058", "90059", "90060", "90061", "90062", "90063", "90064", "90065", "90066", "90067", "90068", "90069", "90070", "90071", "90072", "90073", "90074", "90075", "90076", "90077", "90078", "90079", "90080", "90081", "90082", "90083", "90084", "90086", "90087", "90088", "90089", "90091", "90093", "90094", "90095", "90096", "90097", "90099", "90101", "90102", "90103", "90174", "90185"}
Chicago = {"60601", "60602", "60603", "60604", "60605", "60606", "60607", "60608", "60609", "60610", "60611", "60612", "60613", "60614", "60615", "60616", "60617", "60618", "60619", "60620", "60621", "60622", "60623", "60624", "60625", "60626", "60628", "60629", "60630", "60631", "60632", "60633", "60634", "60636", "60637", "60638", "60639", "60640", "60641", "60643", "60644", "60645", "60646", "60647", "60649", "60651", "60652", "60653", "60654", "60655", "60656", "60657", "60659", "60660", "60661", "60663", "60664", "60665", "60667", "60668", "60669", "60670", "60671", "60672", "60673", "60674", "60675", "60677", "60678", "60679", "60680", "60681", "60683", "60684", "60685", "60687", "60690", "60691", "60693", "60694", "60697", "60699", "60701"}
Seattle = {"98060", "98101", "98102", "98103", "98104", "98105", "98106", "98107", "98108", "98109", "98111", "98112", "98114", "98115", "98116", "98117", "98118", "98119", "98121", "98122", "98124", "98125", "98126", "98129", "98130", "98131", "98132", "98133", "98134", "98136", "98138", "98140", "98144", "98145", "98146", "98148", "98150", "98151", "98154", "98155", "98158", "98160", "98161", "98164", "98166", "98168", "98171", "98174", "98177", "98178", "98181", "98184", "98185", "98188", "98190", "98191", "98195", "98198", "98199"}
Philadelphia = {"19019", "19092", "19093", "19099", "19101", "19102", "19103", "19104", "19105", "19106", "19107", "19108", "19109", "19110", "19111", "19112", "19113", "19114", "19115", "19116", "19118", "19119", "19120", "19121", "19122", "19123", "19124", "19125", "19126", "19127", "19128", "19129", "19130", "19131", "19132", "19133", "19134", "19135", "19136", "19137", "19138", "19139", "19140", "19141", "19142", "19143", "19144", "19145", "19146", "19147", "19148", "19149", "19150", "19151", "19152", "19153", "19154", "19155", "19160", "19161", "19162", "19170", "19171", "19172", "19173", "19175", "19177", "19178", "19179", "19181", "19182", "19183", "19184", "19185", "19187", "19188", "19191", "19192", "19193", "19194", "19196", "19197", "19244", "19255"}
Austin = {"73301", "73344", "78701", "78702", "78703", "78704", "78705", "78708", "78709", "78710", "78711", "78712", "78713", "78714", "78715", "78716", "78717", "78718", "78719", "78720", "78721", "78722", "78723", "78724", "78725", "78726", "78727", "78728", "78729", "78730", "78731", "78732", "78733", "78734", "78735", "78736", "78737", "78738", "78739", "78741", "78742", "78744", "78745", "78746", "78747", "78748", "78749", "78750", "78751", "78752", "78753", "78754", "78755", "78756", "78757", "78758", "78759", "78760", "78761", "78762", "78763", "78764", "78765", "78766", "78767", "78768", "78769", "78771", "78772", "78773", "78774", "78778", "78779", "78780", "78781", "78782", "78783", "78785", "78786", "78787", "78788", "78789"}
Houston = {"77001", "77002", "77003", "77004", "77005", "77006", "77007", "77008", "77009", "77010", "77011", "77012", "77013", "77014", "77015", "77016", "77017", "77018", "77019", "77020", "77021", "77022", "77023", "77024", "77025", "77026", "77027", "77028", "77029", "77030", "77031", "77032", "77033", "77034", "77035", "77036", "77037", "77038", "77039", "77040", "77041", "77042", "77043", "77044", "77045", "77046", "77047", "77048", "77049", "77050", "77051", "77052", "77053", "77054", "77055", "77056", "77057", "77058", "77059", "77060", "77061", "77062", "77063", "77064", "77065", "77066", "77067", "77068", "77069", "77070", "77071", "77072", "77073", "77074", "77075", "77076", "77077", "77078", "77079", "77080", "77081", "77082", "77083", "77084", "77085", "77086", "77087", "77088", "77089", "77090", "77091", "77092", "77093", "77094", "77095", "77096", "77097", "77098", "77099", "77201", "77202", "77203", "77204", "77205", "77206", "77207", "77208", "77209", "77210", "77212", "77213", "77215", "77216", "77217", "77218", "77219", "77220", "77221", "77222", "77223", "77224", "77225", "77226", "77227", "77228", "77229", "77230", "77231", "77233", "77234", "77235", "77236", "77237", "77238", "77240", "77241", "77242", "77243", "77244", "77245", "77248", "77249", "77251", "77252", "77253", "77254", "77255", "77256", "77257", "77258", "77259", "77261", "77262", "77263", "77265", "77266", "77267", "77268", "77269", "77270", "77271", "77272", "77273", "77274", "77275", "77277", "77279", "77280", "77281", "77282", "77284", "77287", "77288", "77289", "77290", "77291", "77292", "77293", "77297", "77298", "77299"}
Detroit = {"48201", "48202", "48204", "48205", "48206", "48207", "48208", "48209", "48210", "48211", "48213", "48214", "48215", "48216", "48217", "48219", "48221", "48222", "48223", "48224", "48226", "48227", "48228", "48231", "48232", "48233", "48234", "48235", "48238", "48242", "48243", "48244", "48254", "48255", "48258", "48260", "48264", "48265", "48266", "48267", "48268", "48269", "48272", "48274", "48275", "48277", "48278", "48279", "48288", "48295", "48297", "48299"}
Boston = {"02101", "02102", "02103", "02104", "02105", "02106", "02107", "02108", "02109", "02110", "02111", "02112", "02113", "02114", "02115", "02116", "02117", "02118", "02119", "02120", "02121", "02122", "02123", "02124", "02125", "02127", "02128", "02133", "02163", "02196", "02199", "02201", "02202", "02203", "02204", "02205", "02206", "02207", "02208", "02209", "02210", "02211", "02212", "02215", "02216", "02217", "02222", "02241", "02266", "02283", "02284", "02293", "02295", "02297"}
Boulder = {"80301", "80302", "80303", "80304", "80306", "80307", "80308", "80309", "80310", "80314", "80321", "80322", "80323", "80328", "80329"}
Madison = {"53701", "53702", "53703", "53704", "53705", "53706", "53707", "53708", "53709", "53710", "53711", "53713", "53714", "53715", "53716", "53717", "53718", "53719", "53725", "53726", "53744", "53777", "53778", "53779", "53780", "53782", "53783", "53784", "53785", "53786", "53787", "53788", "53789", "53790", "53791", "53792", "53793", "53794"}
Portland = {"97201", "97202", "97203", "97204", "97205", "97206", "97207", "97208", "97209", "97210", "97211", "97212", "97213", "97214", "97215", "97216", "97217", "97218", "97219", "97220", "97221", "97222", "97223", "97224", "97225", "97227", "97228", "97229", "97230", "97231", "97232", "97233", "97236", "97238", "97240", "97242", "97251", "97253", "97254", "97255", "97256", "97258", "97259", "97266", "97267", "97268", "97269", "97271", "97272", "97280", "97281", "97282", "97283", "97286", "97290", "97291", "97292", "97293", "97294", "97296", "97298", "97299"}
WashingtonDC = {"20001", "20002", "20003", "20004", "20005", "20006", "20007", "20008", "20009", "20010", "20011", "20012", "20013", "20015", "20016", "20017", "20018", "20019", "20020", "20024", "20026", "20029", "20030", "20032", "20033", "20035", "20036", "20037", "20038", "20039", "20040", "20041", "20042", "20043", "20044", "20045", "20046", "20047", "20049", "20050", "20051", "20052", "20053", "20055", "20056", "20057", "20058", "20059", "20060", "20061", "20062", "20063", "20064", "20065", "20066", "20067", "20068", "20069", "20070", "20071", "20073", "20074", "20075", "20076", "20077", "20078", "20080", "20081", "20082", "20088", "20090", "20091", "20097", "20098", "20099", "20201", "20202", "20203", "20204", "20206", "20207", "20208", "20210", "20211", "20212", "20213", "20214", "20215", "20216", "20217", "20218", "20219", "20220", "20221", "20222", "20223", "20224", "20226", "20227", "20228", "20229", "20230", "20231", "20232", "20233", "20235", "20238", "20239", "20240", "20241", "20242", "20244", "20245", "20250", "20251", "20254", "20260", "20261", "20262", "20265", "20266", "20268", "20270", "20277", "20289", "20299", "20301", "20303", "20306", "20307", "20310", "20314", "20315", "20317", "20318", "20319", "20330", "20332", "20336", "20337", "20338", "20340", "20350", "20370", "20372", "20373", "20374", "20375", "20380", "20388", "20389", "20390", "20391", "20392", "20393", "20394", "20395", "20398", "20401", "20402", "20403", "20404", "20405", "20406", "20407", "20408", "20409", "20410", "20411", "20412", "20413", "20414", "20415", "20416", "20418", "20419", "20420", "20421", "20422", "20423", "20424", "20425", "20426", "20427", "20428", "20429", "20431", "20433", "20434", "20435", "20436", "20437", "20439", "20440", "20441", "20442", "20444", "20447", "20451", "20453", "20456", "20460", "20463", "20468", "20469", "20470", "20472", "20501", "20502", "20503", "20504", "20505", "20506", "20507", "20508", "20510", "20515", "20520", "20521", "20522", "20523", "20524", "20525", "20526", "20527", "20530", "20531", "20532", "20533", "20534", "20535", "20536", "20537", "20538", "20539", "20540", "20541", "20542", "20543", "20544", "20546", "20547", "20548", "20549", "20550", "20551", "20552", "20553", "20554", "20555", "20557", "20558", "20559", "20560", "20565", "20566", "20570", "20571", "20572", "20573", "20575", "20576", "20577", "20578", "20579", "20580", "20581", "20585", "20586", "20590", "20591", "20593", "20594", "20597", "20599"}
Nashville = {"37013", "37072", "37076", "37080", "37115", "37138", "37189", "37201", "37203", "37204", "37205", "37206", "37207", "37208", "37209", "37210", "37211", "37212", "37213", "37214", "37216", "37217", "37218", "37219", "37221"}
currentCity = Houston
##make an array of the column you want
with open('data/enigma-us-gov-dol-oflc-perm-2013-7c9e491f106ea40e1d668263cb6815d4.csv', 'rb') as csvfile:
        spamreader = csv.reader(csvfile)
        coordinates = []
        for row in spamreader:
           ## print row
            sectorType = row[12]
            caseStatus = row[2][0:9]
            employerPostal = row[9]
            employerName = row[4]
            jobTitle = row[17]
            originCountry = row[-3]
            #if employerPostal in currentCity:
            print [sectorType, caseStatus, employerPostal, employerName, jobTitle, originCountry]
                
     #   print "total: "+str(len(sectorTypes))

## make a dictionary of frequency of occurence in that column
#for i in  sectorTypes:
 #   sectorTypesFreq[i] = sectorTypesFreq.get(i, 0)+1

#print sectorTypesFreq
