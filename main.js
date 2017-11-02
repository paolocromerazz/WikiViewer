$(function () {
    me();
    displayres();
    randomPage();
});

var box = $(".searchBox");
var x = $("#X");
var random = $(".random");
var title = $("#title");

var wiki = "https://en.wikipedia.org/w/api.php";

function me() {
    $("#title").on("click", function () {
        var tmp = document.querySelector('#title').innerHTML;
        setTimeout(function () {
            $('#title').fadeOut(100);
            $('#title').html("made by Marco");
            $('#title').fadeIn(800);
            setTimeout(function () {
                $('#title').html(tmp);
            }, 1000);
        }, 800);
    });
}


function getres() {
    $(".res").empty("li");
    var search = box.val();
    $.ajax({
        url: wiki,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "query",
            prop: "extracts",
            exchars: "200",
            exlimit: "5",
            exintro: "",
            explaintext: "",
            rawcontinue: "",
            generator: "search",
            gsrsearch: search,
            gsrlimit: "5"
        }
    }).done(function (data) {
        if (data) {
            //if (data.query.?) {
            var res = data.query.pages;
            if (res) {
                for (var page in res) {
                    $("ul.res").append(
                        '<li><a href="https://en.wikipedia.org/wiki/' + res[page].title + '" target="_blank">' + "<h2>" + res[page].title + "</h2><p>" + res[page].extract + "</p></a></li>"
                    );
                    $(this).on("click", function () {
                        console.log("eccomi ");
                    });
                }
            } else {
                alert("stop here");
            }
            //}
        }

    }).fail(function (data) {
        var errorCode = data.error.code;
        var errorInfo = data.error.info;
        var errMsg = "ERROR: " + errorCode + ". " + errorInfo;
        console.log(errMsg);
    });
}

function displayres() {
    initialize();

    x.on("click", function () {
        initialize();
        //alert("x clicked");
    });

    box.on('input', function () {
        if (!this.value) {
            $(".res").empty("li");
        }
    });

    box.on('keyup', function () {
        getres();
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
        success: function (data) {
            var title = data.query.random[0].title;
            var link = "https://en.wikipedia.org/wiki/" + title;
            window.open(link);
        }
    });
}

function randomPage() {
    box.hover(function () {
        //alert("i'm in");
        document.getElementById('intoTxt').focus();
    }, function () {
        //alert("I'm out");
    });
    box.on("click", function () {
        if (box.val() == "")
            fetchRandom();
    });
}

function initialize() {
    $(".res").empty("li");
    $(".res").remove("li");
}
