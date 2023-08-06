import React from 'react';

function RadioThree ({tab1, tab2, tab3}){

  return (
    <div className="flex px-2 py-1 justify-center">
      <div className="flex flex-col items-center mr-4">
        <label className="cursor-pointer mb-2">{tab1}</label>
        <input type="radio" name="tabs" value="tab1" className="radio" checked />
      </div>

      <div className="flex flex-col items-center mr-4">
        <label className="cursor-pointer mb-2">{tab2}</label>
        <input type="radio" name="tabs" value="tab2" className="radio" />
      </div>

      <div className="flex flex-col items-center">
        <label className="cursor-pointer mb-2">{tab3}</label>
        <input type="radio" name="tabs" value="tab3" className="radio" />
      </div>
    </div>
  )
}

export default RadioThree;
