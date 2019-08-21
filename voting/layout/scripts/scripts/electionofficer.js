var token = "IwfQT9NS7re56jNE9vzLrslzuFgsj7B4Q2547JE9iyb50T9gxlLCAIEB96FtB7fQ";
var jsonstr;
var st;
var hashstr;
//////////////////////////register candidate/////////
function myFunction(s, hash) {
  console.log(s);
  // $.ajax({
  //   url:
  //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/e001/setDefault",
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
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.registerCandidate",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: s,
    success: function(data) {
      console.log(data);
      alert("Your candiadteID Id is:" + hash);
      //setTimeout(location.reload(),10000);
    },
    error: function(error) {
      console.log(error.responseText);
      // setTimeout(location.reload(),10000);
    }
  });
}

$(document).ready(function() {
  $("#candidateSubmit").click(function() {
    // $("form").submit(function() {

    alert("Hello " + $("#name").val());
    // r = $(this).serializeArray();

    jsonstr =
      $("#name").val() +
      $("#fname").val() +
      $("#dob").val() +
      $("#state").val() +
      $("#constituencyName").val() +
      $("#partyName").val() +
      $("#mobno").val() +
      $("#candidate_email").val();
    console.log("jsonstr " + jsonstr);

    getHash(jsonstr).then(hash => {
      hashstr = hash;
      console.log(hash);
      st =
        '{ "$class": "org.voting.system.registerCandidate","candidate":  { "$class": "org.voting.system.Candidate","candidateId":"' +
        hashstr +
        '","candidateName": "' +
        $("#name").val() +
        '","candidateAddress":"' +
        $("#state").val() +
        '","candidateFather":"' +
        $("#fname").val() +
        '","partyName": "' +
        $("#partyName").val() +
        '","constituencyName":"' +
        $("#constituencyName").val() +
        '","phoneNo": "' +
        $("#mobno").val() +
        '","emailAddress": "' +
        $("#candidate_email").val() +
        '","vote": 0}}';
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
//////////////////////////////////////update candidate//////////////////////////////////////////////
$(document).ready(function() {
  $("#candidatesSearch").click(function() {
    // alert("Hello  " + $("#cconstituency").val());
    // $.ajax({
    //   url:
    //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/e001/setDefault",
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
      '{"where":{"and":[{"constituencyName":"' +
      $("#cconstituency").val() +
      '"},{"candidateAddress":"' +
      $("#cstate").val() +
      '"}]}}';
    //'"
    var s =
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.Candidate?filter=" +
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
        document.getElementById("pageintro").innerHTML =
          '<article><h3 class="heading">Candidate List</h3><table class="table"><thead><tr><th scope="col">Serial No</th><th scope="col">Name</th><th scope="col">Father/Husband Name</th><th scope="col">State</th><th scope="col">Constituency</th><th scope="col">Party</th></tr></thead><tbody id="candidatetable"></tbody></table></article>';
        while (i < data.length) {
          stt =
            "<tr id=" +
            JSON.stringify(data[i].candidateId) +
            '><th scope="row">' +
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
            "</td><td><button value=" +
            JSON.stringify(data[i].candidateId) +
            " onclick='myFunction3(value)'>Delete</button></td></tr>";
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
function myFunction3(id) {
  // console.log(id);
  var tmp =
    '{ "$class": "org.voting.system.removeCandidate","candidate":  { "$class": "org.voting.system.Candidate","candidateId":"' +
    id +
    '","candidateName": "","candidateFather":"","candidateAddress":"","partyName": "","constituencyName":"","phoneNo": "","emailAddress": "","vote": 0}}';
  console.log(tmp);
  $.ajax({
    url:
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.removeCandidate",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: tmp,
    success: function(data) {
      console.log(data);
      alert("candiadteID Id is deleted:" + data);
      // var idd = ;
      // document.getElementById(idd)
      var element = document.getElementById(id);
      element.parentNode.removeChild(element);
      //setTimeout(location.reload(),10000);
      // window.location.href = "candidates.html";
    },
    error: function(error) {
      console.log(error.responseText);
      // console.log();
      // setTimeout(location.reload(),10000);
    }
  });
}
////////////////////////////////register party//////////////////////////
function myFunction1(s) {
  console.log(s);
  // $.ajax({
  //   url:
  //     "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/wallet/e001/setDefault",
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
      "http://nayany2q6.eastus.cloudapp.azure.com:3000/api/org.voting.system.registerParty",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: s,
    success: function(data) {
      console.log(data);
      alert("party is registered");
      //setTimeout(location.reload(),10000);
    },
    error: function(error) {
      console.log(error.responseText);
      // setTimeout(location.reload(),10000);
    }
  });
}
$(document).ready(function() {
  $("#registerParty").click(function() {
    // $("form").submit(function() {

    alert("Hello " + $("#partyName").val());
    // r = $(this).serializeArray();

    jsonstr = $("#partyName").val() + $("#partySymbol").val();
    // console.log("jsonstr " + jsonstr);

    st =
      '{"$class": "org.voting.system.registerParty","party": {"$class": "org.voting.system.Party","partyId": "' +
      $("#partyName").val() +
      '", "partyName": "' +
      $("#partyName").val() +
      '",  "partySymbol": "' +
      $("#partySymbol").val() +
      '"}}';
    console.log(st);

    myFunction1(st);
    // console.log(hashstr);

    return false;
    //  });
  });
});
