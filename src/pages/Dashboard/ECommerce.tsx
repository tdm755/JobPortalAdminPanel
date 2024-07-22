import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { getTotalCounts } from '../../api/api';

interface Counts {
  totalCandidates: number;
  totalEmployers: number;
  totalUsers: number;
}

const ECommerce: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({
    totalCandidates: 0,
    totalEmployers: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getTotalCounts();
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching total counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/candidatedetails" className="block">
          <CardDataStats 
            title="Total Candidate's" 
            total={counts.totalCandidates}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m0-6l-2 2m2-2l2 2" />
              </svg>
            }
          />
        </Link>
        <Link to="/employersdetails" className="block">
          <CardDataStats 
            title="Total Employer's" 
            total={counts.totalEmployers}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
        </Link>
        <CardDataStats 
          title="Total Profit" 
          total="₹2,450"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <CardDataStats 
          title="Total Users" 
          total={counts.totalUsers}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;