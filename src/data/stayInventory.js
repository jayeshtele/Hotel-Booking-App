const cityImagePools = {
  Goa: [
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  ],
  Udaipur: [
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=900&q=80',
  ],
  Manali: [
    'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=80',
  ],
  'New York': [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  ],
  Oia: [
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=900&q=80',
  ],
  Kyoto: [
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80',
  ],
  Merzouga: [
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
  ],
  Ubud: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  ],
};

const cityVariants = {
  Goa: [
    { name: 'Cabo Noir Pool House', region: 'Sinquerim Cove', tag: 'Private pool escape' },
    { name: 'Palmline Beach Studio', region: 'Anjuna Shore', tag: 'Walk-to-sand studio' },
    { name: 'Tide House Candolim', region: 'Candolim Village', tag: 'Family beach home' },
  ],
  Udaipur: [
    { name: 'Pichola Moon Haveli', region: 'Gangaur Ghat', tag: 'Lakefront heritage' },
    { name: 'Zinc Courtyard Suite', region: 'Ambamata', tag: 'Quiet palace lane' },
    { name: 'Jharokha Lake Residence', region: 'Old City', tag: 'Rooftop dining' },
  ],
  Manali: [
    { name: 'Black Pine Chalet', region: 'Log Huts Road', tag: 'Cedar fireplace' },
    { name: 'Snowline Orchard Home', region: 'Vashisht Valley', tag: 'Valley-view cabin' },
    { name: 'Solang Ridge Lodge', region: 'Solang Road', tag: 'Trailside retreat' },
  ],
  'New York': [
    { name: 'Mercer Street Flat', region: 'SoHo', tag: 'Gallery district flat' },
    { name: 'Hudson Atelier Stay', region: 'West Village', tag: 'River-walk apartment' },
    { name: 'Bowery Black Loft', region: 'Lower East Side', tag: 'Downtown loft' },
  ],
  Oia: [
    { name: 'Aegean Noir Terrace', region: 'Ammoudi Bay', tag: 'Sunset terrace' },
    { name: 'Blue Dome Hideaway', region: 'Oia Castle', tag: 'Caldera hideaway' },
    { name: 'Cave Pool Residence', region: 'Finikia', tag: 'Private plunge pool' },
  ],
  Kyoto: [
    { name: 'Gion Lantern Machiya', region: 'Hanamikoji Lane', tag: 'Lantern-lit townhouse' },
    { name: 'Kamo River Tea House', region: 'Kiyamachi', tag: 'Garden bath stay' },
    { name: 'Higashiyama Quiet Villa', region: 'Yasaka Shrine', tag: 'Temple walk base' },
  ],
  Merzouga: [
    { name: 'Sahara Black Canvas', region: 'Erg Chebbi Edge', tag: 'Dune camp suite' },
    { name: 'Kasbah Moon Tent', region: 'Hassi Labied', tag: 'Stargazing tent' },
    { name: 'Nomad Fire Camp', region: 'Desert Gate', tag: 'Sunrise ride camp' },
  ],
  Ubud: [
    { name: 'Tegallalang Noir Villa', region: 'Tegallalang', tag: 'Rice terrace villa' },
    { name: 'Sayan Jungle Pavilion', region: 'Sayan Ridge', tag: 'Jungle pool stay' },
    { name: 'Campuhan Garden House', region: 'Campuhan Walk', tag: 'Yoga garden home' },
  ],
};

const hostNames = ['Riya', 'Ishaan', 'Lena'];
const priceMultipliers = [0.88, 1.08, 1.18];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function rotateImages(city, originalImages, offset = 0) {
  const pool = [...(cityImagePools[city] ?? []), ...originalImages];
  const uniquePool = [...new Set(pool)];

  return Array.from({ length: 5 }, (_, index) => uniquePool[(offset + index) % uniquePool.length]);
}

function buildVariant(baseStay, variant, index) {
  const multiplier = priceMultipliers[index] ?? 1;
  const name = variant.name;

  return {
    ...baseStay,
    id: `${baseStay.id}-${index + 2}`,
    slug: `${slugify(name)}-${slugify(baseStay.city)}`,
    name,
    region: variant.region,
    tag: variant.tag,
    price: Math.round(baseStay.price * multiplier),
    cleaningFee: Math.round(baseStay.cleaningFee * (0.9 + index * 0.08)),
    serviceFee: Math.round(baseStay.serviceFee * (0.92 + index * 0.07)),
    rating: Number(Math.min(4.99, baseStay.rating + 0.01 - index * 0.02).toFixed(2)),
    reviews: baseStay.reviews + 31 + index * 27,
    guests: Math.max(2, baseStay.guests + (index === 2 ? 1 : 0) - (index === 0 ? 1 : 0)),
    bedrooms: Math.max(1, baseStay.bedrooms + (index === 2 ? 1 : 0)),
    beds: Math.max(1, baseStay.beds + index),
    instantBook: index !== 1,
    description: `${variant.name} brings the ${baseStay.city} experience into a darker, more polished stay with layered lighting, comfortable work corners, and the same curated standards guests expect from StayNest.`,
    host: {
      ...baseStay.host,
      name: hostNames[index] ?? baseStay.host.name,
      superhost: index !== 1,
    },
    amenities: [...new Set([...baseStay.amenities, 'Blackout curtains', 'Smart lock'])],
    highlights: [
      variant.tag,
      baseStay.highlights[(index + 1) % baseStay.highlights.length],
      'Five-photo gallery',
    ],
    images: rotateImages(baseStay.city, baseStay.images, index + 1),
  };
}

export function buildStayInventory(stays = []) {
  return stays.flatMap((stay) => {
    const original = {
      ...stay,
      images: rotateImages(stay.city, stay.images, 0),
    };
    const variants = (cityVariants[stay.city] ?? []).map((variant, index) =>
      buildVariant(original, variant, index),
    );

    return [original, ...variants];
  });
}
