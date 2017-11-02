$(function() {
    initialize();

    displayResults();
    randomPage();
});

var box = $(".searchBox");
var random = $(".random");

var wiki = "https://en.wikipedia.org/w/api.php";

function initialize() {
    $(".results").remove("li");
    //document.getElementById('search').focus();
}

function getResults() {
    $(".results").empty("li");
    var search = box.val();
    $.ajax({
        url: wiki,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "query",
            prop: "extracts",
            exchars: "140",
            exlimit: "10",
            exintro: "",
            explaintext: "",
            rawcontinue: "",
            generator: "search",
            gsrsearch: search,
            gsrlimit: "10"
        }
    }).done(function(data) {
        if (data) {
            var results = data.query.pages;
            if (results) {
                for (var page in results) {
                    $("ul.results").append(
                        '<li><a href="https://en.wikipedia.org/wiki/' + results[page].title + '" target="_blank">' + "<h2>" + results[page].title + "</h2><p>" + results[page].extract + "</p></a></li>"
                    );
                }
            }
        }

    }).fail(function(data) {
        var errorCode = data.error.code;
        var errorInfo = data.error.info;
        var errMsg="ERROR: " + errorCode + ". " + errorInfo;
        console.log(errMsg);
    });
}

function displayResults() {
    document.getElementById('aaa').focus();
    box.on('input', function() {
        if (!this.value) {
            $(".results").empty("li");
        }
    });
    
    box.on('keyup', function() {
        getResults();
    });
    
}

function fetchRandom() {
        $.ajax({
            url: wiki,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "query",
                list: "random",
                rnnamespace: "0",
                rnlimit: "1"
            },
            success: function(data) {
                var title = data.query.random[0].title;
                var link = "https://en.wikipedia.org/wiki/" + title;
                window.open(link);
            }
        });
    }

function randomPage() {
    box.on("click", function(){
        if(box.val()=="")
            fetchRandom();
    });
}