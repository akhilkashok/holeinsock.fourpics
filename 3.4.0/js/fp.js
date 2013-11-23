var DOUBLE_CLICK_TIME = 250;
var LEVELS_PER_WORLD = 18;


var fp = {

    lan: {

        list: new Array('Hebrew', 'English', 'Portuguese', 'French', 'Italian', 'Spanish', 'Russian'),
        loc: new Array('he', 'en', 'pt', 'fr', 'it', 'sp', 'ru'),
        isRTL: function () {
            return (userProgress.current.lang == 0);
        },
        fillLangs: function () {
            var $langs = $(".select-languages");
            $.each(this.loc, function () {
                var lang = this;
                $langs.append($("<img src='images/Big%20Flags/" + this + ".png' >").attr("data-flag", this).click(function (e) {
                    e.preventDefault();
                    //TODO - Set up langs data
                    userProgress.current.lang = lang;
                    fp.nav.go("#mainmenu");
                }));
            })
        },
        init: function () {
            this.fillLangs();
        }
    },

    config: {

        levels: 5,
        perLevel: 20,
        languages: 5
    },
    nav: {
        init: function () {
            $(".panel").hide();
            $(".panel[selected]").show();
            $(".navbt").click(function (e) {
                e.preventDefault();
                var href = $(this).attr("href");
                fp.nav.go(href);
            })
        },
        go: function (id) {
            $(".panel").hide().removeAttr("selected");
            $(".panel" + id).show().attr("selected", "t");
        }
    },
    levels: {
        init: function () {
            var perRow = 3;
            var columns = LEVELS_PER_WORLD / perRow;
            var $cont = $(".levels-container");
            for (var i = 0; i < columns; i++) {
                var $row = $("<div>").addClass("thumbs-row-small");
                for (var j = 0; j < perRow; j++) {
                    $row.append($("<span>").addClass("thumb").text((j + columns * i) + 1));
                }
                $cont.append($row);
            }
        },
        loadWorld: function (data) {
            //TODO
        }
    },
    keyboard: {

        keys: 16,
        createKeyArray: function (word) {

            var ret = new Array();
            for (var i = 0; i < word.length; i++)
                ret.push(word.charAt(i));

            var left = this.keys - word.length;
            if (left < 0) console.log('Error! word is too long');
            if (left < 0) return;
            if (left == 0) return ret;

            var en = 97;
            var en2 = 122;

            var he = 1488;
            var he2 = 1514;

            var sel = (userProgress.current.lang == 'he') ? he : en;
            var sel2 = (userProgress.current.lang == 'he') ? he2 : en2;

            for (var i = 0; i < left; i++) {

                var ran = parseInt(Math.random() * (sel2 - sel)) + sel;
                ret.push(String.fromCharCode(ran));


            }

            var ranRet = new Array();
            for (var i = 0; i < this.keys; i++) {

                var r = parseInt(Math.random() * ret.length);
                var ar = ret.splice(r, 1);
                ranRet.push(ar[0]);

            }
            return ranRet;
        },
        prepareKeys: function (arr) {

            $('#keyboard button').each(function (i, bt) {
                $(bt).text(arr[i].toUpperCase());
            });


        },
        freeLetter: function (letter) {
            var found = false;
            if (letter)
                $('#keyboard button[disabled]').each(function (i, bt) {

                    if (!found)
                        if ($(bt).text() == letter.toUpperCase()) {
                            $(bt).removeAttr('disabled');
                            found = true;
                            return false;
                        }

                });
        },
        freeAll: function () {
            $('#keyboard button').attr('letter', '').removeAttr('disabled');
        },
        prepare: function (word) {

            this.prepareKeys(this.createKeyArray(word));

        },
        init: function () {

            for (var i = 0; i < this.keys; i++)
                $('#keyboard').append($("<div>").click(function () {
                    $('#answer').val($('#answer')[0].value + this.textContent);
                }));

        }

    },
    input: {
        prepare: function (word) {

            this.prepareHoles(word.length);
        },
        prepareHoles: function (num) {
            var num = (num) ? num : 5;
            $('#input span').addClass('hidden erased')
                .each(function (i, s) {
                    if (i < num) $(s).removeClass("hidden");
                });
        },
        addLetter: function (letter) {

            $(this.nextAvailable()).attr('letter', letter).text(letter).removeClass('erased');

        },
        nextAvailable: function () {
            var $holes = $('#input span.erased').not('.hidden');
            if (fp.lan.isRTL())
                if ($holes[$holes.length - 1]) return $holes[$holes.length - 1];
            if ($holes[0]) return $holes[0];
            return false;
        },
        clearAll: function () {
            $('#input span').not('.hidden').addClass('erased').attr('letter', '');
        },
        getAnswer: function () {

            var answer = '';
            var reverse = '';
            $('#input').find('span').not('.hidden').not('.erased').each(function () {
                var l = ($(this).attr('letter'));
                reverse += l; //the order of the spans is reversed by default, so normal is reverse..
                answer = l + answer;
            });

            return (fp.lan.isRTL()) ? answer : reverse;  // if hebrew..


        }
    },
    images: {

        prepare: function (id) {

            var img = $('#images img');
            for (var i = 0; i < img.length; i++)
                img[i].src = 'images/data/' + id + '_' + (i + 1) + '.jpg';

        },
        focus: function (src) {

            var overlay = $('<div>').attr('id', 'overlay');
            var img = $('<img>').attr('src', src);
            console.log(overlay);
            $('body').append(overlay);
            console.log(overlay);
            overlay.append(img).on('click', function () {
                $(this).remove();
            })

        }

    },
    level: {

        current: '',
        prep: function (word) {

            fp.images.prepare(word.id);
            fp.keyboard.prepare(word.name);
            fp.input.prepare(word.name);
            this.current = word.name;
        }


    },
    answer: {

        handleCorrect: function () {

            alert('yep');

        },
        handleWrong: function () {
            alert('wrong');
        },
        check: function () {

            var current = fp.input.getAnswer().toUpperCase();
            var correct = fp.level.current.toUpperCase();

            if (current.length == correct.length) {
                if (current == correct)
                    this.handleCorrect();
                else this.handleWrong();
            }

        }

    },

    data: {

        demo: {
            name: 'פיתוש',
            id: 5

        }

    },
    debugger: {
        runCode: function () {
            var code = $('#code').val();
            try {
                eval(code);
            }
            catch (e) {
                this.log(e.message);
            }
        },
        log: function (msg) {
            var currentHtml = $('#console').html();
            currentHtml += '<br>' + msg;
            $('#console').html(currentHtml);

        },
        clearLog: function () {
            $('#console').html('');
        },
        show: function () {
            $.ui.showModal('#debug');
        }

    },
    init: function () {
        //make sure all pages are the correct width
        ui.init();
        fp.nav.init();
        userProgress.loadProgress();
        if (AppMobi) if (AppMobi.device) if (AppMobi.device.hideStatusBar)
            AppMobi.device.hideStatusBar();
        //fp.keyboard.init();

        $('#input span').on('click', function (e) {
            var $this = $(this);
            fp.keyboard.freeLetter($this.attr('letter'));
            $this.addClass('erased').attr('letter', '');

            var now = (new Date).getTime();
            if (this.lastClicked)
                if (now - this.lastClicked < DOUBLE_CLICK_TIME) {
                    fp.input.clearAll();
                    fp.keyboard.freeAll();
                }


            this.lastClicked = now;
        });

        $('#input span').on('dblclick', function (e) {
                ///fp.input.clearAll();
                // fp.keyboard.freeAll();
            }
        );
        $('#keyboard button').on('click', function (e) {

            fp.input.addLetter($(this).text());
            $(this).attr('disabled', true)
            fp.answer.check();


        });

        $('#images img').on('click', function () {
            fp.images.focus($(this).attr('src'));
            console.log('yo');
        });
        fp.level.prep(fp.data.demo);
        fp.levels.init();
        fp.lan.init();
    }

}


//debug
function log(msg) {
    fp.debugger.log(msg);
}