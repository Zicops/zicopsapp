export function passingCriteriaSymbol(passingCriteria) {
    if (!passingCriteria) return 'N/A';
    //checking if passing criteria is marks or Percentage
    const passingCriteriaArr = passingCriteria?.split('-') || [] ;
    if(!+passingCriteriaArr?.[0]) return 'N/A' ;
    const updatedPassingCriteria =
      passingCriteriaArr?.[1] === 'Percentage'
        ? passingCriteriaArr?.[0] + '%'
        : passingCriteriaArr?.[0] + ' Marks';
  
    return `${updatedPassingCriteria}`;
  }
  