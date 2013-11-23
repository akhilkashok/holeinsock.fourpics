var SCREEN_WIDTH=0,SCREEN_HEIGHT=0;
var ui= {
    screen:{

    },
    input: {

        adjustWidth: function () {
            var holesNum = 10;
            var screenWidth = $(document.body).width();
            var fontRatio = 0.75;
            var desiredWidth = 0.9;
            var ratioForMargin = 0.05;
            var holeSize = parseInt(screenWidth * desiredWidth / holesNum);
            var margin = holeSize * 0.05;

            var fontSize = parseInt(holeSize * fontRatio);

            $('#input span').css('width', holeSize + 'px').css('height', holeSize + 'px').css('margin-left', margin + 'px').css("font-size", fontSize + 'px');

        },
        init: function () {
            this.adjustWidth();
        }

    },
    keyboard: {
        adjustWidth: function () {
            var keysNum = 8; //per row
            var fontRatio = 0.75;
            var heightRatio = 1.333;
            var desiredWidth = 0.8;
            var ratioForMargin = 0.05;
            var keySize = parseInt(SCREEN_WIDTH * desiredWidth / keysNum);
            var margin = parseInt(keySize * 0.02);
            var width = keySize;
            var height = parseInt(keySize * heightRatio);

            var fontSize = parseInt(keySize * fontRatio);

            $('#keyboard button').css('width', width + 'px').css('height', height + 'px').css('margin-left', margin + 'px').css("font-size", fontSize + 'px');

        },
        init: function () {
            this.adjustWidth();
        }
    },
    images: function () {

        var wantedWidth=0.4
        var windowWidth=window.innerWidth;
        var width=windowWidth*0.4;
        var processedWidth = parseInt(width * 0.75); // keep 3:4 ratio
        l(processedWidth);
        l(width);
        $('#images img').css('height', processedWidth + 'px');

    },
    init: function () {

        SCREEN_HEIGHT=$(document).height();
        SCREEN_WIDTH=$(document).width();
        $row=$("<div id='images'><div class='row'><img>");
        $body=$(document.body);
        $body.append($row);
        console.log("W",$row.find("img").width());
        $row.remove();

        ui.images();
        ui.input.init();
        ui.keyboard.init();

    }}