export type CountryCode = "DE" | "ES" | "US" | "CA" | "AU" | "UK";
export type CourtSurface = "indoor" | "outdoor" | "both";

export type PickleballCourt = {
  id: string;
  country: CountryCode;
  city: string;
  region: string;
  name: string;
  surface: CourtSurface;
  notes: string;
  guideUrl?: string;
};

function de(
  id: string,
  city: string,
  region: string,
  name: string,
  surface: CourtSurface,
  notes: string,
): PickleballCourt {
  return {
    id,
    country: "DE",
    city,
    region,
    name,
    surface,
    notes,
    guideUrl: "https://pickleballdeutch.com/",
  };
}

function hub(
  country: CountryCode,
  id: string,
  city: string,
  region: string,
  name: string,
  surface: CourtSurface,
  notes: string,
): PickleballCourt {
  return { id, country, city, region, name, surface, notes };
}

/** Curated metro hubs — not a complete national directory. Expandable. */
export const pickleballCourts: PickleballCourt[] = [
  // Germany
  de("de-berlin", "Berlin", "Berlin", "Berlin pickleball spots", "both", "Growing metro scene — indoor clubs + outdoor public courts."),
  de("de-hamburg", "Hamburg", "Hamburg", "Hamburg courts", "both", "Northern hub with club and open-play options."),
  de("de-munich", "Munich", "Bavaria", "München courts", "both", "Strong Bavarian scene; check club schedules for open play."),
  de("de-cologne", "Cologne", "North Rhine-Westphalia", "Köln courts", "indoor", "NRW cluster — indoor-friendly year-round options."),
  de("de-frankfurt", "Frankfurt", "Hesse", "Frankfurt courts", "both", "Rhine-Main area; mix of clubs and shared sports halls."),
  de("de-stuttgart", "Stuttgart", "Baden-Württemberg", "Stuttgart courts", "both", "Southwest Germany coverage via city guides."),
  de("de-duesseldorf", "Düsseldorf", "North Rhine-Westphalia", "Düsseldorf courts", "indoor", "NRW metro — verify hall bookings for peak hours."),
  de("de-leipzig", "Leipzig", "Saxony", "Leipzig courts", "both", "Eastern Germany growth market."),
  de("de-dresden", "Dresden", "Saxony", "Dresden courts", "outdoor", "Seasonal outdoor play more common — confirm winter options."),
  de("de-hannover", "Hannover", "Lower Saxony", "Hannover courts", "both", "Central North coverage."),
  de("de-nuremberg", "Nuremberg", "Bavaria", "Nürnberg courts", "both", "Franconia / Bavaria secondary hub."),
  de("de-bremen", "Bremen", "Bremen", "Bremen courts", "indoor", "Compact city scene — check club open play."),
  de("de-dortmund", "Dortmund", "North Rhine-Westphalia", "Dortmund courts", "indoor", "Ruhr area cluster with nearby cities."),
  de("de-essen", "Essen", "North Rhine-Westphalia", "Essen courts", "indoor", "Ruhr coverage — pair with Düsseldorf/Cologne guides."),
  de("de-freiburg", "Freiburg", "Baden-Württemberg", "Freiburg courts", "outdoor", "Southwest outdoor-friendly climate."),
  de("de-heidelberg", "Heidelberg", "Baden-Württemberg", "Heidelberg courts", "both", "Rhein-Neckar region."),
  de("de-mannheim", "Mannheim", "Baden-Württemberg", "Mannheim courts", "both", "Near Heidelberg — shared regional scene."),
  de("de-augsburg", "Augsburg", "Bavaria", "Augsburg courts", "both", "Bavaria secondary market near Munich."),
  de("de-karlsruhe", "Karlsruhe", "Baden-Württemberg", "Karlsruhe courts", "both", "Southwest corridor coverage."),
  de("de-bonn", "Bonn", "North Rhine-Westphalia", "Bonn courts", "indoor", "Near Cologne — check joint open-play listings."),

  // Spain
  hub("ES", "es-madrid", "Madrid", "Comunidad de Madrid", "Madrid pickleball hubs", "both", "Capital scene — clubs + multi-sport facilities."),
  hub("ES", "es-barcelona", "Barcelona", "Cataluña", "Barcelona courts", "both", "Strong coastal metro with indoor and outdoor options."),
  hub("ES", "es-valencia", "Valencia", "Comunidad Valenciana", "Valencia courts", "outdoor", "Mediterranean climate favors outdoor play."),
  hub("ES", "es-malaga", "Málaga", "Andalucía", "Costa del Sol courts", "outdoor", "Growing expat + local scene along the coast."),
  hub("ES", "es-sevilla", "Sevilla", "Andalucía", "Sevilla courts", "both", "Andalusian hub — confirm summer heat schedules."),
  hub("ES", "es-alicante", "Alicante", "Comunidad Valenciana", "Alicante / Costa Blanca", "outdoor", "Popular with year-round outdoor players."),
  hub("ES", "es-bilbao", "Bilbao", "País Vasco", "Bilbao courts", "indoor", "Northern Spain — indoor options matter in wet months."),
  hub("ES", "es-zaragoza", "Zaragoza", "Aragón", "Zaragoza courts", "both", "Central corridor growth market."),
  hub("ES", "es-murcia", "Murcia", "Región de Murcia", "Murcia courts", "outdoor", "Warm climate outdoor play."),
  hub("ES", "es-palma", "Palma", "Islas Baleares", "Mallorca courts", "outdoor", "Island tourism + local clubs."),
  hub("ES", "es-laspalmas", "Las Palmas", "Canarias", "Gran Canaria courts", "outdoor", "Year-round outdoor season."),
  hub("ES", "es-tenerife", "Santa Cruz de Tenerife", "Canarias", "Tenerife courts", "outdoor", "Canary Islands scene for locals and visitors."),
  hub("ES", "es-granada", "Granada", "Andalucía", "Granada courts", "both", "Andalucía inland secondary hub."),
  hub("ES", "es-cordoba", "Córdoba", "Andalucía", "Córdoba courts", "outdoor", "Seasonal outdoor — avoid peak midday heat."),
  hub("ES", "es-vigo", "Vigo", "Galicia", "Vigo courts", "indoor", "Northwest Spain — prefer indoor in wet season."),

  // USA
  hub("US", "us-phoenix", "Phoenix", "Arizona", "Phoenix metro courts", "outdoor", "Major US desert hub with dense outdoor inventory."),
  hub("US", "us-naples", "Naples", "Florida", "Southwest Florida courts", "outdoor", "Strong retiree + open-play culture."),
  hub("US", "us-miami", "Miami", "Florida", "Miami-Dade courts", "both", "Urban Florida mix of clubs and parks."),
  hub("US", "us-orlando", "Orlando", "Florida", "Central Florida courts", "outdoor", "Tourism corridor with public park courts."),
  hub("US", "us-austin", "Austin", "Texas", "Austin courts", "both", "Fast-growing Texas metro scene."),
  hub("US", "us-dallas", "Dallas", "Texas", "DFW courts", "both", "Large metro — clubs and HOA/community courts."),
  hub("US", "us-houston", "Houston", "Texas", "Houston courts", "both", "Indoor options help in humid summers."),
  hub("US", "us-sandiego", "San Diego", "California", "San Diego courts", "outdoor", "Year-round outdoor SoCal play."),
  hub("US", "us-losangeles", "Los Angeles", "California", "LA metro courts", "both", "Spread-out metro — check neighborhood parks/clubs."),
  hub("US", "us-seattle", "Seattle", "Washington", "Seattle courts", "indoor", "Pacific Northwest — indoor capacity matters."),
  hub("US", "us-denver", "Denver", "Colorado", "Denver / Front Range", "both", "Altitude + outdoor season; indoor for winter."),
  hub("US", "us-chicago", "Chicago", "Illinois", "Chicago courts", "indoor", "Midwest metro — indoor clubs dominate winters."),
  hub("US", "us-nyc", "New York", "New York", "NYC metro courts", "both", "Parks + clubs across boroughs and suburbs."),
  hub("US", "us-atlanta", "Atlanta", "Georgia", "Atlanta courts", "both", "Southeast growth hub."),
  hub("US", "us-minneapolis", "Minneapolis", "Minnesota", "Twin Cities courts", "indoor", "Cold winters push play indoors."),
  hub("US", "us-vegas", "Las Vegas", "Nevada", "Las Vegas courts", "outdoor", "Desert outdoor season with evening play."),

  // Canada
  hub("CA", "ca-toronto", "Toronto", "Ontario", "GTA courts", "both", "Largest Canadian metro scene."),
  hub("CA", "ca-vancouver", "Vancouver", "British Columbia", "Metro Vancouver courts", "both", "West Coast outdoor season + indoor clubs."),
  hub("CA", "ca-calgary", "Calgary", "Alberta", "Calgary courts", "indoor", "Prairie winters favor indoor facilities."),
  hub("CA", "ca-edmonton", "Edmonton", "Alberta", "Edmonton courts", "indoor", "Indoor-heavy season."),
  hub("CA", "ca-ottawa", "Ottawa", "Ontario", "Ottawa courts", "both", "Capital region clubs and community centres."),
  hub("CA", "ca-montreal", "Montreal", "Quebec", "Montréal courts", "both", "Bilingual metro — check club language/schedules."),
  hub("CA", "ca-victoria", "Victoria", "British Columbia", "Victoria courts", "outdoor", "Milder BC climate for outdoor play."),
  hub("CA", "ca-winnipeg", "Winnipeg", "Manitoba", "Winnipeg courts", "indoor", "Prairie indoor focus."),
  hub("CA", "ca-halifax", "Halifax", "Nova Scotia", "Halifax courts", "indoor", "Atlantic Canada hub."),
  hub("CA", "ca-hamilton", "Hamilton", "Ontario", "Hamilton courts", "both", "Southern Ontario secondary market."),
  hub("CA", "ca-kelowna", "Kelowna", "British Columbia", "Okanagan courts", "outdoor", "Interior BC outdoor season."),
  hub("CA", "ca-quebec", "Quebec City", "Quebec", "Québec courts", "indoor", "Indoor options for long winters."),

  // Australia
  hub("AU", "au-sydney", "Sydney", "New South Wales", "Sydney courts", "both", "Largest AU metro — clubs and council courts."),
  hub("AU", "au-melbourne", "Melbourne", "Victoria", "Melbourne courts", "both", "Strong Victorian club scene."),
  hub("AU", "au-brisbane", "Brisbane", "Queensland", "Brisbane / SEQ courts", "outdoor", "Warm climate outdoor play."),
  hub("AU", "au-perth", "Perth", "Western Australia", "Perth courts", "outdoor", "Isolated but active WA scene."),
  hub("AU", "au-adelaide", "Adelaide", "South Australia", "Adelaide courts", "both", "SA capital hub."),
  hub("AU", "au-goldcoast", "Gold Coast", "Queensland", "Gold Coast courts", "outdoor", "Tourism + local outdoor inventory."),
  hub("AU", "au-canberra", "Canberra", "ACT", "Canberra courts", "both", "Capital territory clubs."),
  hub("AU", "au-hobart", "Hobart", "Tasmania", "Hobart courts", "both", "Tasmanian hub — cooler outdoor season."),
  hub("AU", "au-newcastle", "Newcastle", "New South Wales", "Newcastle courts", "outdoor", "NSW regional coastal scene."),
  hub("AU", "au-geelong", "Geelong", "Victoria", "Geelong courts", "both", "Near Melbourne secondary market."),
  hub("AU", "au-cairns", "Cairns", "Queensland", "Cairns courts", "outdoor", "Tropical north — early/late play for heat."),
  hub("AU", "au-darwin", "Darwin", "Northern Territory", "Darwin courts", "outdoor", "NT hub — wet season indoor alternatives matter."),

  // United Kingdom
  hub("UK", "uk-london", "London", "England", "London courts", "both", "Largest UK hub — clubs and leisure centres."),
  hub("UK", "uk-manchester", "Manchester", "England", "Manchester courts", "indoor", "Northwest England indoor-friendly options."),
  hub("UK", "uk-birmingham", "Birmingham", "England", "Birmingham courts", "indoor", "Midlands metro scene."),
  hub("UK", "uk-bristol", "Bristol", "England", "Bristol courts", "both", "Southwest England hub."),
  hub("UK", "uk-leeds", "Leeds", "England", "Leeds courts", "indoor", "Yorkshire metro."),
  hub("UK", "uk-edinburgh", "Edinburgh", "Scotland", "Edinburgh courts", "indoor", "Scottish capital — indoor capacity matters."),
  hub("UK", "uk-glasgow", "Glasgow", "Scotland", "Glasgow courts", "indoor", "West Scotland hub."),
  hub("UK", "uk-cardiff", "Cardiff", "Wales", "Cardiff courts", "both", "Welsh capital scene."),
  hub("UK", "uk-belfast", "Belfast", "Northern Ireland", "Belfast courts", "indoor", "NI hub — confirm leisure centre bookings."),
  hub("UK", "uk-brighton", "Brighton", "England", "Brighton courts", "both", "South coast secondary market."),
  hub("UK", "uk-liverpool", "Liverpool", "England", "Liverpool courts", "indoor", "Northwest cluster near Manchester."),
  hub("UK", "uk-newcastle", "Newcastle", "England", "Newcastle courts", "indoor", "Northeast England hub."),
  hub("UK", "uk-oxford", "Oxford", "England", "Oxford courts", "both", "South England secondary hub."),
  hub("UK", "uk-cambridge", "Cambridge", "England", "Cambridge courts", "both", "East of England club scene."),
];

export function courtsByCountry(country: CountryCode) {
  return pickleballCourts.filter((c) => c.country === country);
}

export function regionsForCountry(country: CountryCode) {
  return [...new Set(courtsByCountry(country).map((c) => c.region))].sort();
}

/** @deprecated use regionsForCountry("DE") */
export const germanStates = regionsForCountry("DE");
