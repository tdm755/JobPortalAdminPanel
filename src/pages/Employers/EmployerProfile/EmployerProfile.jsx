import React from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
im

function EmployerProfile() {
  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
            <h1 className='text-2xl'>Employer Details</h1>

            <div className="Details">

                  <div className="">
                    <label>Company Name</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="company_name"
                        type="text"
                        // value={formData.company_name}
                        // onChange={handleChange}
                        // placeholder="Enter Company Name"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-building" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="phone_number"
                        type="text"
                        // value={formData.phone_number}
                        // onChange={handleChange}
                        // placeholder="+91 XXXXXXXXXX"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-phone-alt" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        // placeholder="example@example.com"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fas fa-at" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Website</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="company_website"
                        type="text"
                        // value={formData.company_website}
                        // onChange={handleChange}
                        // placeholder="https://example.com/"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-globe-americas" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label htmlFor="">Number Of Employees</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="staffSize"
                        type="text"
                        // placeholder="9-15"
                        // value={formData.staffSize}
                        // onChange={handleChange}
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-clock" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group city-outer-bx has-feedback">
                    <label>Country</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="country"
                        type="text"
                        // value={formData.country}
                        // onChange={handleChange}
                        // placeholder="India"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-globe-americas" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group city-outer-bx has-feedback">
                    <label>City</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="city"
                        type="text"
                        // value={formData.city}
                        // onChange={handleChange}
                        // placeholder="Mumabai"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-globe-americas" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12">
                  <div className="form-group city-outer-bx has-feedback">
                    <label>Pincode</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="pincode"
                        type="text"
                        // value={formData.pincode}
                        // onChange={handleChange}
                        // placeholder={400001}
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fas fa-map-pin" />
                    </div>
                  </div>
                </div>
                
                {/* Est. Since */}
                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label htmlFor="">Est. Since</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="estSince"
                        // type="text"
                        // placeholder="Since 2005"
                        // value={formData.estSince}
                        // onChange={handleChange}
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fa fa-clock" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="form-group city-outer-bx has-feedback">
                    <label>Full Address</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="full_address"
                        type="text"
                        // value={formData.full_address}
                        // onChange={handleChange}
                        // placeholder="456, XYZ Road, Fort, Mumbai - 400001, Maharashtra, India"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fas fa-map-marker-alt" />
                    </div>
                  </div>
                </div>
                
                
                
                {/* <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="twm-s-map mb-5">
                  <h4 className="section-head-small mb-4">Location</h4>
                  <div className="twm-s-map-iframe">
                    <iframe
                      height={270}
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"
                    />
                  </div>
                </div>
              </div> */}
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      // value={formData.description}
                      // onChange={handleChange}
                      // style={textStyle}
                      // rows={3}
                      // defaultValue={
                      //   "Greetings! when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                      // }
                      placeholder="Enter description..."
                    />
                  </div>
                </div>



              </div>
            </div>
          </div>
          {/*Social Network*/}


          


          <div className="panel panel-default">
            <div className="panel-heading wt-panel-heading p-a20">
              <h4 className="panel-tittle m-a0 Titles">Social Network</h4>
            </div>
            <div className="panel-body wt-panel-body p-a20">

              <div className="row">

                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>linkedin</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control wt-form-control"
                        name="linkedin"
                        type="text"
                        // value={formData.linkedin}
                        // onChange={handleChange}
                        // placeholder="https://in.linkedin.com/"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fab fa-linkedin-in" />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>GitHub</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control wt-form-control"
                        name="github"
                        type="text"
                        // value={formData.github}
                        // onChange={handleChange}
                        // placeholder="https://www.github.com/"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fab fa-brands fa-github" />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Instagram</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control wt-form-control"
                        name="instagram"
                        type="text"
                        // value={formData.instagram}
                        // onChange={handleChange}
                        // placeholder="https://instagram.com/"
                        // style={textStyle}
                      />
                      <i className="fs-input-icon fab fa-instagram" />
                    </div>
                  </div>
                </div>

            </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default EmployerProfile
