const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    CompanyID: { type: String, required: true },
    CompanyName: { type: String },
    Website: { type: String },
    Size: { type: Number },
    ProfileImg: { type: String },
    Type: { type: String },
    Revenue: { type: Number },
    Headquarter: { type: String },
    Industry: { type: String },
    Founded: { type: Date },
    CompanyDescription: { type: String },
    City: { type: String },
    State: { type: String },
    CompanyMission: { type: String },
    CEO: { type: String },
    ViewCount: { type: Number, default: 0 },
    SalaryReviewCount: { type: Number, default: 0 },
    GeneralReviewCount: { type: Number, default: 0 },
    InterviewReviewCount: { type: Number, default: 0 },
    TotalGeneralReviewRating: { type: Number, default: 0 },
    JobCount: { type: Number, default: 0 },
    CoverPhoto: { type: String },
    PhotoCount: { type: Number, default: 0 },
    FeaturedReview: {
      Status: {
        type: String,
        enum: ['NotApproved', 'Approved', 'Disapproved'],
      },
      CompanyName: { type: String },
      StudentID: { type: Number },
      Pros: { type: String },
      Cons: { type: String },
      Descriptions: { type: String },
      Rating: { type: Number },
      EmployeeStatus: {
        type: String,
        enum: ['Current', 'Former'],
      },
      Helpful: { type: Number },
      CEOApproval: { type: Boolean },
      JobType: {
        type: String,
        enum: ['FullTime', 'PartTime', 'Contract', 'Intern', 'Freelance'],
      },
      Recommended: { type: Boolean },
      JobTitle: { type: String },
      Headline: { type: String },
      DatePosted: { type: Date },
      Response: { type: String },
      Favorite: { type: Boolean },
    },

    SalaryReview: [
      {
        Status: {
          type: String,
          enum: ['Not Approved', 'Approved', 'Disapproved'],
        },
        DatePosted: { type: Date },
        BaseSalary: { type: Number },
        Bonuses: { type: Number },
        JobTitle: { type: String },
        Years: { type: Number },
        StreetAddress: { type: String },
        State: { type: String },
        Country: { type: String },
        Zip: { type: Number, min: 10000, max: 99999 },
      },
    ],
    InterviewReview: [
      {
        Status: {
          type: String,
          enum: ['Not Approved', 'Approved', 'Disapproved'],
        },
        Helpful: { type: Number },
        DatePosted: { type: Date },
        OverallExperience: {
          type: String,
          enum: ['Positive', 'Negative', 'Neutral'],
        },
        JobTitle: { type: String },
        Description: { type: String },
        Difficulty: {
          type: String,
          enum: ['Easy', 'Average', 'Difficult'],
        },
        OfferStatus: {
          type: String,
          enum: ['Rejected', 'Accepted'],
        },
        InterviewQuestions: { type: String },
        Answers: { type: String },
      },
    ],
    Photos: [String],
    JobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Entry Level'],
    },
  },
  {
    versionKey: false,
  }
);

mongoose.set('useCreateIndex', true);
CompanySchema.index({ CompanyName: 1 }, { unique: true });
module.exports = mongoose.model('company', CompanySchema);
