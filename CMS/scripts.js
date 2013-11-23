var bob;

var edited = '';

var cms = {

    lan: new Array('Hebrew', 'English', 'Portuguese', 'French', 'Italian', 'Spanish', 'Russian'),
    lanf: new Array('he', 'en', 'pt', 'fr', 'it', 'sp', 'ru'),
    lan2: {he: 'Hebrew', en: 'English', pt: 'Portuguese', fr: 'French', it: 'Italian', sp: 'Spanish', ru: 'Russian'},
    prep: {

        inputs: function () {

            $('#adder .names input').each(function (i, inp) {
                $(inp).attr('loc', cms.lanf[i]).attr('lan', i).attr('placeholder', cms.lan[i]);
            });

            $('#adder .hints input').each(function (i, inp) {
                $(inp).attr('loc', cms.lanf[i]).attr('lan', i).attr('placeholder', 'Hint -' + cms.lan[i]);
            });


        },
        images: function () {

            var img = $('#adder img');
            for (var i = 0; i < img.length; i++) {
                img[i].setAttribute('num', i);
                img[i].addEventListener('click', function (e) {

                    var hr = prompt('Image source', this.src);
                    this.src = hr;

                });

            }
        },
        gatherNames: function () {
            var names = {};
            $('#adder .names input').each(function () {
                $this = $(this);
                names[$this.attr('loc')] = $this.val();
            })
            return names;

        },
        gatherHints: function () {
            var hints = {};
            $('#adder .hints input').each(function () {
                $this = $(this);
                hints[$this.attr('loc')] = $this.val();
            })
            return hints;
        },
        init: function () {

            $('#mask').click(function (e) {
                this.style.display = 'none';
            });
            this.inputs();
            this.images();

        }


    },

    edit: function (cb) {

        cms.ajax.edit(edited);

        $('#e').show();
        $('#s').hide();


    },
    del: function (id, cb) {

        var c = confirm('Remove this set?');
        if (!c) return;

        this.ajax.del(id, cb);

    },
    thumbs: {

        fromAjax: function (arr, id) {

            var obj = JSON.parse(arr);
            var $row = $("<tr>").data("fp", arr);
            var $names = $("<td>");
            $.each(obj.names, function (k, v) {
                $names.append($("<span>").append($("<strong>").text(cms.lan2[k] + ":").addClass(v ? '' : 'missing'), $("<span>").text(v || "N/A")));
            });
            var $hints = $("<td>");
            $.each(obj.hints, function (k, v) {
                $hints.append($("<span>").append($("<strong>").text(cms.lan2[k] + ":").addClass(v ? '' : 'missing'), $("<span>").text(v || "N/A")));
            });
            var $pics = $("<td>");
            $.each(obj.pics, function (k, v) {
                if (v)
                    $pics.append($("<img>").attr("src", v).click(function () {
                            $(this).toggleClass("enlarge");
                        }
                    ));
            });
            var $bts = $("<td>").append($("<button>").text("Edit").click(function () {

                    cms.putData(obj);
                    edited = id;
                    $("#s").fadeToggle();
                    $("#e").fadeToggle();
                })).append($("<button>").text("Delete").click(function () {
                    cms.del(id, function () {
                        $row.remove();
                    });
                }));

            $row.append($("<td>").text(id), $names, $hints, $pics, $bts).appendTo($("table"));

        },
        clear: function () {

            $('.level').remove();

        },
        createAll: function (res) {

            $.each(res, function (i, v) {
                console.log(v, v[1], i);
                cms.thumbs.fromAjax(v[1], v[0]);
            });
        }
    },
    make: function () {

    },
    makeData: function () {
        var pics = [];
        $(".images img").each(function () {
            pics.push(this.src);
        });
        return {names: cms.prep.gatherNames(), hints: cms.prep.gatherHints(), pics: pics}

    },
    putData: function (obj) {
        var pics = [];
        $(".images img").each(function (i, v) {
            v.src = obj.pics[i];
        });
        $.each(obj.names, function (k, v) {
            $(".names input[loc=" + k + "]").val(v);
        })
        $.each(obj.hints, function (k, v) {
            $(".hints input[loc=" + k + "]").val(v);
        })
        return {names: cms.prep.gatherNames(), hints: cms.prep.gatherHints(), pics: pics}

    },
    save: function () {

        this.ajax.saveNew();

    },
    clear: function () {

        $('#s').show();
        $('#e').hide();
        edited = '';
        var inp = $('#adder input');
        for (var i = 0; i < inp.length; i++)
            if (cms.lan[i]) {
                inp[i].value = '';

            }
        var img = $('#adder img');
        for (var i = 0; i < img.length; i++) {
            img[i].src = 'http://qph.is.quoracdn.net/main-thumb-12479406-200-0zkOrMf88lOmYXBCRQAqv2i8lbleXqVa.jpeg';

        }


    },

    ajax: {

        saveNew: function (callback) {
            $.ajax({
                url: 'http://holeinsock.com/fp/cms.php',                  //the script to call to get data
                data: {act: "add", data: JSON.stringify($.extend(cms.makeData(), {lastUpdated: (new Date()).getTime(), createdAt: (new Date()).getTime()}))},
                //for example "id=5&parent=6"
                dataType: 'text',                //data format
                success: function (data)          //on recieve of reply
                {
                    if (data == false) alert('does not exist');
                    else {
                        alert('added');
                        console.log(data);
                        location.reload(true);
                    }
                    //--------------------------------------------------------------------
                    // 3) Update html content
                    //--------------------------------------------------------------------

                    //recommend reading up on jquery selectors they are awesome
                    // http://api.jquery.com/category/selectors/
                }
            });


        },
        edit: function (id, callback) {
            $.ajax({
                url: 'http://holeinsock.com/fp/cms.php',                  //the script to call to get data
                data: {act: 'edit', data: JSON.stringify($.extend(cms.makeData(), {lastUpdated: (new Date()).getTime()})), id: id},


                //for example "id=5&parent=6"
                dataType: 'text',                //data format
                success: function (data)          //on recieve of reply
                {
                    if (data == false) alert('does not exist');

                    else {
                        alert('edited');
                        location.reload(true);
                    }
                    edited = '';

                    //--------------------------------------------------------------------
                    // 3) Update html content
                    //--------------------------------------------------------------------

                    //recommend reading up on jquery selectors they are awesome
                    // http://api.jquery.com/category/selectors/
                }
            });


        },
        del: function (id, callback) {
            $.ajax({
                url: 'http://holeinsock.com/fp/cms.php',                  //the script to call to get data
                data: 'act=delete&id=' + id,
                //for example "id=5&parent=6"
                dataType: 'text',                //data format
                success: function (data)          //on recieve of reply
                {
                    if (data == false) alert('does not exist');
                    else {
                        if (callback) callback();
                    }
                }
            });


        },
        getAll: function (callback) {

            $.ajax({
                url: 'http://holeinsock.com/fp/cms.php',                  //the script to call to get data
                data: {act: "ALL"},
                //for example "id=5&parent=6"
                dataType: 'json',                //data format
                success: function (data)          //on recieve of reply
                {
                    console.log(callback);
                    if (data == false) console.log('does not exist');
                    else {
                        if (callback) callback(data);
                        console.log(data);
                        bob = data;
                    }
                    //--------------------------------------------------------------------
                    // 3) Update html content
                    //--------------------------------------------------------------------

                    //recommend reading up on jquery selectors they are awesome
                    // http://api.jquery.com/category/selectors/
                }
            });


        },

    },

};


$(document).ready(function () {

    cms.prep.init();


    $('.level p').hide();
    $('.level .title[loc="en"]').show();

    $('.flag').click(function () {
        $('.level p').hide();
        $('.level .title[loc="' + this.getAttribute('loc') + '"]').show();
    });


    cms.ajax.getAll(function (e) {
        $("#jsondata").text(Base64.encode(JSON.stringify(e)));
        cms.thumbs.createAll(e);
    })


    $('#s').show();
    $('#e').hide();
});


function makeDataTables(data) {

    var columns = [
        { "sTitle": "Word EN", "sClass": "email"},
        { "sTitle": "Word HE", "sClass": "email"},
        { "sTitle": "Word PT", "sClass": "email"},
        { "sTitle": "Pic1", "sClass": "email"},
        { "sTitle": "Pic2", "sClass": "email" },
        { "sTitle": "Pic3", "sClass": "email"},
        { "sTitle": "Pic4", "sClass": "email"},
        { "sTitle": "Last Updated", "sClass": "email"},
        { "sTitle": "Created at", "sClass": "email"},
        { "sTitle": "", "sClass": "actions", "sWidth": "80px"}
    ];
    var fields = [];

    $.each(data, function () {
        fields.push([
            user.userEmail,
            user.displayName,
            user.permissionLevel.name,
            '<a href="#" email="' + user.userEmail + '" permissionLevel="' + user.permissionLevel.value + '" guid="' + user.userGuid + '" class="edit-item"></a>\
                                             <a href="#" email="' + user.userEmail + '" permissionLevel="' + user.permissionLevel.value + '" guid="' + user.userGuid + '" class="remove-item"></a>'
        ]);
    });


    $("table").dataTable({
        "bPaginate": true,
        "sPaginationType": "full_numbers",
        "aaData": fields,
        "aoColumns": columns,
        "bLengthChange": false
    });
}

