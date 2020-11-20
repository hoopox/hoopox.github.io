var isFirstSubmit = true;
var initFormElement = null;
var form = null;
// init the modal and give some events
function initPopupModal() {
  form = $('#popup-form');
  if (!initFormElement) {
    initFormElement = form.clone();
  }
  form.on('submit', function (e) {
    e.preventDefault();
    var fieldsResult = submitValidate();
    if (!canSubmit(fieldsResult)) {
      var formData = getFormEnterData();
      handleDataInteraction(formData);
    }
  });
}
// the modal hidden will execute
function destoryPopupModal() {
  form.off('submit');
}

// control the submit 
function canSubmit(fields) {
  return fields.filter(function (item) {
    return !item.isPass;
  }).length;
}

// get form note value
function getFormEnterData() {
  let data = {};
  $.each(form.serializeArray(), function (index, item) {
    console.log(item);
    let isHave = data[item.name];
    if (isHave) {
      if (isHave instanceof Array) {
        isHave.push(item.value);
      } else {
        data[item.name] = [isHave, item.value];
      }
    } else {
      data[item.name] = item.value;
    }
  });

  return JSON.stringify(data);
}

// here send ajax
function handleDataInteraction(data) {
  console.log(data);
  $.ajax({
    url: 'https://jinshuju.net/api/v1/forms/eS45UG',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    async: false,
    headers: {
      Authorization:
        'Basic akFkaVFrZXZZcGM1VFoycmJqcnQtZzp3ODB1OG9QOTVvcXZVNjVac1lRV2VR',
      Accept: 'application/json',
    },
    data: data,
    success: function (data) {
      successCallback(data);
    },
    error: function (error) {
      errorCallback(error);
    },
  });
}
// ajax success callback
function successCallback(data) {
  alterMessage('.alert-success');
  // make the animate done,the page closed
  setTimeout(() => {
    $('.close').click();
    form.remove();
    $('#read-move-popup').find('.modal-body').append(initFormElement);
    resetStatus();
  }, 1300);
}
// reset two status;because it can control the success new DOM
function resetStatus() {
  isFirstSubmit = true;
  initFormElement = null;
}
// ajax failed callback
function errorCallback(e) {
  try {
    alterMessage('.alert-danger');
  } catch (error) {
    console.log(error);
  }
}

// control the message when click submit button
function alterMessage(triggerClass) {
  // get the alter position
  var position =
    $('#read-move-popup').scrollTop() -
    parseFloat($('.custom-modal-content').css('marginTop')) +
    12;
  $(triggerClass)
    .animate({ top: `${position}px` })
    .show()
    .delay(1000)
    .hide(300);
}

// addEventListener input event, make correct the error message disappeared
function addInputValidate(inputElement) {
  $(inputElement).on('input', function (e) {
    displayMessageElement(e.target.value, this);
  });
}
// the validate core
function submitValidate() {
  var fieldsArray = getValidateFields();
  $.each(fieldsArray, function (index, item) {
    var field = item.field;
    item.isPass = displayMessageElement(form[0][field].value, form[0][field]);
    if (isFirstSubmit) {
      addInputValidate(form[0][field]);
    }
  });
  isFirstSubmit = false;
  return fieldsArray;
}

//what field will validate，give here
function getValidateFields() {
  return [
    {
      field: 'name',
      isPass: false,
    },
    {
      field: 'company',
      isPass: false,
    },
    {
      field: 'email',
      isPass: false,
    },
  ];
};
// make the hint display
function displayMessageElement(val, inputElement) {
  var baseClass = 'hite-message';
  var content = rules(val);
  var messageElement = $(inputElement)
    .parent()
    .find('.' + baseClass);
  if (
    messageElement.attr('class') !== `${baseClass} ${content.type}-feedback`
  ) {
    messageElement.attr('class', `${baseClass} ${content.type}-feedback`);
    // messageElement.text(`${content.message}`);
  }
  return content.passFlag;
}

// you must give the field passFlag; if not ,it always pass
function rules(val) {
  if (!val.trim()) {
    return {
      type: 'invalid',
      passFlag: false,
      message: '*数据不能为空',
    };
  }
  return {
    type: 'valid',
    message: '',
    passFlag: true,
  };
}
module.exports = {
  init: initPopupModal,
  destory: destoryPopupModal,
};
