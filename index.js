let activeCount = document.getElementById("activeCount");
let totalCount = document.getElementById("totalCount");
let deathCount = document.getElementById("deathCount");
let recoveredCount = document.getElementById("recoveredCount");
var table = document.getElementById("dataTable");
var tbody = table.querySelector("tbody");
tbody.innerHTML = "";

let url = "https://api.rootnet.in/covid19-in/stats/latest"
var filteredData = {};
fetch(url).then(res => res.json())
    .then((out) => {
        activeCount.innerHTML = "Active - " + out.data["unofficial-summary"][0].active;
        totalCount.innerHTML = "Total - " + out.data["unofficial-summary"][0].total;
        deathCount.innerHTML = "Deaths - " + out.data["unofficial-summary"][0].deaths;
        recoveredCount.innerHTML = "Recovered - " + out.data["unofficial-summary"][0].recovered;


        filteredData = out.data.regional.map(region => {
            return {
                "loc": region.loc,
                "totalConfirmed": region.totalConfirmed,
                "discharged": region.discharged,
                "deaths": region.deaths
            }

        });

        for (let i = 0; i < filteredData.length; i++) {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            td1.innerHTML = filteredData[i].loc;
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            td2.innerHTML = filteredData[i].totalConfirmed;
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            td3.innerHTML = filteredData[i].discharged;
            tr.appendChild(td3);

            var td4 = document.createElement("td");
            td4.innerHTML = filteredData[i].deaths;
            tr.appendChild(td4);

            tbody.appendChild(tr);



        }

    });