function haversineDistance(lat1, lon1, lat2, lon2, unit = "km") {
  console.log(lat1, lon1, lat2, lon2);
  const toRadians = (degree) => degree * (Math.PI / 180);

  const R = unit === "km" ? 6371 : 3958.8; // Radius of the Earth in kilometers (6371) or miles (3958.8)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance.toFixed(2); // Return distance rounded to 2 decimal places
}

export { haversineDistance };
