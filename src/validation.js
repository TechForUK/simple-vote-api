function validation(userData){

  const lenTextFields = 50;

  try {      
    if(validEmail(userData.email) == false){
      console.log('Email validation failed');
      return false;
    }

    if(userData.surname.length > lenTextFields || typeof userData.surname !== 'string'){
      console.log('Surname validation failed ' + typeof userData.surname);
      return false;
    }

    if(userData.firstName.length > lenTextFields || typeof userData.firstName !== 'string'){
      console.log('firstName validation failed ' + typeof userData.firstName);
      return false;
    }

    if(userData.firstLineAddress.length > lenTextFields || typeof userData.firstLineAddress !== 'string'){
      console.log('firstLineAddress validation failed ' + typeof userData.firstLineAddress);
      return false;
    }

    if(userData.secondLineAddress.length > lenTextFields || typeof userData.secondLineAddress !== 'string'){
      console.log('secondLineAddress validation failed ' + typeof userData.secondLineAddress);
      return false;
    }

    if(userData.postcode.length > lenTextFields || typeof userData.postcode !== 'string'){
      console.log('postcode validation failed ' + typeof userData.postcode);
      return false;
    }

    if(userData.city.length > lenTextFields || typeof userData.city !== 'string'){
      console.log('city validation failed ' + typeof userData.city);
      return false;
    }

    

    if (typeof userData.differentAddress !== 'boolean'){
      console.log('differentAddress boolean check failed ' + typeof userData.differentAddress);
      return false;
    }
    else if(userData.differentAddress)
    {
      if(userData.firstLineCurrentAddress.length > lenTextFields || typeof userData.firstLineCurrentAddress !== 'string'){
        console.log('firstLineCurrentAddress validation failed ' + typeof userData.firstLineCurrentAddress);
        return false;
      }

      if(userData.secondLineCurrentAddress.length > lenTextFields || typeof userData.secondLineCurrentAddress !== 'string'){
        console.log('secondLineCurrentAddress validation failed ' + typeof userData.secondLineCurrentAddress);
        return false;
      }

      if(userData.currentPostcode.length > lenTextFields || typeof userData.currentPostcode !== 'string'){
        console.log('currentPostcode validation failed ' + typeof userData.currentPostcode);
        return false;
      }

      if(userData.currentCity.length > lenTextFields || typeof userData.currentCity !== 'string'){
        console.log('currentCity validation failed ' + typeof userData.currentCity);
        return false;
      }
    }

    if (typeof userData.movedHouse !== 'boolean'){
      console.log('movedHouse boolean check failed ' + typeof userData.movedHouse);
      return false;
    }
    else if(userData.movedHouse){
      if(userData.oldAddressFirstLineAddress.length > lenTextFields || typeof userData.oldAddressFirstLineAddress !== 'string'){
        console.log('oldAddressFirstLineAddress validation failed ' + typeof userData.oldAddressFirstLineAddress);
        return false;
      }

      if(userData.oldAddressSecondLineAddress.length > lenTextFields || typeof userData.oldAddressSecondLineAddress !== 'string'){
        console.log('oldAddressSecondLineAddress validation failed ' + typeof userData.oldAddressSecondLineAddress);
        return false;
      }

      if(userData.oldAddressPostcode.length > lenTextFields || typeof userData.oldAddressPostcode !== 'string'){
        console.log('oldAddressPostcode validation failed ' + typeof userData.oldAddressPostcode);
        return false;
      }

      if(userData.oldAddressCity.length > lenTextFields || typeof userData.oldAddressCity !== 'string'){
        console.log('oldAddressCity validation failed ' + typeof userData.oldAddressCity);
        return false;
      }
    }


    if (typeof userData.postalVote !== 'boolean'){
      console.log('postalVote boolean check failed ' + typeof userData.postalVote);
      return false;
    }
    else if(userData.postalVote){
      if(userData.postalVoteOption.length > lenTextFields || typeof userData.postalVoteOption !== 'string'){
        console.log('postalVoteOption validation failed ' + typeof userData.postalVoteOption);
        return false;
      }
      else if(userData.postalVoteOption === 'indefintiely')
      {
        // all ok nothing else to do
      }
      else if(userData.postalVoteOption === 'specificElection')
      {
        if(validDate(userData.postalVoteElectionDate) == false){
          console.log('currentDate validation failed');
          return false;
        }
      }
      else if(userData.postalVoteOption === 'timePeriod')
      {
        if(validDate(userData.postalVoteFrom) == false){
          console.log('postalVoteFrom validation failed');
          return false;
        }
        if(validDate(userData.postalVoteTo) == false){
          console.log('postalVoteTo validation failed');
          return false;
        }
      }
      else
      {
        console.log('postalVoteOption unknown: ' + userData.postalVoteOption);
        return false;
      }
        

    }
        
    if(userData.previousName.length > lenTextFields || typeof userData.previousName !== 'string'){
      console.log('previousName validation failed ' + typeof userData.previousName);
      return false;
    }

    if(userData.citizenOf.length > lenTextFields || typeof userData.citizenOf !== 'string'){
      console.log('citizenOf validation failed ' + typeof userData.citizenOf);
      return false;
    }

    if(userData.nationality.length > lenTextFields || typeof userData.nationality !== 'string'){
      console.log('nationality validation failed ' + typeof userData.nationality);
      return false;
    }

    if (typeof userData.registeredAsOverseasVoter !== 'boolean'){
      console.log('registeredAsOverseasVoter boolean check failed ' + typeof userData.registeredAsOverseasVoter);
      return false;
    }

    if(userData.homeCountryConstituency.length > lenTextFields || typeof userData.homeCountryConstituency !== 'string'){
      console.log('homeCountryConstituency validation failed ' + typeof userData.homeCountryConstituency);
      return false;
    }

    if(userData.citizenOf.length > lenTextFields || typeof userData.citizenOf !== 'string'){
      console.log('citizenOf validation failed ' + typeof userData.citizenOf);
      return false;
    }

    if(userData.nationality.length > lenTextFields || typeof userData.nationality !== 'string'){
      console.log('nationality validation failed ' + typeof userData.nationality);
      return false;
    }
      


    if(validNINNumber(userData.nin) == false && userData.nin.replace(/ /g,'').length != 9){
      console.log('Nin validation failed');
      return false;
    }

    if(validDate(userData.dateOfBirth) == false){
      console.log('dateOfBirth validation failed ' + userData.dateOfBirth);
      return false;
    }

    if(validDate(userData.currentDate) == false){
      console.log('currentDate validation failed');
      return false;
    }

    if (typeof userData.postalVote !== 'boolean'){
      console.log('PostalVote boolean check failed ' + typeof userData.postalVote);
      return false;
    }

    
  }
  catch(e) {
    console.log(e.message);
    return false;
  }


  return true;
}

function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validNINNumber(nin) {
  var re = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/;
  return re.test(nin);
}

function validDate(date) {
  var re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(date);
}




module.exports = validation;