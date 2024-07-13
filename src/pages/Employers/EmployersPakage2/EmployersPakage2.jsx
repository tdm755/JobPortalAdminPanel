import React, { useState, useEffect } from 'react';
import './EmployersPakage2.css';
import CheckIcon from '../../../../public/CheckIcon.svg';
import CrossIcon from '../../../../public/redCross.svg';
import DefaultLayout from '../../../layout/DefaultLayout';
import { getAllPackages, updatePackageDetails } from '../../../api/api';

const inclusionDisplayNames = {
  companyProfiles: "Company Profiles",
  candidateProfileUnlocks: "5 candidate profile unlocks",
  resumeDatabaseAccess: "Resume Database Access",
  integrationWithOtherPlatforms: "Integration with Other Platforms",
  jobPosting: "Job Posting",
  searchAndFilters: "Search And Filters",
  analyticsAndReporting: "Analytics And Reporting"
};

const inclusionKeys = Object.keys(inclusionDisplayNames);

function EmployersPakage2() {
  const [packages, setPackages] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [changes, setChanges] = useState({});
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    updateDiscountedPrices();
  }, [discountPercentage, changes]);

  const fetchPackages = async () => {
    try {
      const response = await getAllPackages();
      setPackages(response.data);
      initializeInclusions(response.data);
       // Assuming the first package has the common discount percentage
       setDiscountPercentage(response.data[0].discountPercentage.toString());
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    }
  };

  const initializeInclusions = (packageData) => {
    const newInclusions = inclusionKeys.map(key => ({
      th: inclusionDisplayNames[key],
      backendKey: key,
      ...packageData.reduce((acc, pkg) => ({
        ...acc,
        [pkg.packageId]: pkg[key] ? "CheckIcon" : "CrossIcon"
      }), {})
    }));
    setInclusions(newInclusions);
  };

  const handleChange = (packageId, field, value) => {
    setInputValues(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        [field]: value
      }
    }));

    setChanges(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        [field]: field === 'originalPrice' || field === 'duration' 
          ? (value === '' ? '' : Number(value))
          : value
      }
    }));
  };

  const handleInclusionChange = (index, packageId, value) => {
    const newInclusions = [...inclusions];
    newInclusions[index][packageId] = value;
    setInclusions(newInclusions);

    setChanges(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        [newInclusions[index].backendKey]: value === "CheckIcon"
      }
    }));
  };

  const handleDiscountChange = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      setDiscountPercentage('');
    } else {
      const clampedValue = Math.min(Math.max(parsedValue, 0), 100);
      setDiscountPercentage(clampedValue.toString());
    }
  };

  const calculateDiscountedPrice = (originalPrice) => {
    if (originalPrice === '' || discountPercentage === '') return '';
    const discount = parseFloat(discountPercentage) / 100;
    return Number((Number(originalPrice) * (1 - discount)).toFixed(2));
  };

  const updateDiscountedPrices = () => {
    const updatedChanges = { ...changes };
    packages.forEach(pkg => {
      const originalPrice = changes[pkg.packageId]?.originalPrice ?? pkg.originalPrice;
      const discountedPrice = originalPrice * (1 - discountPercentage / 100);
      updatedChanges[pkg.packageId] = {
        ...updatedChanges[pkg.packageId],
        discountedPrice: Number(discountedPrice.toFixed(2))
      };
    });
    setChanges(updatedChanges);
  };


  const saveChanges = async () => {
    try {
      for (const [packageId, updates] of Object.entries(changes)) {
        const formattedUpdates = {
          ...updates,
          discountPercentage: discountPercentage === '' ? 0 : parseFloat(discountPercentage)
        };
        await updatePackageDetails(packageId, formattedUpdates);
      }
      fetchPackages();
      setChanges({});
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };


  const getPackageStyle = (packageName) => {
    const styles = {
      'Free': 'circle-blue',
      'Bronze': 'cirle-lightBlue',
      'Silver': 'circle-yellow',
      'Platinum': 'circle-pink',
      'Gold': 'PremiumColor'
    };
    return styles[packageName] || '';
  };

  return (
    <DefaultLayout>
      <div className="EmployerPakage EmployerPakage2">
        <div className="containerInEmSec">
          <div className="section-head left wt-small-separator-outer mb-4">
            <div className="wt-small-separator site-text-primary">
              <h1 className="text-4xl mb-6">Set Your Plan</h1>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
              Discount Percentage:
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter %"
              value={discountPercentage}
              onChange={(e) => handleDiscountChange(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-24 sm:w-32 px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          <div className="section-content">
            <div className="pricing-block-outer TableXAuto">
              <div className="table_responsive_InEmPack2">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className="ForColorInEmPack2 ForColorInEmPack2Inclusions circle-blue">
                          <div className="p-table-title">
                            <h4 className="wt-title p-[25px]">Inclusions</h4>
                          </div>
                        </div>
                      </th>
                      {packages.map(pkg => (
                        <th key={pkg.packageId}>
                          <div className={`ForColorInEmPack2 ${getPackageStyle(pkg.packageName)}`}>
                            <div className="p-table-title">
                              <h4 className={`wt-title ${pkg.packageName.toLowerCase()}Title ${pkg.packageName === 'Free' ? 'p-[25px]' : ''}`}>{pkg.packageName}</h4>
                              {pkg.packageName !== 'Free' && (
                                <div className="flex flex-col p-table-price">
                                  <div className="flex flex-row items-center p-table-price">
                                    <span className="text-lg mr-2">
                                      ₹{calculateDiscountedPrice(changes[pkg.packageId]?.originalPrice ?? pkg.originalPrice)} /
                                    </span>
                                    <span className="text-sm line-through  decoration-red-400 italic">
                                      ₹{changes[pkg.packageId]?.originalPrice ?? pkg.originalPrice}
                                    </span>
                                  </div>
                                  <span className="text-sm">{changes[pkg.packageId]?.duration ?? pkg.duration} {changes[pkg.packageId]?.durationType ?? pkg.durationType}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th>Original Price</th>
                    {packages.map(pkg => (
                      <td key={pkg.packageId}>
                        {pkg.packageName !== 'Free' && (
                          <input
                            type="number"
                            value={inputValues[pkg.packageId]?.originalPrice ?? pkg.originalPrice}
                            onChange={(e) => handleChange(pkg.packageId, 'originalPrice', e.target.value)}
                            className="w-full border border-[#8db5d8] outline-none px-1 bg-transparent"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Duration</th>
                    {packages.map(pkg => (
                      <td key={pkg.packageId}>
                        {pkg.packageName !== 'Free' && (
                          <div className="flex items-center">
                            <input 
                              type="number"
                              value={inputValues[pkg.packageId]?.duration ?? pkg.duration}
                              onChange={(e) => handleChange(pkg.packageId, 'duration', e.target.value)}
                              className="w-1/2 border border-[#8db5d8] outline-none px-1 bg-transparent"
                            />
                            <select
                              value={changes[pkg.packageId]?.durationType ?? pkg.durationType}
                              onChange={(e) => handleChange(pkg.packageId, 'durationType', e.target.value)}
                              className="w-1/2 ml-1 border border-[#8db5d8] outline-none px-1 bg-transparent"
                            >
                              <option value="days">Days</option>
                              <option value="months">Months</option>
                              <option value="years">Years</option>
                            </select>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                    {inclusions.map((inclusion, index) => (
                      <tr key={index}>
                        <th>{inclusion.th}</th>
                        {packages.map(pkg => (
                          <td key={pkg.packageId}>
                            <div className="contentInTd">
                              {inclusion[pkg.packageId] === "CheckIcon" ? <img src={CheckIcon} alt='Check' /> : <img src={CrossIcon} alt='Cross' />}
                              <select 
                                style={inclusion[pkg.packageId] === 'CrossIcon' ? {border: "1px solid red"} : {border: "1px solid green"}}
                                value={inclusion[pkg.packageId]} 
                                onChange={(e) => handleInclusionChange(index, pkg.packageId, e.target.value)}
                              >
                                <option value="CheckIcon">Check</option>
                                <option value="CrossIcon">Cross</option>
                              </select>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ActionBTNs mt-8">
        <div className="SayChanges flex justify-end ">
          <button 
            onClick={saveChanges}
            className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EmployersPakage2;