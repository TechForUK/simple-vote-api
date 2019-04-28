function validation(userData){

  const lenTextFields = 20;

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

    if(validNINNumber(userData.nin) == false && userData.nin.replace(/ /g,'').length != 9){
      console.log('Nin validation failed');
      return false;
    }

    if(validDate(userData.dateOfBirth) == false){
      console.log('dateOfBirth validation failed');
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
    if (typeof userData.movedHouse !== 'boolean'){
      console.log('movedHouse boolean check failed ' + typeof userData.movedHouse);
      return false;
    }


    
    // surname: '',
    // firstLineAddress: '',
    // secondLineAddress: '',
    // postcode: '',
    // city: '',
    // differentAddress: false,
    // telephone: '',
    // email: '',
    // nationality: '',
    // movedHouse: false,
    // oldAddressFirstLineAddress: '',
    // oldAddressSecondLineAddress: '',
    // oldAddressPostcode: '',
    // oldAddressCity: '',
    // registeredAsOverseasVoter: false,
    // dateOfBirth: '',
        
    // changedName: '',
    // previousName: '',
    // dateOfNameChange: '',
        
    // currentDate: ''
    
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