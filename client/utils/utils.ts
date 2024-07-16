export const generateRandom = (maxLimit = 600) => {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const shuffle = (array) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}