export const getColumns = (expertise) => {
    let listCols = {};
    const fullLength = expertise.length;
    const evenNumberList = (fullLength % 2 === 0);
    if(evenNumberList){
        listCols.left = expertise.slice(0, fullLength/2);
        listCols.right = expertise.slice(fullLength/2, fullLength);
    } else {
        const leftColLength = (fullLength + 1) / 2;
        listCols.left = expertise.slice(0, leftColLength);
        listCols.right = expertise.slice(leftColLength, fullLength);
        listCols.right.push('--------');
    }
    return listCols;
}