export const generateRandom = (maxLimit = 600, minLimit = 0) => {
  let rand = Math.random() * (maxLimit + minLimit) + minLimit;
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

export const getPokemonScale = (height: number) => {
  console.log(height)

  return height == 92 ? height / 110 :
    height == 45 ? height / 47 :
      height == 49 ? height / 45 :
        height == 42 ? height / 45 :
          height == 40 ? height / 45 :
            height == 37 ? height / 40 :
              height == 32 ? height / 38 :
                height == 17 ? height / 25 :
                  height == 16 ? height / 24 :
                    height == 15 ? height / 22 :
                      height == 14 ? height / 20 :
                        height == 13 ? height / 18 :
                          height == 12 ? height / 18 :
                            height == 11 ? height / 18 :
                              height == 10 ? height / 17 :
                                height == 9 ? height / 16 :
                                  height == 8 ? height / 15 :
                                    height == 7 ? height / 12 :
                                      height == 6 ? height / 10 :
                                        height == 5 ? height / 8 :
                                          height == 4 ? height / 8 :
                                            height == 3 ? height / 7 :
                                              height == 2 ? height / 5 :
                                                height > 50 ? height / 60 :
                                                  height > 20 ? height / 28
                                                    : height / 25
}
