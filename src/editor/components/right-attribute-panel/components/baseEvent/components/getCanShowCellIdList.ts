import { props, formData } from "./EventSelector.vue";

export function getCanShowCellIdList() {

const options = props.cellList.map((item: any) => ({ value: item.view.cell.zIndex, label: item.view.cell.zIndex }));
let filterOptions = options.filter(function (n) {
return !formData.hideElement.includes(parseInt(n.label));
});
console.log('getCanShowCellIdList filterOptions', filterOptions);
return filterOptions;

}
