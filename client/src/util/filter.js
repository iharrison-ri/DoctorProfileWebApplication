export const getColumns = (expertise) => {
    let listCols = {};
    const fullLength = expertise.length;
    const evenNumberList = (fullLength % 2 === 0);
    if (evenNumberList) {
        listCols.leftColumns = expertise.slice(0, fullLength / 2);
        listCols.rightColumns = expertise.slice(fullLength / 2, fullLength);
    } else {
        const leftColLength = (fullLength + 1) / 2;
        listCols.leftColumns = expertise.slice(0, leftColLength);
        listCols.rightColumns = expertise.slice(leftColLength, fullLength);
        listCols
            .rightColumns
            .push('--------');
    }
    return listCols;
}