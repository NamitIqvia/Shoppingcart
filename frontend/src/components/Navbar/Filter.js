import React, {useState} from 'react';

const Filter = ({items, filterItems}) => {

   const [filterState, setFilter] = useState("Pick Material");


   const removeduplicateMaterial = (itemArray) => {
    let uniqueElementArray = []
    if(itemArray !== undefined){
      let materialArray = itemArray.map((item) =>  item.material)
      materialArray.forEach((itemArr) => {
          if(uniqueElementArray.indexOf(itemArr) === -1){
            uniqueElementArray.push(itemArr)
          }
      })
    }
    return uniqueElementArray

   }


   return(
     <>
     { items !== undefined ? (
       <>
      <select style={{width:'100px'}} onChange={(e) => {filterItems(e)}}>
        <option value="Material">No Filter</option>
        {
          
          removeduplicateMaterial(items).map((item) => (
              <option value={item}>{item}</option>
          ))
        }
      </select>

      </>
     ) : <div>Still Loading</div>
    }
     </>
   );


}

export default Filter;