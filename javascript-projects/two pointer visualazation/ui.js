export function renderArray(arr, leftIndex, rightIndex ,target) {
  const container = document.querySelector(".array-res");

  // 1. Purana default mock data saaf karo
  container.innerHTML = "";

  // 2. Element generation factory block
  arr.forEach((value, index) => {
    // Pointer Repainting
    let leftPointer = ``;
    let rightPointer = '';

     const block = document.createElement('div');
     block.classList.add('array-block');

    //C. Pointer Check Logic:
      if (index === leftIndex){
        block.classList.add('left-active')
        leftPointer = `<span class="pointer-label pointer-l">L</span>`;
      }  //toh class list me 'left-active' add karo aur andar pointer markup labels append karo.
    
    else if (index === rightIndex){
        block.classList.add('right-active')
       rightPointer = `<span class="pointer-label pointer-r">R</span>`;
    } //toh class list me 'right-active' add karo.
    // D. Box ke andar number value aur static index coordinate dalo using template literals:
    block.innerHTML = `
                  ${leftPointer}
                  ${rightPointer}
                <span class="num-val">${value}</span>
                <span class="idx-val">${index}</span>
            `; //(Jo humne HTML architecture me ready kiya tha)
    // E. Pura layout active structure render queue me push karo:
    container.appendChild(block);
  });
}

