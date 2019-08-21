var token = "IwfQT9NS7re56jNE9vzLrslzuFgsj7B4Q2547JE9iyb50T9gxlLCAIEB96FtB7fQ";
$(document).ready(function() {
  $("#loadCandidate").click(function() {
    // alert("Hello  " + $("#cconstituency").val());
    // $.ajax({
    //   url: "http://172.27.22.166:3000/api/wallet/v001/setDefault",
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
      '{"where":{"and":[{"constituencyId":"' +
      $("#cconstituency").val() +
      '"},{"candidateAddress":"' +
      $("#cstate").val() +
      '"}]}}';
    //'"
    var s =
      "http://172.27.22.166:3000/api/org.voting.system.Candidate?filter=" + fil;

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
        while (i < data.length) {
          var val =
            '"' +
            data[i].candidateId +
            "#" +
            data[i].partyName +
            "#" +
            data[i].constituencyId +
            '"';
          stt =
            "<tr id=" +
            JSON.stringify(data[i].candidateId) +
            '><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            data[i].candidateName +
            "</td><td>" +
            data[i].partyName +
            '</td><td align="center"><button value=' +
            JSON.stringify(data[i].candidateId) +
            " onclick='myFunction3(" +
            val +
            ")'>Click to Vote</button></td></tr>";
          $("#candidateTable").append(stt);
          i++;
        }

        // console.log(data.length - 1);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + "  " + thrownError);
      }
    });

    return false;
    //  });
  });
});

function myFunction3(val) {
  // console.log("value "+val);
  var res = val.split("#");
  // console.log("value "+res[0]);
  // console.log("value "+res[1]);
  // console.log("value "+res[2]);
  var voterid = $("#voterid").val();
  var id = "b#" + voterid;
  var tmp =
    '{ "$class": "org.voting.system.castVote","ballot":  { "$class": "org.voting.system.Ballot","ballotId":"' +
    id +
    '","constituencyId": "' +
    res[2] +
    '","candidateId":"' +
    res[0] +
    '","partyName":"' +
    res[1] +
    '","voterId": "' +
    voterid +
    '"}}';
  console.log(tmp);
  $.ajax({
    url: "http://172.27.22.166:3000/api/org.voting.system.castVote",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    type: "POST",
    //contentType: 'application/json',
    data: tmp,
    success: function(data) {
      console.log(data);
      alert("Successfully Voted:");
      $("#voterid").val(" ");
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
