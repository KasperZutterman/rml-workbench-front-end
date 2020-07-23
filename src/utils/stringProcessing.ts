export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getExtension(filename: string) {
  return filename.split('.').pop();
}

export function getFilename(filename: string) {
  return filename.split('.').slice(0, -1).join('.');
}

export function trimFileExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}
