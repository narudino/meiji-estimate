import React from 'react';
import moment from 'moment';
import { numberWithCommas } from 'utils/number';
import { KanjiPrice, PrivatePrice, SideCoursePricing, SideCourseTitle, StandardCoursePricing } from 'config/pricing';

const Calculation = (props) => {
  const { data } = props;
  const registrationFee = 19000;
  const materialFee = 3000;
  const standardFee = StandardCoursePricing[data.standard_length].price;
  const modulesFee = Object.keys(SideCoursePricing).filter(key => data[key]).reduce((acc, key) => acc + SideCoursePricing[key][data[key]], 0);
  const extraClassesFee = data.standard_length * (((data.private_classes || 0) * PrivatePrice) + ((data.kanji_classes || 0) * KanjiPrice));
  const accomodationArrangementFee = (data.accomodation_type && data.accomodation_type.id) !== 1 ? 9600 : 0;
  const accomodationLength = (data.accomodation_type && data.accomodation_type.id !== 1) ?
    (moment(data.accomodation_end_date, 'MMM Do YYYY')
      .diff(moment(data.accomodation_start_date, 'MMM Do YYYY'), 'days'))
    : 0;
  const accomodationLengthWeek = Math.floor(accomodationLength / 7);
  const accomodationLengthDay = accomodationLength % 7;
  const accomodationFee = (data.accomodation_type && data.accomodation_type.id !== 1) ?
    ((accomodationLengthDay * data.accomodation_type.dayPrice) +
      (accomodationLengthWeek * data.accomodation_type.weekPrice))
    : 0;
  const airportPickupFeeType = data.airport_pickup && data.pickup_info.label;
  const airportPickupFee = data.airport_pickup
    ? ([1, 2].includes(data.pickup_info.id) ? 6000 : 12000)
    : 0;
  const subTotal = registrationFee + materialFee + standardFee + modulesFee + extraClassesFee + accomodationArrangementFee + accomodationFee + airportPickupFee;
  const discount = StandardCoursePricing[data.standard_length].discountedPrice ? StandardCoursePricing[data.standard_length].price - StandardCoursePricing[data.standard_length].discountedPrice : 0;
  const total = subTotal - discount;
  return (
    <React.Fragment>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td><b>Application, Study and Material Fee</b></td>
            <td></td>
            <td>¥ {numberWithCommas(registrationFee + materialFee)}</td>
          </tr>
          <tr>
            <td><b>Course Fee</b></td>
            <td>
              Standard Course - {data.standard_length} week(s) <br />
              Start date: {data.course_start_date} <br />
              End date: {moment(data.course_start_date, 'MMM Do YYYY').add(data.standard_length, 'weeks').subtract(3, 'days').format('MMM Do YYYY')} <br />
            </td>
            <td>¥ {numberWithCommas(StandardCoursePricing[data.standard_length].price)}</td>
          </tr>
          <tr>
            <td><b>Modules</b></td>
            <td>
              <div>
                {Object.keys(SideCourseTitle).filter(key => data[key]).map(key => (
                  <React.Fragment key={key}>
                    {SideCourseTitle[key]} - {data[key]} week(s) <br />
                    Fee: ¥ {numberWithCommas(SideCoursePricing[key][data[key]])} <br />
                  </React.Fragment>
                ))}
              </div>
            </td>
            <td>¥ {numberWithCommas(modulesFee)}</td>
          </tr>
          <tr>
            <td><b>Add-ons</b></td>
            <td>
              {data.private_classes &&
                <div>
                  Private Class {data.private_classes || 0} classes/week - {data.standard_length} week(s) <br />
                  Fee: ¥ {numberWithCommas(data.standard_length * ((data.private_classes || 0) * PrivatePrice))} <br />
                </div>
              }
              {data.kanji_classes &&
                <div>
                  Kanji Class {data.kanji_classes || 0} classes/week - {data.standard_length} week(s) <br />
                  Fee: ¥ {numberWithCommas(data.standard_length * ((data.kanji_classes || 0) * KanjiPrice))} <br />
                </div>
              }
            </td>
            <td>¥ {numberWithCommas(extraClassesFee)}</td>
          </tr>
          <tr>
            <td><b>Accomodation arrangement Fee</b></td>
            <td></td>
            <td>¥ {numberWithCommas(accomodationArrangementFee)}</td>
          </tr>
          <tr>
            <td><b>Accommodation Fee</b></td>
            <td>
              {data.accomodation_type && data.accomodation_type.id !== 1 &&
              <div>
                {data.accomodation_type
                  && data.accomodation_type.label} - {accomodationLengthWeek} week(s) {accomodationLengthDay} nights <br />
                Check-in: {data.accomodation_start_date} <br />
                Check-out: {data.accomodation_end_date}
              </div>
              }
            </td>
            <td>¥ {numberWithCommas(accomodationFee)}</td>
          </tr>
          <tr>
            <td><b>Airport Pickup Fee</b></td>
            <td>{(data.accomodation_type && data.airport_pickup) ? airportPickupFeeType : 'No'}</td>
            <td>¥ {numberWithCommas(airportPickupFee)}</td>
          </tr>
          <tr>
            <td style={{ borderTop: 'none' }}></td>
            <td style={{ borderTop: 'none' }}><hr /></td>
            <td style={{ borderTop: 'none' }}></td>
          </tr>
          <tr>
            <td><b>Subtotal</b></td>
            <td></td>
            <td>¥ {numberWithCommas(subTotal)}</td>
          </tr>
          <tr>
            <td><b>Discount</b></td>
            <td></td>
            <td className="text-danger">- ¥ {numberWithCommas(discount)}</td>
          </tr>
          <tr>
            <td><b>TOTAL</b></td>
            <td></td>
            <td><b>¥ {numberWithCommas(total)}</b></td>
          </tr>
        </tbody>
      </table>
      <div className="my-2">
        <b>
          Additional discounts up to 20% might apply. For more information, <a href="https://meijiacademy.com/discount-information/" target="_blank" rel="noopener noreferrer">Click Here.</a>
        </b>
        <br />
        <b>
          All prices already include VAT (Consumption Tax).
        </b>
      </div>
    </React.Fragment>
  );
};

export default Calculation;
