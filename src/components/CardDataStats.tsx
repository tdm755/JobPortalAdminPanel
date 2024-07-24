import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string | number;
  icon: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  icon,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-boxdark-hover transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
     <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-primary/20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"></div> 
      
      <div className="relative z-10">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white group-hover:text-primary transition-colors duration-300">
              {typeof total === 'number' ? total.toLocaleString() : total}
            </h4>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div> */}
      <div
    className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
    style={{ backgroundColor: '#d4e6ff' }}
  ></div>
    </div>
  );
};

export default CardDataStats;