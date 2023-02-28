import React from 'react';
import Select from 'react-select';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';

const accomodationTypes = [
  {
    id: 1,
    label: 'Not Needed',
    weekPrice: 0,
    dayPrice: 0,
  },
  {
    id: 4,
    label: 'Private apartment',
    weekPrice: 25000,
    dayPrice: 3800,
  },
  {
    id: 6,
    label: 'Flat share',
    weekPrice: 12000,
    dayPrice: 2400,
    minLength: 14,
  },
  {
    id: 5,
    label: 'Share house',
    weekPrice: 15000,
    dayPrice: 2800,
    minLength: 35,
  },
  {
    id: 2,
    label: 'Homestay',
    weekPrice: 22000,
    dayPrice: 3300,
    maxLength: 28,
  },
];

const pickupOptions = [
  {
    id: 1,
    label: 'Arrival',
  },
  {
    id: 2,
    label: 'Departure',
  },
  {
    id: 3,
    label: 'Arrival & Departure',
  },
];

const Accomodation = (props) => {
  const { data, errors } = props;
  const minLength = data.accomodation_type && data.accomodation_type.minLength;
  const maxLength = data.accomodation_type && data.accomodation_type.maxLength;
  const validStartDate = current => current.isAfter(Datetime.moment()) &&
    (!data.accomodation_end_date || current.isBefore(Datetime.moment(data.accomodation_end_date, 'MMM Do YYYY')));
  let validEndDate = current => current.isAfter(Datetime.moment()) &&
    (!data.accomodation_start_date || current.isAfter(Datetime.moment(data.accomodation_start_date, 'MMM Do YYYY')));
  if (minLength) {
    validEndDate = current => current.isAfter(Datetime.moment(data.accomodation_start_date, 'MMM Do YYYY').add(minLength - 1, 'days'));
  }
  if (maxLength) {
    validEndDate = current => current.isAfter(Datetime.moment()) &&
      (!data.accomodation_start_date || current.isAfter(Datetime.moment(data.accomodation_start_date, 'MMM Do YYYY'))) &&
      current.isBefore(Datetime.moment(data.accomodation_start_date, 'MMM Do YYYY').add(maxLength - 1, 'days'));
  }
  return (
    <React.Fragment>
      <div className="row course calendar-container ">
        <div className="col-sm-8">
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label className="form-control-label">Type</label>
              </div>
              <div className="col-md-6 text-right">
                <div className="text-danger">{errors.accomodation_type}</div>
              </div>
            </div>
            <Select
              name="accomodation_type"
              valueKey="label"
              labelKey="label"
              value={data.accomodation_type}
              placeholder="Choose a type"
              options={accomodationTypes}
              onChange={type => props.onChange('accomodation_type', type)}
              clearable={false}
            />
          </div>
        </div>
        {data.accomodation_type && data.accomodation_type.id !== 1 &&
          <React.Fragment>
            <div className="col-sm-6">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-control-label">From</label>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="text-danger">{errors.accomodation_start_date}</div>
                  </div>
                </div>
                <DatePicker
                  onChange={date => date.format && props.onChange('accomodation_start_date', date.format('MMM Do YYYY'))}
                  value={data.accomodation_start_date}
                  viewMode="days"
                  timeFormat={false}
                  isValidDate={validStartDate}
                  clearButton={false}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-control-label">To</label>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="text-danger">{errors.accomodation_end_date}</div>
                  </div>
                </div>
                <DatePicker
                  onChange={date => date.format && props.onChange('accomodation_end_date', date.format('MMM Do YYYY'))}
                  value={data.accomodation_end_date}
                  viewMode="days"
                  timeFormat={false}
                  isValidDate={validEndDate}
                  clearButton={false}
                />
              </div>
            </div>
          </React.Fragment>
        }
      </div>
      {data.accomodation_type && data.accomodation_type.id > 0 &&
        <p className="mt-3 font-italic"><b>Note</b></p>
      }
      {data.accomodation_type && data.accomodation_type.id === 1 &&
        <p className="font-italic">Are you sure? We have a large housing network and <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">very competitive prices.</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 3 &&
        <p className="font-italic">Check-In possible after 15h at any time</p>}
      {data.accomodation_type && data.accomodation_type.id === 3 &&
        <p className="font-italic">Furnished apartment with Wi-Fi</p>}
      {data.accomodation_type && data.accomodation_type.id === 3 &&
        <p className="font-italic">20,000 JPY deposit required (fully refundable)</p>}
      {data.accomodation_type && data.accomodation_type.id === 3 &&
        <p className="font-italic">For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 4 &&
        <p className="font-italic">Check-In possible after 15h at any time</p>}
      {data.accomodation_type && data.accomodation_type.id === 4 &&
        <p className="font-italic">Furnished apartment with Wi-Fi</p>}
      {data.accomodation_type && data.accomodation_type.id === 4 &&
        <p className="font-italic">Normally 20,000 JPY deposit required (fully refundable)</p>}
      {data.accomodation_type && data.accomodation_type.id === 4 &&
        <p className="font-italic">For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">Maximum stay four weeks</p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">Daily Breakfast is included (dinner for additional fees)</p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">For Homestay Airport Pickup must be chosen, “Arrival” or “Arrival & Departure”</p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">Minimum stay two weeks</p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">Single or shared bedroom (female & male separated)</p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">Airport pickup must be chosen, “Arrival” or “Arrival & Departure” must be chosen.</p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">Minimum stay five weeks</p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">Check-In between 15h and 21h</p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">Airport pickup must be chosen, “Arrival” or “Arrival & Departure” must be chosen.</p>}
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="font-italic">Students usually move in at least two days before the Course Start.</p>}
      {data.accomodation_type && data.accomodation_type.id === 3 &&
        <p className="font-italic">Students usually move in at least two days before the Course Start.</p>}
      {data.accomodation_type && data.accomodation_type.id === 4 &&
        <p className="font-italic">Students usually move in at least two days before the Course Start.</p>}
      {data.accomodation_type && data.accomodation_type.id === 5 &&
        <p className="font-italic">Students usually move in at least two days before the Course Start.</p>}
      {data.accomodation_type && data.accomodation_type.id === 6 &&
        <p className="font-italic">Students usually move in at least two days before the Course Start.</p>}
      <div className="form-group mt-3">
        <div className="checkbox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={(data.accomodation_type
                && data.accomodation_type.id === 2) ||
                data.airport_pickup}
              onChange={(data.accomodation_type
                && data.accomodation_type.id === 2)
                ? () => {} : () => props.onChange('airport_pickup', !data.airport_pickup)}
              className="mr-2"
            />Airport pickup
          </label>
        </div>
      </div>
      <div className="text-danger">{errors.pickup_info}</div>
      {data.airport_pickup &&
        <div className="form-group mt-3">
          <label className="radio-inline">
            <input
              type="radio"
              className="mr-2"
              onChange={() => props.onChange('pickup_info', pickupOptions[0])}
              checked={data.pickup_info
                && data.pickup_info.id === pickupOptions[0].id}
            />
            Arrival
          </label>
          {data.accomodation_type && data.accomodation_type.id !== 2 &&
          <label className="radio-inline">
            <input
              type="radio"
              className="mr-2"
              onChange={() => props.onChange('pickup_info', pickupOptions[1])}
              checked={data.pickup_info
                && data.pickup_info.id === pickupOptions[1].id}
            />
            Departure
          </label>
          }
          <label className="radio-inline">
            <input
              type="radio"
              className="mr-2"
              onChange={() => props.onChange('pickup_info', pickupOptions[2])}
              checked={data.pickup_info
                && data.pickup_info.id === pickupOptions[2].id}
            />
            Arrival & Departure
          </label>
          <p className="mt-3 font-italic">
            <p><b>Note</b> <br /></p>
            <p>Airport drop-off is available on any day of the week between 11am-8pm</p>
            <p>Additional charge of 2,500JPY for weekend drop-offs (Saturday & Sunday)</p>
            <p>If you arrive late, you have to stay the first night in a hotel. We can help with arrangements!</p>
          </p>
        </div>
      }
      {data.accomodation_type && data.accomodation_type.id === 2 &&
        <p className="text-danger">For Homestay, “Arrival” or “Arrival & Departure” must be chosen</p>
      }
    </React.Fragment>
  );
};

export default Accomodation;
