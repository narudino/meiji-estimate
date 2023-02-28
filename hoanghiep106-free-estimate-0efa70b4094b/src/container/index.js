import React from 'react';
import toastr from 'toastr';
import cnames from 'classnames';
import axios from 'axios';
import CourseChoices from 'components/CourseChoices';
import Accomodation from 'components/Accomodation';
import ContactInfomation from 'components/ContactInfomation';
import LoadingIndicator from 'components/LoadingIndicator';
import Calculation from 'components/Calculation';

const validateCourse = (data) => {
  const requiredFields = ['standard_length', 'course_start_date'];
  const errors = {};
  requiredFields.forEach((field) => {
    if (!data[field] || data[field] === '') errors[field] = 'Required';
  });
  return errors;
};

const validateAccomodation = (data) => {
  const requiredFields = ['accomodation_type'];
  const errors = {};
  requiredFields.forEach((field) => {
    if (!data[field] || data[field] === '') errors[field] = 'Required';
  });
  if (data.accomodation_type && data.accomodation_type.id !== 1) {
    if (!data.accomodation_start_date) {
      errors.accomodation_start_date = 'Required';
    }
    if (!data.accomodation_end_date) {
      errors.accomodation_end_date = 'Required';
    }
  }
  if (data.airport_pickup && !data.pickup_info) {
    errors.pickup_info = 'Required';
  }
  return errors;
};

const validateContact = (data) => {
  const requiredFields = ['first_name', 'last_name', 'email', 'birth_day', 'gender', 'nationality', 'resident_country'];
  const errors = {};
  requiredFields.forEach((field) => {
    if (!data[field] || data[field] === '') errors[field] = 'Required';
  });
  return errors;
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    const dataString = localStorage.getItem('freeEstimate');
    const data = dataString ? JSON.parse(dataString) : {};
    this.state = {
      data,
      steps: [
        {
          name: 'Course',
          component: CourseChoices,
          validate: validateCourse,
        },
        {
          name: 'Accomodation',
          component: Accomodation,
          validate: validateAccomodation,
        },
        {
          name: 'Contact Information',
          component: ContactInfomation,
          validate: validateContact,
        },
      ],
      currentStepIndex: 0,
      errors: {},
    };
  }

  handleChange = (key, value) => {
    const { data } = this.state;
    data[key] = value;
    this.setState({ data }, () => localStorage.setItem('freeEstimate', JSON.stringify(data)));
  }

  handleChangeStep(indexChange) {
    if (indexChange > 0 && !this.validate()) return;
    this.setState({ currentStepIndex: this.state.currentStepIndex + indexChange });
  }

  validate() {
    const { data, steps, currentStepIndex } = this.state;
    const validate = this.state.steps[this.state.currentStepIndex].validate;
    const errors = validate(data);
    if (currentStepIndex === steps.length - 1 && !this.state.acceptedTos) errors.tos = "Haven't accepted the terms and conditions";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = () => {
    if (!this.validate()) return;
    this.setState({ submitting: true });
    axios({
      method: 'post',
      url: 'https://api.meijiinternships.com/free-estimate',
      // url: 'http://localhost:3001/free-estimate',
      data: this.state.data,
    }).then((res) => {
      if (res.data && res.data.success) {
        localStorage.clear();
        window.location.href = 'https://www.meijiacademy.com/thank-you';
      } else {
        this.setState({ submitting: false });
        toastr.error('Service not available. Please try again later.');
      }
    }).catch((e) => {
      console.error(e);
      this.setState({ submitting: false });
      toastr.error('Service not available. Please try again later.');
    });
  }

  render() {
    const {
      steps, currentStepIndex, data, errors,
    } = this.state;
    const StepComponent = steps[currentStepIndex].component;
    const isLastStep = currentStepIndex === steps.length - 1;
    const nextButtonText = isLastStep ? 'Submit' : 'Continue';
    return (
      <div className="container mb-5 pb-5">
        <div className="row my-3">
          <ul className="progressbar">
            {steps.map((step, idx) => (
              <li key={step.name} className={cnames({ complete: idx <= currentStepIndex })}>
                {step.name}
              </li>
            ))}
          </ul>
        </div>
        {isLastStep && <Calculation data={data} />}
        <div className="text-center py-3 main-text">{steps[currentStepIndex].name}</div>
        <hr
          className="mb-4"
          style={{
            width: '60px', margin: '0 auto', height: '1.5px', background: '#cc1f30',
          }}
        />
        {!isLastStep &&
          <p className="text-center side-text my-4">
            Courses can start on any Monday and end on any Friday. Please apply at least one month before your intended start date.
          </p>
        }
        <StepComponent data={data} errors={errors} onChange={this.handleChange} />
        <div className="text-left text-danger my-2">
          {Object.keys(errors).filter(k => k !== 'tos').length > 0 && 'Please complete the required field'}
        </div>
        {isLastStep &&
          <label className="checkbox">
            <input
              type="checkbox"
              checked={this.state.acceptedTos}
              onChange={e => this.setState({ acceptedTos: e.target.checked })}
              className="mr-2"
            />
            I have read and accept Meiji Academy’s <a href="https://meijiacademy.com/terms-conditions/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
            <div className="mt-2 text-danger">{errors.tos}</div>
          </label>
        }
        <div className="text-center my-4">
          {currentStepIndex !== 0 &&
            <button className="btn btn-back btn-light" onClick={() => this.handleChangeStep(-1)}>
              Back
            </button>
          }
          <button className="btn btn-main ml-2" disabled={this.state.submitting} onClick={isLastStep ? this.handleSubmit : () => this.handleChangeStep(1)}>
            {this.state.submitting ? <LoadingIndicator /> : nextButtonText}
          </button>
        </div>
      </div>
    );
  }
}

export default Container;
