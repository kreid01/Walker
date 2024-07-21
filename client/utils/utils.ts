export const generateRandom = (maxLimit = 600) => {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

export const capitalizeFirstLetter = (string: string) => {
  if (string == null) return ""
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const duplidateData = (data: any[]) => {
  let newData = data;
  for (let i = 0; i < 100; i++) {
    if (newData?.length < 130) newData = [...newData, ...newData]
  }

  return shuffle(newData)
}