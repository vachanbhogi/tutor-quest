import { SetStateAction, useState } from "react";

type Tabs = {
    label: string;
    content: JSX.Element;
}

type TabsProps = {
    tabs: Tabs[];
}

function Tabs({ tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (index: SetStateAction<number>) => {
      setActiveTab(index);
    };
  
    return (
      <div className="border-b border-gray-200 h-full">
        <div className="flex">
          {tabs.map((tab: Tabs, index: number ) => (
            <div
              key={index}
              className={`cursor-pointer py-2 px-8 ${activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="mt-4 w-full h-full">
          {tabs[activeTab].content}
        </div>
      </div>
    );
}

export default Tabs;
