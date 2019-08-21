var token = "IwfQT9NS7re56jNE9vzLrslzuFgsj7B4Q2547JE9iyb50T9gxlLCAIEB96FtB7fQ";
var jsonstr;
var hashstr;
var st;
// var s;
function myFunction(s, hash) {
  console.log(s);
  // $.ajax({
  //   url:
  //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/admin/setDefault",
  //   contentType: "application/json",
  //   type: "POST",
  //   headers: {
  //     "X-Access-Token": token
  //   },
  //   success: function() {
  //     console.log("success");
  //   },
  //   error: function(xhr, ajaxOptions, thrownError) {
  //     console.log(xhr.status + "  " + thrownError);
  //   }
  // });
  $.ajax({
    url:
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.createVoterCard",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: s,
    success: function(data) {
      console.log(data);
      alert("Your voterID Id is:" + hash);
      //setTimeout(location.reload(),10000);
    },
    error: function(error) {
      console.log(error.responseText);
      // setTimeout(location.reload(),10000);
    }
  });
}

$(document).ready(function() {
  $("#userRegistration").click(function() {
    // $("form").submit(function() {

    alert("Hello " + $("#name").val());
    // r = $(this).serializeArray();

    jsonstr =
      $("#name").val() +
      $("#fname").val() +
      $("#state").val() +
      $("#constituency").val() +
      $("#dob").val() +
      $("#mob_no").val() +
      $("#user_email").val();
    console.log("jsonstr " + jsonstr);

    getHash(jsonstr).then(hash => {
      hashstr = hash;
      console.log(hash);
      st =
        '{ "$class": "org.voting.system.createVoterCard","card":  { "$class": "org.voting.system.VoterCard","voterCardId":"' +
        hashstr +
        '","name": "' +
        $("#name").val() +
        '","fatherName":"' +
        $("#fname").val() +
        '","state": "' +
        $("#state").val() +
        '","constituency":"' +
        $("#constituency").val() +
        '","dob": "' +
        $("#dob").val() +
        '","phone": "' +
        $("#mob_no").val() +
        '","email": "' +
        $("#user_email").val() +
        '","eligible":"' +
        $("#eligible").val() +
        '","status":"' +
        $("#verified").val() +
        '"}}';

      console.log(st);

      myFunction(st, hashstr);
    });
    console.log(hashstr);

    return false;
    //  });
  });
});
function getHash(str, algo = "SHA-256") {
  let strBuf = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest(algo, strBuf).then(hash => {
    window.hash = hash;
    let result = "";
    const view = new DataView(hash);
    for (let i = 0; i < hash.byteLength; i += 4) {
      result += ("00000000" + view.getUint32(i).toString(16)).slice(-8);
    }
    return result;
  });
}
////////////////////////////////////update voter/////////////////////////////////

$(document).ready(function() {
  $("#voterUpdate").click(function() {
    // alert("Hello  " + $("#cconstituency").val());
    // $.ajax({
    //   url:
    //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/admin/setDefault",
    //   contentType: "application/json",
    //   type: "POST",
    //   headers: {
    //     "X-Access-Token": token
    //   },
    //   success: function() {
    //     console.log("success");
    //   },
    //   error: function(xhr, ajaxOptions, thrownError) {
    //     console.log(xhr.status + "  " + thrownError);
    //   }
    // });
    var fil2 =
      '{"where": {"voterCardId":"' + $("#registrationNo").val() + '"}}';
    //'"
    st =
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.VoterCard?filter=" +
      fil2;
    //'"
    //  var uri = encodeURI(s);
    console.log(" uri " + st);
    event.preventDefault();
    $.ajax({
      url: st,
      // contentType: "application/json",
      // cors: true,
      type: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Access-Token": token
      },
      success: function(data) {
        var i = 0;
        // window.location.href = "candidateSearch.html";
        hashstr = data[0].voterCardId;
        document.getElementById("pageintro").innerHTML =
          '<article><h3 class="heading">Update Voter card</h3><form class="register-form" id="rform"><div class="input-field col s12"><i>Name</i> <input id="name" type="text" class="validate" value=' +
          data[0].name +
          ' required /> </div><div class="input-field col s12"><i>Father/Husband Name</i> <input id="fname" type="text" class="validate" value=' +
          data[0].fatherName +
          ' required /> </div><div class="input-field col s12"> <i>Date Of Birth</i> <input  type="date" id="dob" name="trip-start" value=' +
          data[0].dob +
          ' min="1899-01-01"   max="2020-12-31"/> </div><div class="input-field col s12"> <i>State</i> <input id="state"  type="text" class="validate" value=' +
          data[0].state +
          ' required /></div><div class="input-field col s12"> <i>Constituency</i> <input id="constituency" type="text" class="validate" value=' +
          data[0].constituency +
          ' required /></div><div class="input-field col s12"><i>Mobile No</i><input id="mob_no" type="text" class="validate" value=' +
          data[0].phone +
          '></div><div class="input-field col s12"><i>Email</i><input id="user_email" type="email" class="validate" value=' +
          data[0].email +
          '></div><div class="input-field col s12"><i>Eligibility</i><select class="mdc-select__native-control" id="eligible" value=' +
          data[0].eligible +
          '><option value="Invalid">Invalid</option><option value="Valid">Valid</option><option value="Expired">Expired</option></select></div><div class="input-field col s12"><i>Eligibility</i><select class="mdc-select__native-control" id="verified" value=' +
          data[0].status +
          '><option value="Verified">Verified</option> <option value="Not Verified">Not Verified</option></select> </div><div class="row"> <div class="input-field col s12"> <button class="btn waves-effect waves-light col s12" id="voterUpdate1" onclick="fun();">Update Now</button></div></div></form></article>';

        // console.log(data.length - 1);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });

    return false;
  });
});

function fun() {
  // alert("fffff");
  st =
    '{ "$class": "org.voting.system.updateVoterCard","card":  { "$class": "org.voting.system.VoterCard","voterCardId":"' +
    hashstr +
    '","name": "' +
    $("#name").val() +
    '","fatherName":"' +
    $("#fname").val() +
    '","state": "' +
    $("#state").val() +
    '","constituency":"' +
    $("#constituency").val() +
    '","dob": "' +
    $("#dob").val() +
    '","phone": "' +
    $("#mob_no").val() +
    '","email": "' +
    $("#user_email").val() +
    '","eligible":"' +
    $("#eligible").val() +
    '","status":"' +
    $("#verified").val() +
    '"}}';

  $.ajax({
    url:
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/admin/setDefault",
    contentType: "application/json",
    type: "POST",
    headers: {
      "X-Access-Token": token
    },
    success: function() {
      console.log(st);
      alert("success");
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr.status + "  " + thrownError);
    }
  });
  // alert("fffff");
  // var id = $("#voterUpdate").val();
  $.ajax({
    url:
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.updateVoterCard",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: st,
    success: function(data) {
      console.log(data);
      alert("Your voterID Id is updated");
      //setTimeout(location.reload(),10000);
    },
    error: function(error) {
      console.log(error.responseText);
      // setTimeout(location.reload(),10000);
    }
  });
}
