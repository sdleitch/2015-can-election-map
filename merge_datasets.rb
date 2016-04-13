require 'json'

districts = JSON.parse(File.read('FED_CA_2_1_en_small_WGS84.geojson')) # turn into Hash districts
results = JSON.parse(File.read('election-result.json')) # turn into Array results

fednum = 10001

results.each do |result|
  dist = districts['features'].select { |district| district['properties']['FEDNUM'] == result[0] }
  dist = dist[0]
  if result[2] == 'validated' && result[0] == dist['properties']['FEDNUM']
    dist['results'] = [] if dist['results'] == nil
    dist['results'] << result[3..-3]
  end
end

File.open("full-data.json","w") do |f|
  f.write("var districts = " + districts.to_json)
end
