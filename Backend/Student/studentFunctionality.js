/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = require('url');
const mysqlConnection = require('../mysqlConnection');
const { secret } = require('../config');
const Company = require('../model/Company');
const Student = require('../model/Student');
const Job = require('../model/Job');
const Static = require('../model/Static');

// get the details required for the student navigation bar
const navbar = async (req, res) => {
  const { StudentID } = url.parse(req.url, true).query;
  try {
    const resultData = [];
    await Student.findOne({ StudentID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Student not found');
      } else {
        resultData.push(results);
      }
    });
    await Company.find({}, { _id: 0, CompanyName: 1 }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Company Names not found');
      } else {
        resultData.push(results);
      }
    });
    await Job.find({}, { _id: 0, Title: 1 }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Jobs not found');
      } else {
        resultData.push(results);
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(resultData));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To fetch the avgRating of a company
const fetchAvgRating = async (ID) => {
  try {
    const fetchAvgRatingQuery = 'CALL avgRating(?)';
    const con = await mysqlConnection();
    const [results, fields] = await con.query(fetchAvgRatingQuery, ID);
    con.end();
    if (results[0][0].AvgRating === null) return 0;
    return results[0][0].AvgRating;
  } catch (error) {
    return 0;
  }
};

// fetch the results of the company search
const searchCompany = async (req, res) => {
  const { SearchString, State, PageNo } = url.parse(req.url, true).query;
  let resultData = [];
  const companyResult = [];
  if (SearchString.length === 0 && State.length === 0) {
    const companyResults = await Company.find()
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    const count = await Company.find().countDocuments();
    const noOfPages = Math.ceil(count / 4);
    for (let i = 0; i < companyResults.length; i += 1) {
      const ID = companyResults[i].CompanyID;
      const tempObj = {};
      tempObj.CompanyName = companyResults[i].CompanyID;
      tempObj.ProfileImg = companyResults[i].ProfileImg;
      tempObj.CompanyName = companyResults[i].CompanyName;
      tempObj.City = companyResults[i].City;
      tempObj.State = companyResults[i].State;
      tempObj.Website = companyResults[i].Website;
      tempObj.GeneralReviewCount = companyResults[i].GeneralReviewCount;
      tempObj.SalaryReviewCount = companyResults[i].SalaryReviewCount;
      tempObj.InterviewReviewCount = companyResults[i].InterviewReviewCount;
      // eslint-disable-next-line no-await-in-loop
      const avgRating = await fetchAvgRating(ID);
      tempObj.AvgRating = Math.round(avgRating * 10) / 10;
      companyResult.push(tempObj);
    }
    resultData = [companyResult, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  } else if (SearchString.length !== 0 && State.length === 0) {
    const companyResults = await Company.find({
      CompanyName: { $regex: `${SearchString}`, $options: 'i' },
    })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    const count = await Company.find().countDocuments({
      CompanyName: { $regex: `${SearchString}`, $options: 'i' },
    });
    const noOfPages = Math.ceil(count / 4);
    for (let i = 0; i < companyResults.length; i += 1) {
      const ID = companyResults[i].CompanyID;
      const tempObj = {};
      tempObj.CompanyName = companyResults[i].CompanyID;
      tempObj.ProfileImg = companyResults[i].ProfileImg;
      tempObj.CompanyName = companyResults[i].CompanyName;
      tempObj.City = companyResults[i].City;
      tempObj.State = companyResults[i].State;
      tempObj.Website = companyResults[i].Website;
      tempObj.GeneralReviewCount = companyResults[i].GeneralReviewCount;
      tempObj.SalaryReviewCount = companyResults[i].SalaryReviewCount;
      tempObj.InterviewReviewCount = companyResults[i].InterviewReviewCount;
      // eslint-disable-next-line no-await-in-loop
      const avgRating = await fetchAvgRating(ID);
      tempObj.AvgRating = Math.round(avgRating * 10) / 10;
      companyResult.push(tempObj);
    }
    resultData = [companyResult, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  } else if (SearchString.length === 0 && State.length !== 0) {
    const companyResults = await Company.find({
      State: { $regex: `${SearchString}`, $options: 'i' },
    })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    const count = await Company.find().countDocuments({
      State: { $regex: `${SearchString}`, $options: 'i' },
    });
    const noOfPages = Math.ceil(count / 4);
    for (let i = 0; i < companyResults.length; i += 1) {
      const ID = companyResults[i].CompanyID;
      const tempObj = {};
      tempObj.CompanyName = companyResults[i].CompanyID;
      tempObj.CompanyName = companyResults[i].CompanyName;
      tempObj.ProfileImg = companyResults[i].ProfileImg;
      tempObj.City = companyResults[i].City;
      tempObj.State = companyResults[i].State;
      tempObj.Website = companyResults[i].Website;
      tempObj.GeneralReviewCount = companyResults[i].GeneralReviewCount;
      tempObj.SalaryReviewCount = companyResults[i].SalaryReviewCount;
      tempObj.InterviewReviewCount = companyResults[i].InterviewReviewCount;
      // eslint-disable-next-line no-await-in-loop
      const avgRating = await fetchAvgRating(ID);
      tempObj.AvgRating = Math.round(avgRating * 10) / 10;
      companyResult.push(tempObj);
    }
    resultData = [companyResult, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  } else {
    const companyResults = await Company.find({
      $and: [
        { CompanyName: { $regex: `${SearchString}`, $options: 'i' } },
        { State: { $regex: `${State}`, $options: 'i' } },
      ],
    })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    const count = await Company.find().countDocuments({
      $and: [
        { CompanyName: { $regex: `${SearchString}`, $options: 'i' } },
        { State: { $regex: `${State}`, $options: 'i' } },
      ],
    });
    const noOfPages = Math.ceil(count / 4);
    for (let i = 0; i < companyResults.length; i += 1) {
      const ID = companyResults[i].CompanyID;
      const tempObj = {};
      tempObj.CompanyName = companyResults[i].CompanyID;
      tempObj.ProfileImg = companyResults[i].ProfileImg;
      tempObj.CompanyName = companyResults[i].CompanyName;
      tempObj.City = companyResults[i].City;
      tempObj.State = companyResults[i].State;
      tempObj.Website = companyResults[i].Website;
      tempObj.GeneralReviewCount = companyResults[i].GeneralReviewCount;
      tempObj.SalaryReviewCount = companyResults[i].SalaryReviewCount;
      tempObj.InterviewReviewCount = companyResults[i].InterviewReviewCount;
      // eslint-disable-next-line no-await-in-loop
      const avgRating = await fetchAvgRating(ID);
      tempObj.AvgRating = Math.round(avgRating * 10) / 10;
      companyResult.push(tempObj);
    }
    resultData = [companyResult, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  }
};

// update the company profile
const companyProfileUpdate = async (req, res) => {
  try {
    const {
      CompanyID,
      Website,
      Size,
      Type,
      Revenue,
      Headquarter,
      Industry,
      Founded,
      CompanyMission,
      CEO,
      CompanyDescription,
    } = req.body;
    Company.findOneAndUpdate(
      { CompanyID },
      {
        Website,
        Size,
        Type,
        Revenue,
        Headquarter,
        Industry,
        Founded,
        CompanyMission,
        CEO,
        CompanyDescription,
      },
      (e, output) => {
        if (e) {
          res.writeHead(404, {
            'Content-Type': 'text/plain',
          });
          res.end('Entry Not Found');
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Profile Updated'));
        }
      },
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the suggested jobs for students
const getJobSuggestions = async (req, res) => {
  const { StudentID } = url.parse(req.url, true).query;
  let jobTitle = '';
  let resultData = [];
  try {
    await Student.findOne({ StudentID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Student not found');
      } else {
        jobTitle = results.JobTitle;
      }
    });
    /* eslint-disable*/
    await Job.find({ Title: { $regex: `.*${jobTitle}.*` } }).limit(4).exec(function(err, results){
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Jobs not found');
      } else {
        if (results.length == 4) {
          resultData = results;
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify(resultData));
        } else {
          resultData = results;
          Job.find({}).sort({ PostedDate: -1 }).limit(4 - resultData.length).exec(function(err, results) {
            if (err) {
              res.writeHead(500, {
                'Content-Type': 'text/plain',
              });
              res.end('Jobs not found');
            } else {
              resultData = resultData.concat(results);
              
              res.writeHead(200, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify(resultData));
            }
          });
        }
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

module.exports = {
  navbar,
  searchCompany,
  getJobSuggestions,
};
