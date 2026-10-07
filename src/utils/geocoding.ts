// Address Geocoding Helper for Paris 18e Arrondissement
export function geocodeAddress(address: string): { lat: number; lng: number; x: number; y: number } {
  const lower = (address || '').toLowerCase();

  if (lower.includes('ernestine')) {
    return { lat: 48.8902, lng: 2.3520, x: 50, y: 20 };
  }
  if (lower.includes('polonceau')) {
    return { lat: 48.8875, lng: 2.3525, x: 35, y: 48 };
  }
  if (lower.includes('stephenson')) {
    return { lat: 48.8885, lng: 2.3560, x: 57, y: 39 };
  }
  if (lower.includes('saint-bernard') || lower.includes('st-bernard')) {
    return { lat: 48.8868, lng: 2.3542, x: 60, y: 74 };
  }
  if (lower.includes('charbonnière')) {
    return { lat: 48.8845, lng: 2.3530, x: 38, y: 77 };
  }
  if (lower.includes('saint-luc')) {
    return { lat: 48.8878, lng: 2.3555, x: 74, y: 58 };
  }
  if (lower.includes('saint-jérôme')) {
    return { lat: 48.8858, lng: 2.3550, x: 62, y: 78 };
  }
  if (lower.includes('doudeauville')) {
    return { lat: 48.8890, lng: 2.3540, x: 61, y: 84 };
  }
  if (lower.includes('richomme')) {
    return { lat: 48.8860, lng: 2.3515, x: 34, y: 66 };
  }
  if (lower.includes('cavé')) {
    return { lat: 48.8870, lng: 2.3535, x: 45, y: 52 };
  }
  if (lower.includes('myrha') || lower.includes('gardes')) {
    return { lat: 48.8865, lng: 2.3540, x: 48, y: 62 };
  }
  if (lower.includes('barbès') || lower.includes('château rouge')) {
    return { lat: 48.8872, lng: 2.3498, x: 25, y: 50 };
  }

  // Hash-based deterministic coordinates in Goutte d'Or Paris 18e
  let hash = 0;
  for (let i = 0; i < address.length; i++) hash = (hash << 5) - hash + address.charCodeAt(i);
  const latOffset = ((Math.abs(hash) % 100) - 50) * 0.00005;
  const lngOffset = ((Math.abs(hash >> 3) % 100) - 50) * 0.00005;

  return {
    lat: 48.8872 + latOffset,
    lng: 2.3538 + lngOffset,
    x: 30 + (Math.abs(hash) % 40),
    y: 30 + (Math.abs(hash >> 2) % 40),
  };
}
