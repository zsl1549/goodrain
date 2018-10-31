// compute resource used number
const computeRatio = (used,total) => {
     if (total <=0) {
         return 0
     }
     return Math.floor(used/total*100)
};
  
export { computeRatio };