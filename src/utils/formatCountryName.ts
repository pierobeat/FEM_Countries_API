export const formatCountryName = (name: string, toKebab: boolean): string => {
  if (toKebab) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-") // convert spaces to dashes
      .replace(/[^\w-]/g, ""); // remove special characters
  } else {
    return name
      .replace(/-/g, " ") // convert dashes to spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  }
};
