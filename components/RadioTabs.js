import React, { useState } from 'react';

function RadioTabs ({tab1, tab2, tab3}){
    const [activeTab, setActiveTab] = useState('tab1');

    const handleChange = (e) => {
        setActiveTab(e.target.id);
    };

  return (
    <div className="flex px-2 py-1">
        <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600">
            <nav className="flex space-x-2" aria-label="Tabs">
                <input type="radio" name="tabs" id="tab1" className="hidden" checked />
                <label htmlFor="tab1" className="cursor-pointer hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:text-blue-600 dark:text-gray-400 dark:hover:text-white active">
                {tab1}
                </label>
                <input type="radio" name="tabs" id="tab2" className="hidden" />
                <label htmlFor="tab2" className="cursor-pointer hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:text-blue-600 dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300">
                {tab2}
                </label>
                <input type="radio" name="tabs" id="tab3" className="hidden" />
                <label htmlFor="tab3" className="cursor-pointer hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:text-blue-600 dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300">
                {tab3}
                </label>
            </nav>
        </div>
    </div> 
  )
}

export default RadioTabs;
