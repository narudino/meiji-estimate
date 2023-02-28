import React from 'react';
import Select from 'react-select';
import { countryList, countryCodes } from 'config';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';

const ContactInformation = (props) => {
  const { data, errors } = props;
  const valid = current => current.isBefore(Datetime.moment());
  const handleInputChange = e => props.onChange(e.target.name, e.target.value);
  return (
    <React.Fragment>
      <div className="row calendar-container">
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">First name <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.first_name}</div>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={data.first_name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Last name <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.last_name}</div>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={data.last_name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Email <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.email}</div>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              name="email"
              value={data.email || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Mobile number</label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.phone}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pr-0">
                <Select
                  name="country_code"
                  valueKey="code"
                  labelKey="label"
                  placeholder="Country code"
                  clearable={false}
                  value={data.country_code && data.country_code.code}
                  onChange={code => props.onChange('country_code', code)}
                  options={countryCodes.map(countryCode => ({ ...countryCode, label: `${countryCode.name} ${countryCode.code}` }))}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group datetime-input-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Date of birth <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.birth_day}</div>
              </div>
            </div>
            <DatePicker
              onChange={date => date.format && props.onChange('birth_day', date.format('MMM Do YYYY'))}
              value={data.birth_day}
              viewMode="years"
              timeFormat={false}
              isValidDate={valid}
              clearButton={false}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="form-control-label">Gender <span className="text-danger">*</span></label>
            <div className="text-danger">{errors.gender}</div>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => props.onChange('gender', 'Male')}
                checked={data.gender === 'Male'}
              />
              Male
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => props.onChange('gender', 'Female')}
                checked={data.gender === 'Female'}
              />
              Female
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => props.onChange('gender', 'Other')}
                checked={data.gender === 'Other'}
              />
              Other
            </label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Nationality <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.nationality}</div>
              </div>
            </div>
            <Select
              name="nationality"
              valueKey="label"
              labelKey="label"
              placeholder="Type to search for country"
              clearable={false}
              value={data.nationality}
              onChange={nationality => props.onChange('nationality', nationality && nationality.label)}
              options={countryList.map(country => ({ label: country }))}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <label className="form-control-label">Current residence in <span className="text-danger">*</span></label>
              </div>
              <div className="col-3 text-right">
                <div className="text-danger">{errors.resident_country}</div>
              </div>
            </div>
            <Select
              name="resident_country"
              valueKey="label"
              labelKey="label"
              placeholder="Type to search for country"
              clearable={false}
              value={data.resident_country}
              onChange={residentCountry => props.onChange('resident_country', residentCountry && residentCountry.label)}
              options={countryList.map(country => ({ label: country }))}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group my-4">
            <textarea
              className="form-textarea"
              name="comments"
              placeholder="Any comments / questions?"
              onChange={handleInputChange}
              value={data.comments}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactInformation;
