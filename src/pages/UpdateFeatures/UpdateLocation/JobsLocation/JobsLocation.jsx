import React from "react";

function JobsLocation({itemsOf}) {
  return (
    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
      <div className="card-image-top hover-up">
        <a href="">
          <div
            className="image"
            style={{backgroundImage: `url(${itemsOf.img})`}}
          >
          </div>
        </a>
        <div className="informations">
          <a href="">
            <h5>{itemsOf.Location}</h5>
          </a>
          <div className="row">
            <div className="col-lg-6 col-6">
              <span className="text-14 color-text-paragraph-2">{itemsOf.NumOfVacancy} Vacancy</span>
            </div>
            <div className="col-lg-6 col-6 text-end">
              <span className="color-text-paragraph-2 text-14">
                {itemsOf.NumOfCompanies} companies
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsLocation;
