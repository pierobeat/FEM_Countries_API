export const formatCountryName = (name: string, toKebab: boolean): string => {
  if (toKebab) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-') // Spasi ke dash
      .replace(/[^\w-]/g, ''); // Hapus karakter khusus
  } else {
    return name
      .replace(/-/g, ' ') // Dash ke spasi
      .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi huruf pertama
  }
};