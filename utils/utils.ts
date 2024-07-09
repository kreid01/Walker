export const generateRandom = (maxLimit = 600) => {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

export const  capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}