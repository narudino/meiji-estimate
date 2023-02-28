import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';
import { SideCoursePricing, StandardCoursePricing, SideCourseTitle } from 'config/pricing';

const makeClassesOptions = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push({
      label: i === 1 ? `${i} class` : `${i} classes`,
      value: i,
    });
  }
  return result;
};

const CourseChoices = (props) => {
  const { errors, data } = props;
  const getLengthOptions = pricing => Object.keys(pricing).map(key => ({ label: `${key} weeks`, value: key }));
  const valid = current => current.isAfter(Datetime.moment()) && current.days() === 1;
  return (
    <React.Fragment>
      <h4 className="mt-5 main-text" style={{ fontSize: '1.1rem' }}>STANDARD COURSE (mandatory)</h4>
      <div className="row mt-3 calendar-container course">
        <div className="col-sm-4">
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <label className="form-text">Length <span className="text-danger">*</span></label>
              </div>
              <div className="col-6 text-right">
                <div className="text-danger">{errors.standard_length}</div>
              </div>
            </div>
            <Select
              value={data.standard_length}
              options={getLengthOptions(StandardCoursePricing)}
              onChange={length => props.onChange('standard_length', length && parseInt(length.value, 10))}
              clearable={false}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <label className="form-text">Start date <span className="text-danger">*</span></label>
              </div>
              <div className="col-6 text-right">
                <div className="text-danger">{errors.course_start_date}</div>
              </div>
            </div>
            <DatePicker
              onChange={date => date.format && props.onChange('course_start_date', date.format('MMM Do YYYY'))}
              value={data.course_start_date}
              viewMode="days"
              timeFormat={false}
              isValidDate={valid}
              clearButton={false}
              inputProps={{ placeholder: ' ' }}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <label className="form-text">End date</label>
              </div>
            </div>
            <DatePicker
              value={data.course_start_date && data.standard_length &&
                moment(data.course_start_date, 'MMM Do YYYY').add(data.standard_length, 'weeks').subtract(3, 'days').format('MMM Do YYYY')}
              viewMode="days"
              timeFormat={false}
              inputProps={{ placeholder: ' ', disabled: true }}
              clearButton={false}
            />
          </div>
        </div>
      </div>
      <h4 className="mt-5 main-text" style={{ fontSize: '1.1rem' }}>Not enough? Add more fun modules!</h4>
      <p className="side-text my-4 ml-0">You can add in addition to your standard course one extra module per week.<br />Multiple selections possible</p>
      {Object.keys(SideCoursePricing).map(course => (
        <div className="row" key={course}>
          <div className="col-sm-5">
            <div className="form-group mt-3">
              <div className="checkbox">
                <label className="checkbox form-text">
                  <input
                    type="checkbox"
                    checked={data[course] !== undefined}
                    onChange={e => props.onChange(course, e.target.checked ? 1 : undefined)}
                    className="mr-2"
                  />
                  <b>{SideCourseTitle[course]}</b>
                </label>
              </div>
            </div>
          </div>
          {data[course] !== undefined &&
            <div className="col-sm-3">
              <div className="form-group mt-2">
                <Select
                  value={data[course]}
                  options={getLengthOptions(SideCoursePricing[course])}
                  onChange={length => props.onChange(course, length && parseInt(length.value, 10))}
                  clearable={false}
                  placeholder="Length"
                />
              </div>
            </div>
          }
        </div>
      ))}

      <h4 className="mt-5 main-text" style={{ fontSize: '1.1rem' }}>Do you want to add any Add-ons?</h4>
      <div className="row mt-3">
        <div className="col-sm-6">
          <div className="form-group">
            <label className="form-control-label">Private classes (per week)</label>
            <Select
              name="private_classes"
              valueKey="value"
              labelKey="label"
              value={data.private_classes}
              options={makeClassesOptions(1, 5)}
              onChange={length => props.onChange('private_classes', length && parseInt(length.value, 10))}
              clearable
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="form-control-label">Kanji classes (per week)</label>
            <Select
              name="kanji_classes"
              valueKey="value"
              labelKey="label"
              value={data.kanji_classes}
              options={makeClassesOptions(1, 5)}
              onChange={length => props.onChange('kanji_classes', length && parseInt(length.value, 10))}
              clearable
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseChoices;
