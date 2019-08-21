var token = "IwfQT9NS7re56jNE9vzLrslzuFgsj7B4Q2547JE9iyb50T9gxlLCAIEB96FtB7fQ";
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
var jsonstr;
var hashstr;
var st;

$(document).ready(function() {
  $("#userSubmit").click(function() {
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
        '","eligible": "Invalid","status": "Not Verified"}}';

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
///////////////////////////////////voterlist////////////////////////////////////
$(document).ready(function() {
  $("#userVoterList").click(function() {
    // alert("Hello  " + $("#cconstituency").val());
    // $.ajax({
    //   url:
    //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/v001/setDefault",
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
    var fil =
      '{"where":{"and":[{"constituency":"' +
      $("#constituency").val() +
      '"},{"state":"' +
      $("#state").val() +
      '"}]}}';
    //'"
    var s =
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.VoterCard?filter=" +
      fil;

    //  var uri = encodeURI(s);
    console.log(" uri " + s);
    event.preventDefault();
    $.ajax({
      url: s,
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
        document.getElementById("voterlistpage").innerHTML =
          '<div id="pageintro" class="hoc clear"><article><h3 class="heading">Voter List</h3><table class="table table-striped"><thead><tr><th scope="col">Serial No</th><th scope="col">Name</th><th scope="col">Father/Husband Name</th><th scope="col">Date of Birth</th><th scope="col">State</th><th scope="col">Constituency</th><th scope="col">Eligibility</th><th scope="col">Status</th></tr></thead><tbody id="voterTable"></tbody></article></div>';
        while (i < data.length) {
          stt =
            '<tr><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            data[i].name +
            "</td><td>" +
            data[i].fatherName +
            "</td><td>" +
            data[i].dob +
            "</td><td>" +
            data[i].state +
            "</td><td>" +
            data[i].constituency +
            "</td><td>" +
            data[i].eligible +
            "</td><td>" +
            data[i].status +
            "</td></tr>";
          $("#voterTable").append(stt);
          i++;
        }

        console.log(JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });

    return false;
    //  });
  });
});
//////////////////////////////////cadidate search///////////////////////////////////////
$(document).ready(function() {
  $("#userCandidateSearch").click(function() {
    // alert("Hello  " + $("#cconstituency").val());
    $.ajax({
      url:
        "https://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/v001/setDefault",
      contentType: "application/json",
      type: "POST",
      headers: {
        "X-Access-Token": token
      },
      success: function() {
        console.log("success");
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });
    var fil1 =
      '{"where":{"and":[{"constituencyName":"' +
      $("#constituency").val() +
      '"},{"candidateAddress":"' +
      $("#state").val() +
      '"}]}}';
    //'"
    var s =
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.Candidate?filter=" +
      fil1;

    //  var uri = encodeURI(s);
    // alert(" uri " + s);
    event.preventDefault();
    $.ajax({
      url: s,
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
        document.getElementById("pageintro").innerHTML =
          '<article><h3 class="heading">Candidate List</h3><table class="table"><thead><tr><th scope="col">Serial No</th><th scope="col">Name</th><th scope="col">Father/Husband Name</th><th scope="col">State</th><th scope="col">Constituency</th><th scope="col">Party</th></tr></thead><tbody id="candidatetable"></tbody></table></article>';
        while (i < data.length) {
          stt =
            '<tr><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            data[i].candidateName +
            "</td><td>" +
            data[i].candidateFather +
            "</td><td>" +
            data[i].candidateAddress +
            "</td><td>" +
            data[i].constituencyName +
            "</td><td>" +
            data[i].partyName +
            "</td></tr>";
          $("#candidatetable").append(stt);
          i++;
        }

        console.log(data.length - 1);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });

    return false;
    //  });
  });
});
///////////////////////////////////registration status///////////////////////////////////////////
$(document).ready(function() {
  $("#registrationStatus").click(function() {
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
    var s =
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.VoterCard?filter=" +
      fil2;

    //  var uri = encodeURI(s);
    console.log(" uri " + s);
    event.preventDefault();
    $.ajax({
      url: s,
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
        document.getElementById("pageintro").innerHTML =
          '<article><h3 class="heading">Registration Status</h3><table class="table table-striped"><thead><tr><th scope="col">Serial No</th><th scope="col">Name</th><th scope="col">Father/Husband Name</th><th scope="col">Date of Birth</th><th scope="col">State</th><th scope="col">Constituency</th><th scope="col">Mobile No</th><th scope="col">Email Id</th><th scope="col">Eligibility</th><th scope="col">Status</th></tr></thead><tbody id="registrationStatus"></tbody></article>';
        while (i < data.length) {
          stt =
            '<tr><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            data[i].name +
            "</td><td>" +
            data[i].fatherName +
            "</td><td>" +
            data[i].dob +
            "</td><td>" +
            data[i].state +
            "</td><td>" +
            data[i].constituency +
            "</td><td>" +
            data[i].phone +
            "</td><td>" +
            data[i].email +
            "</td><td>" +
            data[i].eligible +
            "</td><td>" +
            data[i].status +
            "</td></tr>";
          $("#registrationStatus").append(stt);
          i++;
        }

        console.log(JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });

    return false;
    //  });
  });
});
