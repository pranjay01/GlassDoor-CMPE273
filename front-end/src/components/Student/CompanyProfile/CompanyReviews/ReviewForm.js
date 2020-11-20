import React, { Component } from 'react';
import './ReviewForm.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { history } from '../../../../App';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      employeeStatus: 'Current',
      year: '',
      jobTitle: '',
      headline: '',
      pros: '',
      cons: '',
      approveOfCEO: '',
      recommendAFriend: '',
      openStatusDropDown: false,
      employmentType: 'Select',
      invalidData: true,
      description: '',
      formSubmiited: false,
    };
  }

  validationCheck = () => {
    let invalidData = false;
    if (this.state.rating === 0) {
      invalidData = true;
    }
    if (this.state.employeeStatus === 'Former') {
      if (this.state.year === '' || this.state.year === 0 || this.state.year < 1000) {
        invalidData = true;
      }
    }
    if (this.state.employmentType === 'Select') {
      invalidData = true;
    }
    if (this.state.jobTitle.length === 0) {
      invalidData = true;
    }
    if (this.state.headline.length === 0) {
      invalidData = true;
    }
    if (this.state.pros.length < 20) {
      invalidData = true;
    }
    if (this.state.cons.length < 20) {
      invalidData = true;
    }
    if (this.state.approveOfCEO === '') {
      invalidData = true;
    }
    if (this.state.recommendAFriend === '') {
      invalidData = true;
    }
    this.setState({
      invalidData,
    });
  };

  setRating = (event, value) => {
    event.preventDefault();
    this.setState(
      {
        rating: value,
        openStatusDropDown: false,
      },
      this.validationCheck()
    );
  };

  commonOnChangeHandler = (event) => {
    // event.preventDefault();
    this.setState(
      {
        [event.target.name]: event.target.value,
        openStatusDropDown: false,
      },
      this.validationCheck()
    );
  };

  ceoPerformance = (event, value) => {
    event.preventDefault();
    this.setState(
      {
        approveOfCEO: value,
        openStatusDropDown: false,
      },
      this.validationCheck()
    );
  };

  recommend = (event, value) => {
    event.preventDefault();
    this.setState(
      {
        recommendAFriend: value,
        openStatusDropDown: false,
      },
      this.validationCheck()
    );
  };

  switchEmployeeStatus = (event, status) => {
    event.preventDefault();
    this.setState(
      {
        employeeStatus: status,
        openStatusDropDown: false,
      },
      this.validationCheck()
    );
  };

  togglestatusDropDown = () => {
    this.setState({
      openStatusDropDown: !this.state.openStatusDropDown,
    });
  };

  selectEmploymentType = (event, status) => {
    event.preventDefault();
    this.setState(
      {
        employmentType: status,
      },
      this.validationCheck()
    );
  };

  submitReview = (event) => {
    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      CompanyID: localStorage.getItem('companyID'),
      StudentID: localStorage.getItem('userId'),
      CompanyName: localStorage.getItem('form_company_name'),
      Pros: this.state.pros,
      Cons: this.state.cons,
      Description: this.state.description,
      Rating: this.state.rating,
      EmployeeStatus: this.state.employeeStatus,
      CEOApproval: this.state.approveOfCEO,
      JobType: this.state.employmentType,
      Recommended: this.state.recommendAFriend,
      JobTitle: this.state.jobTitle,
      Headline: this.state.headline,
    };
    axios.post(serverUrl + 'student/addReview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Review Submitted');
          this.setState({
            rating: 0,
            employeeStatus: 'Current',
            year: '',
            jobTitle: '',
            headline: '',
            pros: '',
            cons: '',
            approveOfCEO: '',
            recommendAFriend: '',
            openStatusDropDown: false,
            employmentType: 'Select',
            invalidData: true,
            description: '',
            formSubmiited: true,
          });
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  companyPage = () => {
    // history.push('/CompanyPage');
    this.props.history.goBack();
    this.props.history.goBack();
  };

  render() {
    console.log('this.props.location', this.props.location);
    console.log('history', history);
    return (
      <main id="mount">
        <div>
          <header id="header">
            <div class="background">
              <nav>
                <div class="logoContainer">
                  <a class="logo green " aria-label="Go To Glassdoor homepage"></a>
                </div>
              </nav>
            </div>
          </header>
          <div class="article-aside gdGrid">
            <article class="module">
              <div class="d-flex align-items-end">
                <h1 class="tight">Rate a Company</h1>
              </div>
              <p class="subtle">
                <span>
                  It only takes a minute! And your anonymous review will help other job seekers.
                </span>
              </p>
              <div class="survey-two-column">
                <div style={{ width: '15%' }} class="d-none d-md-block col-md-4">
                  <a href="#" onClick={this.companyPage}>
                    <button
                      class="gd-ui-button m-0 p-0 d-flex justify-content-start align-items-center resumeImportStyle__backBtn___3NR7k css-1c2vj07"
                      data-test="backBtn"
                    >
                      <span class="SVGInline mr-xsm backIcon">
                        <svg
                          class="SVGInline-svg mr-xsm-svg backIcon-svg"
                          style={{ width: '10px', height: '12px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 10 13"
                          width="24"
                        >
                          <path
                            stroke-width="2"
                            d="M9 1L2 6.5 9 12"
                            fill="none"
                            stroke="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <span>Back</span>
                    </button>
                  </a>
                </div>
                <div>
                  <form
                    //onSubmit={this.submitReview}
                    class="stacked-label employer-survey"
                  >
                    <div class="sunset-employer undefined">
                      <input type="hidden" value="" />
                      <div class="ajax-input">
                        <label>Company</label>
                        <div class="ajax-input sunsetEmployerDropdown css-1ohf0ui">
                          <div
                            aria-expanded="false"
                            role="combobox"
                            aria-autocomplete="list"
                            class="css-1xtvih1"
                          >
                            <div class=" css-1ohf0ui">
                              <div class="input-wrapper css-q444d9">
                                <input
                                  placeholder="Company"
                                  autocomplete="off"
                                  name="employerName"
                                  id="employerName-f088e4-77f-51ef-16fe-c21ddc34c32"
                                  data-test=""
                                  aria-label=""
                                  class="css-1sk6eli"
                                  value={localStorage.getItem('form_company_name')}
                                />
                              </div>
                            </div>
                            {/* <ul class="suggestions up">
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/6036/amazon-squarelogo-1552847650117.png"
                                      alt="Amazon"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span>
                                    </span>
                                    <span class="website">www.amazon.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/1324363/amazon-flex-squarelogo-1502775346513.png"
                                      alt="Amazon Flex"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span> Flex
                                    </span>
                                    <span class="website">flex.amazon.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/267709/lab126-squarelogo.png"
                                      alt="Amazon Lab126"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span> Lab126
                                    </span>
                                    <span class="website">www.lab126.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/1125115/amazon-robotics-squarelogo-1488995396779.png"
                                      alt="Amazon Robotics"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span> Robotics
                                    </span>
                                    <span class="website">www.amazonrobotics.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/1919947/amazon-prime-now-squarelogo-1523253274644.png"
                                      alt="Amazon Prime Now"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span> Prime Now
                                    </span>
                                    <span class="website">primenow.amazon.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo"></span>
                                  <span>
                                    <span class="suggestionLabel">
                                      <span class="query">Amazon</span> Logistics
                                    </span>
                                    <span class="website">www.amazonlogisticsgroup.com</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/870167/federal-university-of-amazonas-squarelogo-1568287909705.png"
                                      alt="UFAM - Universidade Federal do Amazonas"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      UFAM - Universidade Federal do{' '}
                                      <span class="query">Amazon</span>as
                                    </span>
                                    <span class="website">ufam.edu.br</span>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div class="" role="presentation">
                                  <span class="logo">
                                    <img
                                      src="https://media.glassdoor.com/sqlm/2485969/polícia-militar-do-estado-do-amazonas-squarelogo-1553483566273.png"
                                      alt="Polícia Militar do Estado do Amazonas (PMAM)"
                                    />
                                  </span>
                                  <span>
                                    <span class="suggestionLabel">
                                      Polícia Militar do Estado do <span class="query">Amazon</span>
                                      as (PMAM)
                                    </span>
                                    <span class="website">pm.am.gov.br</span>
                                  </span>
                                </div>
                              </li>
                            </ul>
    */}
                            <div>
                              <div data-test="FilterChips"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{' '}
                    <div class="star-rating-input">
                      <label>Overall Rating*</label>
                      <div
                        onClick={(event) => this.setRating(event, 1)}
                        class={this.state.rating >= 1 ? 'selected' : ''}
                      >
                        <label for="questionIdToAnswerMap[1]_1">
                          <span>Very Dissatisfied</span>
                        </label>
                        <input
                          class="hidden"
                          type="radio"
                          name="questionIdToAnswerMap[1]"
                          id="questionIdToAnswerMap[1]_1"
                          value="1"
                        />
                      </div>
                      <div
                        onClick={(event) => this.setRating(event, 2)}
                        class={this.state.rating >= 2 ? 'selected' : ''}
                      >
                        <label for="questionIdToAnswerMap[1]_2">
                          <span>Dissatisfied</span>
                        </label>
                        <input
                          class="hidden"
                          type="radio"
                          name="questionIdToAnswerMap[1]"
                          id="questionIdToAnswerMap[1]_2"
                          value="2"
                        />
                      </div>
                      <div
                        onClick={(event) => this.setRating(event, 3)}
                        class={this.state.rating >= 3 ? 'selected' : ''}
                      >
                        <label for="questionIdToAnswerMap[1]_3">
                          <span>Neutral ("OK")</span>
                        </label>
                        <input
                          class="hidden"
                          type="radio"
                          name="questionIdToAnswerMap[1]"
                          id="questionIdToAnswerMap[1]_3"
                          value="3"
                        />
                      </div>
                      <div
                        onClick={(event) => this.setRating(event, 4)}
                        class={this.state.rating >= 4 ? 'selected' : ''}
                      >
                        <label for="questionIdToAnswerMap[1]_4">
                          <span>Satisfied</span>
                        </label>
                        <input
                          class="hidden"
                          type="radio"
                          name="questionIdToAnswerMap[1]"
                          id="questionIdToAnswerMap[1]_4"
                          value="4"
                        />
                      </div>
                      <div
                        onClick={(event) => this.setRating(event, 5)}
                        class={this.state.rating >= 5 ? 'selected' : ''}
                      >
                        <label for="questionIdToAnswerMap[1]_5">
                          <span>Very Satisfied</span>
                        </label>
                        <input
                          class="hidden"
                          type="radio"
                          name="questionIdToAnswerMap[1]"
                          id="questionIdToAnswerMap[1]_5"
                          value="5"
                        />
                      </div>
                    </div>{' '}
                    <div>
                      <div class="button-set ">
                        <label>Are you a current or former employee?</label>
                        <div>
                          <div
                            onClick={(event) => this.switchEmployeeStatus(event, 'Current')}
                            class={this.state.employeeStatus === 'Current' ? 'selected' : ''}
                            tabindex="0"
                          >
                            <label for="employerUIData.state.employerReview.currentJob_true">
                              Current
                            </label>
                            <input
                              class="hidden"
                              type="radio"
                              name="employerUIData.state.employerReview.currentJob"
                              id="employerUIData.state.employerReview.currentJob_true"
                              value="true"
                              checked=""
                            />
                          </div>
                          <div
                            onClick={(event) => this.switchEmployeeStatus(event, 'Former')}
                            class={this.state.employeeStatus === 'Former' ? 'selected' : ''}
                            tabindex="0"
                          >
                            <label for="employerUIData.state.employerReview.currentJob_false">
                              Former
                            </label>
                            <input
                              class="hidden"
                              type="radio"
                              name="employerUIData.state.employerReview.currentJob"
                              id="employerUIData.state.employerReview.currentJob_false"
                              value="false"
                            />
                          </div>
                        </div>
                      </div>
                    </div>{' '}
                    <div
                      style={{
                        display: this.state.employeeStatus === 'Current' ? 'none' : 'block',
                      }}
                      class="jobTitleFull"
                    >
                      <input type="hidden" name="jobTitleId" value="4279" />
                      <div class=" css-1ohf0ui">
                        <label
                          for="jobTitle-7327738-af11-0ba3-d651-5ccb8dbe41b"
                          class="css-1opum1l"
                        >
                          <span>Last Year at {localStorage.getItem('form_company_name')}*</span>
                        </label>
                        <div
                          aria-expanded="false"
                          role="combobox"
                          aria-autocomplete="list"
                          class="css-1xtvih1"
                        >
                          <div class=" css-1ohf0ui">
                            <div class="input-wrapper css-q444d9">
                              <input
                                onChange={this.commonOnChangeHandler}
                                type="number"
                                placeholder="Year"
                                autocomplete="off"
                                name="year"
                                max="4"
                                id="jobTitle-7327738-af11-0ba3-d651-5ccb8dbe41b"
                                data-test=""
                                aria-label="Your Job Title at Amazon"
                                class="css-1sk6eli"
                                value={this.state.year}
                              />
                            </div>
                          </div>
                          <ul class="suggestions down"></ul>
                          <div>
                            <div data-test="FilterChips"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-std ajax-input css-1ohf0ui">
                      <label for="" class="css-1opum1l">
                        <span>Employment Status*</span>
                      </label>
                      <select
                        data-test=""
                        name="dropdown"
                        aria-label="Employment Status*"
                        style={{ display: 'none' }}
                      >
                        <option value="REGULAR"></option>
                        <option value="PART_TIME"></option>
                        <option value="CONTRACT"></option>
                        <option value="INTERN"></option>
                        <option value="FREELANCE"></option>
                      </select>
                      <div
                        onClick={this.togglestatusDropDown}
                        tabindex="0"
                        direction="auto"
                        aria-expanded="false"
                        role="listbox"
                        aria-activedescendant="option_0_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                        aria-label="Employment Status*"
                        class="css-e0ra1d"
                      >
                        <div class="selectedLabel">
                          {this.state.employmentType}
                          <span
                            alt=""
                            class={`SVGInline ${
                              this.state.openStatusDropDown ? 'arrowUp' : 'arrowDown'
                            }`}
                          >
                            <svg
                              class={`SVGInline-svg ${
                                this.state.openStatusDropDown ? 'arrowUp' : 'arrowDown'
                              }-svg`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                fill-rule="evenodd"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                        </div>
                        <div
                          class={
                            this.state.openStatusDropDown
                              ? 'dropdownOptions dropdownExpanded animated  '
                              : 'dropdownOptions dropdownCollapsed animated  '
                          }
                        >
                          <div class="dropDownOptionsContainer">
                            <ul>
                              <li
                                onClick={(event) => this.selectEmploymentType(event, 'Full Time')}
                                class={`dropdownOption  ${
                                  this.state.employmentType === 'Full Time' ? 'checked' : ''
                                } `}
                                role="option"
                                aria-selected="true"
                                id="option_0_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                              >
                                <div class="checkmark">
                                  <span alt="" class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <span class="dropdownOptionLabel">Full Time</span>
                              </li>
                              <li
                                onClick={(event) => this.selectEmploymentType(event, 'Part Time')}
                                class={`dropdownOption  ${
                                  this.state.employmentType === 'Part Time' ? 'checked' : ''
                                } `}
                                // class="dropdownOption   "
                                role="option"
                                aria-selected="false"
                                id="option_1_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                              >
                                <div class="checkmark">
                                  <span alt="" class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <span class="dropdownOptionLabel">Part Time</span>
                              </li>
                              <li
                                onClick={(event) => this.selectEmploymentType(event, 'Contract')}
                                class={`dropdownOption  ${
                                  this.state.employmentType === 'Contract' ? 'checked' : ''
                                } `}
                                role="option"
                                aria-selected="false"
                                id="option_2_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                              >
                                <div class="checkmark">
                                  <span alt="" class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <span class="dropdownOptionLabel">Contract</span>
                              </li>
                              <li
                                onClick={(event) => this.selectEmploymentType(event, 'Intern')}
                                class={`dropdownOption  ${
                                  this.state.employmentType === 'Intern' ? 'checked' : ''
                                } `}
                                role="option"
                                aria-selected="false"
                                id="option_3_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                              >
                                <div class="checkmark">
                                  <span alt="" class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <span class="dropdownOptionLabel">Intern</span>
                              </li>
                              <li
                                onClick={(event) => this.selectEmploymentType(event, 'Freelance')}
                                class={`dropdownOption  ${
                                  this.state.employmentType === 'Freelance' ? 'checked' : ''
                                } `}
                                // class="dropdownOption   "
                                role="option"
                                aria-selected="false"
                                id="option_4_a035ce-f3ba-4d0f-3d51-a328ed00a84"
                              >
                                <div class="checkmark">
                                  <span alt="" class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <span class="dropdownOptionLabel">Freelance</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="jobTitleFull">
                      <input type="hidden" name="jobTitleId" value="4279" />
                      <div class=" css-1ohf0ui">
                        <label
                          for="jobTitle-7327738-af11-0ba3-d651-5ccb8dbe41b"
                          class="css-1opum1l"
                        >
                          <span>
                            Your Job Title at {localStorage.getItem('form_company_name')}*
                          </span>
                        </label>
                        <div
                          aria-expanded="false"
                          role="combobox"
                          aria-autocomplete="list"
                          class="css-1xtvih1"
                        >
                          <div class=" css-1ohf0ui">
                            <div class="input-wrapper css-q444d9">
                              <input
                                required
                                onChange={this.commonOnChangeHandler}
                                placeholder="Title"
                                autocomplete="off"
                                name="jobTitle"
                                id="jobTitle-7327738-af11-0ba3-d651-5ccb8dbe41b"
                                data-test=""
                                aria-label="Your Job Title at Amazon"
                                class="css-1sk6eli"
                                value={this.state.jobTitle}
                              />
                            </div>
                          </div>
                          <ul class="suggestions down"></ul>
                          <div>
                            <div data-test="FilterChips"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="fill css-1ohf0ui">
                      <label for="reviewTitle" class="css-1opum1l">
                        <span>Review Headline*</span>
                      </label>
                      <div class="input-wrapper css-q444d9">
                        <input
                          required
                          onChange={this.commonOnChangeHandler}
                          id="reviewTitle"
                          name="headline"
                          data-test=""
                          aria-label=""
                          class="css-1sk6eli"
                          value={this.state.headline}
                        />
                      </div>
                    </div>
                    <div class="fill css-1ohf0ui">
                      <label for="reviewTitle" class="css-1opum1l">
                        <span>Review description*</span>
                      </label>
                      <div class="input-wrapper css-q444d9">
                        <input
                          required
                          onChange={this.commonOnChangeHandler}
                          id="reviewTitle"
                          name="description"
                          data-test=""
                          aria-label=""
                          class="css-1sk6eli"
                          value={this.state.description}
                        />
                      </div>
                    </div>
                    <div class=" css-1ohf0ui">
                      <label for="upsides" class="css-1opum1l">
                        <span>Pros*</span>
                      </label>
                      <div class="input-wrapper css-q444d9">
                        <textarea
                          required
                          minLength="20"
                          onChange={this.commonOnChangeHandler}
                          id="upsides"
                          name="pros"
                          placeholder={`Share some of the best reasons to work at ${localStorage.getItem(
                            'form_company_name'
                          )}`}
                          data-test=""
                          aria-label=""
                          class="css-14wuk54"
                          value={this.state.pros}
                        ></textarea>
                      </div>
                      <div data-test="helper" class="css-1pakod1">
                        20 characters minimum
                      </div>
                    </div>
                    <div class=" css-1ohf0ui">
                      <label for="downsides" class="css-1opum1l">
                        <span>Cons*</span>
                      </label>
                      <div class="input-wrapper css-q444d9">
                        <textarea
                          required
                          inputProps={{ minLength: 20 }}
                          onChange={this.commonOnChangeHandler}
                          id="downsides"
                          name="cons"
                          placeholder={`Share some of the downsides of working at ${localStorage.getItem(
                            'form_company_name'
                          )}`}
                          data-test=""
                          aria-label=""
                          class="css-14wuk54"
                          value={this.state.cons}
                        ></textarea>
                      </div>
                      <div data-test="helper" class="css-1pakod1">
                        20 characters minimum
                      </div>
                    </div>
                    <div class="slide open">
                      <hr />
                      <h2>
                        Ratings <span class="minor subtle">(Optional)</span>
                      </h2>
                      <div data-test="rateCeo">
                        <div class="rating-item-group thumb-rating-item-group ">
                          <label>
                            Rate CEO Job Performance, {localStorage.getItem('form_ceo_name')}
                          </label>
                          <div>
                            <div class="items">
                              <div
                                onClick={(event) => this.ceoPerformance(event, 1)}
                                class={this.state.approveOfCEO === 1 ? 'selected' : ''}
                              >
                                <input
                                  type="radio"
                                  name="questionIdToAnswerMap[300]"
                                  aria-label="questionIdToAnswerMap[300]_1"
                                  value="0"
                                />
                              </div>
                              <div
                                onClick={(event) => this.ceoPerformance(event, 0)}
                                class={this.state.approveOfCEO === 0 ? 'selected' : ''}
                              >
                                <input
                                  type="radio"
                                  name="questionIdToAnswerMap[300]"
                                  aria-label="questionIdToAnswerMap[300]_3"
                                  value="1"
                                />
                              </div>
                            </div>
                            <div class="opinion-text minor subtle center">
                              <i>&nbsp;</i>
                            </div>
                          </div>
                        </div>
                        <input type="hidden" name="state.selectedCeoId" value="86913" />
                        <hr />
                      </div>
                      <div
                        class="rating-item-group thumb-rating-item-group-no-neutral "
                        aria-label="questionIdToAnswerMap[16]"
                      >
                        <label for="questionIdToAnswerMap[16]">Recommend to a friend?</label>
                        <div>
                          <div class="items">
                            <div
                              onClick={(event) => this.recommend(event, 11)}
                              class={this.state.recommendAFriend === 1 ? 'selected' : ''}
                            >
                              <input
                                type="radio"
                                name="questionIdToAnswerMap[16]"
                                aria-label="questionIdToAnswerMap[16]_1"
                                value="1"
                              />
                            </div>
                            <div
                              onClick={(event) => this.recommend(event, 0)}
                              class={this.state.recommendAFriend === 0 ? 'selected' : ''}
                            >
                              <input
                                type="radio"
                                name="questionIdToAnswerMap[16]"
                                aria-label="questionIdToAnswerMap[16]_2"
                                value="2"
                              />
                            </div>
                          </div>
                          <div class="opinion-text minor subtle center">
                            <i>&nbsp;</i>
                          </div>
                        </div>
                      </div>
                      <div class="hidden">
                        <p class="subtle">Custom Amazon Questions</p>
                      </div>
                    </div>
                    <div class="submitBtn">
                      {this.state.formSubmiited ? (
                        <div data-test="helper" class="css-1pakod1">
                          Review has been submitted succesfully
                        </div>
                      ) : (
                        ''
                      )}
                      <a onClick={this.submitReview} href="#">
                        <button
                          disabled={this.state.invalidData}
                          class="gd-ui-button  css-8i7bc2"
                          type="button"
                        >
                          Submit Review
                        </button>
                      </a>
                      {this.state.invalidData ? (
                        <div data-test="helper" class="css-1pakod1">
                          Fill all fields before submission
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }
}

export default ReviewForm;
